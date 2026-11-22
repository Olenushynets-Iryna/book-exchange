import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import bcrypt from "bcryptjs";
import { pool } from "./db.js";
import { requireAuth } from "./middlewares/auth.js";
import { upload } from "./upload.js";
import { sendMail, sendOrderMail, notifyNewBook } from "./mail.js";
import { OAuth2Client } from "google-auth-library";
import { randomUUID } from "crypto";

const app = express();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use("/api/uploads", express.static("uploads"));

async function getSafeUser(id) {
  const [users] = await pool.query(
    "SELECT id, name, surname, birthDate, email, address, avatar, notifyOrders, notifyFundraisers, donated, booksGiven FROM users WHERE id = ?",
    [id],
  );
  return users[0];
}

app.get("/api/health", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 AS ok");
  res.json({ status: "ok", db: rows[0].ok === 1 });
});

app.post("/api/register", async (req, res) => {
  const { name, surname, birthDate, email, password, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Fill all required fields" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);

  if (existing.length > 0) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (name, surname, birthDate, email, passwordHash, address) VALUES (?, ?, ?, ?, ?, ?)",
    [
      name,
      surname ?? null,
      birthDate ?? null,
      email,
      passwordHash,
      address ?? null,
    ],
  );

  sendMail(
    email,
    "Ласкаво просимо до Book Exchange",
    `Привіт, ${name}! Дякуємо за реєстрацію. Тепер ви можете обмінювати книги заради благодійності.`,
  );

  res.status(201).json({ ok: true });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill all fields" });
  }

  const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const user = users[0];

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.userId = user.id;
  res.json(await getSafeUser(user.id));
});

app.post("/api/auth/google", async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ message: "Google token is required" });
  }

  let info;
  try {
    const tokenInfo = await googleClient.getTokenInfo(accessToken);
    if (tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
      throw new Error("Wrong audience");
    }

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!response.ok) throw new Error("Userinfo failed");
    info = await response.json();
  } catch {
    return res.status(401).json({ message: "Invalid Google token" });
  }

  if (!info.email || !info.email_verified) {
    return res.status(401).json({ message: "Google email is not verified" });
  }

  const [users] = await pool.query("SELECT id FROM users WHERE email = ?", [
    info.email,
  ]);

  let userId;

  if (users.length > 0) {
    userId = users[0].id;
  } else {
    const passwordHash = await bcrypt.hash(randomUUID(), 10);
    const name = info.given_name || info.name || "User";

    const [result] = await pool.query(
      "INSERT INTO users (name, surname, email, passwordHash) VALUES (?, ?, ?, ?)",
      [name, info.family_name ?? null, info.email, passwordHash],
    );
    userId = result.insertId;

    sendMail(
      info.email,
      "Ласкаво просимо до Book Exchange",
      `Привіт, ${name}! Дякуємо за реєстрацію. Тепер ви можете обмінювати книги заради благодійності.`,
    );
  }

  req.session.userId = userId;
  res.json(await getSafeUser(userId));
});

app.get("/api/me", requireAuth, async (req, res) => {
  res.json(await getSafeUser(req.session.userId));
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

app.get("/api/books", async (req, res) => {
  const userId = req.query.userId;

  if (userId) {
    const [books] = await pool.query("SELECT * FROM books WHERE userId = ?", [
      userId,
    ]);
    return res.json(books);
  }

  const [books] = await pool.query("SELECT * FROM books");
  res.json(books);
});

app.get("/api/books/:id", async (req, res) => {
  const [books] = await pool.query("SELECT * FROM books WHERE id = ?", [
    req.params.id,
  ]);

  if (books.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  const book = books[0];

  const [users] = await pool.query(
    "SELECT id, name, avatar, donated, booksGiven FROM users WHERE id = ?",
    [book.userId],
  );

  book.user = users[0];
  res.json(book);
});

app.patch("/api/me", requireAuth, async (req, res) => {
  const { name, surname, birthDate, email, address } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Fill all required fields" });
  }

  const [existing] = await pool.query(
    "SELECT id FROM users WHERE email = ? AND id <> ?",
    [email, req.session.userId],
  );

  if (existing.length > 0) {
    return res.status(409).json({ message: "Email already exists" });
  }

  await pool.query(
    "UPDATE users SET name = ?, surname = ?, birthDate = ?, email = ?, address = ? WHERE id = ?",
    [
      name,
      surname ?? null,
      birthDate ?? null,
      email,
      address ?? null,
      req.session.userId,
    ],
  );

  res.json(await getSafeUser(req.session.userId));
});

app.patch("/api/me/password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const [users] = await pool.query(
    "SELECT passwordHash FROM users WHERE id = ?",
    [req.session.userId],
  );

  const isValid = await bcrypt.compare(currentPassword, users[0].passwordHash);

  if (!isValid) {
    return res.status(403).json({ message: "Wrong current password" });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await pool.query("UPDATE users SET passwordHash = ? WHERE id = ?", [
    passwordHash,
    req.session.userId,
  ]);

  res.json({ ok: true });
});

app.patch("/api/me/notifications", requireAuth, async (req, res) => {
  const { notifyOrders, notifyFundraisers } = req.body;
  await pool.query(
    "UPDATE users SET notifyOrders = ?, notifyFundraisers = ? WHERE id = ?",
    [notifyOrders ? 1 : 0, notifyFundraisers ? 1 : 0, req.session.userId],
  );
  res.json(await getSafeUser(req.session.userId));
});

app.post(
  "/api/me/avatar",
  requireAuth,
  upload.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    await pool.query("UPDATE users SET avatar = ? WHERE id = ?", [
      `/uploads/${req.file.filename}`,
      req.session.userId,
    ]);

    res.json(await getSafeUser(req.session.userId));
  },
);

app.post(
  "/api/books",
  requireAuth,
  upload.single("image"),
  async (req, res) => {
    const { title, author, genre, fundraiser, plot } = req.body;
    const price = Number(req.body.price);

    if (!title || !author || !genre || !fundraiser) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    if (!Number.isInteger(price) || price < 1) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      "INSERT INTO books (title, author, genre, fundraiser, price, plot, image, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        author,
        genre,
        fundraiser,
        price,
        plot ?? null,
        image,
        req.session.userId,
      ],
    );

    notifyNewBook(result.insertId);

    res.status(201).json({ id: result.insertId });
  },
);

app.patch(
  "/api/books/:id",
  requireAuth,
  upload.single("image"),
  async (req, res) => {
    const [books] = await pool.query("SELECT * FROM books WHERE id = ?", [
      req.params.id,
    ]);

    if (books.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    const book = books[0];

    if (book.userId !== req.session.userId) {
      return res
        .status(403)
        .json({ message: "You can edit only your own books" });
    }

    const [taken] = await pool.query(
      "SELECT id FROM orders WHERE bookId = ? AND status <> 'pending'",
      [book.id],
    );

    if (taken.length > 0) {
      return res.status(409).json({ message: "Book is already ordered" });
    }

    const { title, author, genre, fundraiser, plot } = req.body;
    const price = Number(req.body.price);

    if (!title || !author || !genre || !fundraiser) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    if (!Number.isInteger(price) || price < 1) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : book.image;

    await pool.query(
      "UPDATE books SET title = ?, author = ?, genre = ?, fundraiser = ?, price = ?, plot = ?, image = ? WHERE id = ?",
      [title, author, genre, fundraiser, price, plot ?? null, image, book.id],
    );

    res.json({ id: book.id });
  },
);

app.get("/api/orders", requireAuth, async (req, res) => {
  const [orders] = await pool.query("SELECT * FROM orders WHERE userId = ?", [
    req.session.userId,
  ]);

  for (const order of orders) {
    const [books] = await pool.query("SELECT * FROM books WHERE id = ?", [
      order.bookId,
    ]);
    order.book = books[0];
  }

  res.json(orders);
});

app.get("/api/orders/:id", requireAuth, async (req, res) => {
  const [orders] = await pool.query(
    "SELECT * FROM orders WHERE id = ? AND userId = ?",
    [req.params.id, req.session.userId],
  );

  if (orders.length === 0) {
    return res.status(404).json({ message: "Order not found" });
  }

  const order = orders[0];
  const [books] = await pool.query("SELECT * FROM books WHERE id = ?", [
    order.bookId,
  ]);
  order.book = books[0];

  res.json(order);
});

app.post("/api/orders", requireAuth, async (req, res) => {
  const bookId = req.body.bookId;

  if (!bookId) {
    return res.status(400).json({ message: "bookId is required" });
  }

  const [books] = await pool.query("SELECT * FROM books WHERE id = ?", [
    bookId,
  ]);

  if (books.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (books[0].userId === req.session.userId) {
    return res.status(403).json({ message: "You cannot order your own book" });
  }

  const [taken] = await pool.query(
    "SELECT id FROM orders WHERE bookId = ? AND status <> 'pending'",
    [bookId],
  );

  if (taken.length > 0) {
    return res.status(409).json({ message: "Book already ordered" });
  }

  const [pending] = await pool.query(
    "SELECT * FROM orders WHERE bookId = ? AND userId = ? AND status = 'pending'",
    [bookId, req.session.userId],
  );

  if (pending.length > 0) {
    return res.json(pending[0]);
  }

  const [result] = await pool.query(
    "INSERT INTO orders (userId, bookId, status) VALUES (?, ?, 'pending')",
    [req.session.userId, bookId],
  );

  sendOrderMail(result.insertId, "created");

  res.status(201).json({
    id: result.insertId,
    userId: req.session.userId,
    bookId,
    status: "pending",
  });
});

app.post("/api/orders/:id/pay", requireAuth, async (req, res) => {
  const [orders] = await pool.query(
    "SELECT * FROM orders WHERE id = ? AND userId = ?",
    [req.params.id, req.session.userId],
  );

  if (orders.length === 0) {
    return res.status(404).json({ message: "Order not found" });
  }

  const order = orders[0];

  if (order.status !== "pending") {
    return res.status(409).json({ message: "Order is not pending" });
  }

  const [taken] = await pool.query(
    "SELECT id FROM orders WHERE bookId = ? AND status <> 'pending'",
    [order.bookId],
  );

  if (taken.length > 0) {
    return res.status(409).json({ message: "Book already ordered" });
  }

  await pool.query("UPDATE orders SET status = 'active' WHERE id = ?", [
    order.id,
  ]);

  sendOrderMail(order.id, "paid");

  res.json({ ok: true });
});

app.delete("/api/orders/:id", requireAuth, async (req, res) => {
  const [result] = await pool.query(
    "DELETE FROM orders WHERE id = ? AND userId = ? AND status = 'pending'",
    [req.params.id, req.session.userId],
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({ ok: true });
});

app.use((error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "File is too large" });
  }

  console.error(error.message);
  res.status(500).json({ message: "Server error" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
