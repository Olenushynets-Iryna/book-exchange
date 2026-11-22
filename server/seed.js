import fs from "node:fs";
import bcrypt from "bcryptjs";
import { pool } from "./db.js";

const text = fs.readFileSync("../client/db.json", "utf8");
const data = JSON.parse(text);

await pool.query("DELETE FROM orders");
await pool.query("DELETE FROM books");
await pool.query("DELETE FROM users");

for (const user of data.users) {
  const passwordHash = await bcrypt.hash(String(user.password), 10);

  await pool.query(
    "INSERT INTO users (id, name, surname, birthDate, email, passwordHash, address, donated, booksGiven) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user.id,
      user.name,
      user.surname ?? null,
      user.birthDate ?? null,
      user.email,
      passwordHash,
      user.address ?? null,
      user.donated ?? 0,
      user.booksGiven ?? 0,
    ],
  );
}

for (const book of data.books) {
  await pool.query(
    "INSERT INTO books (id, title, author, genre, fundraiser, price, plot, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      book.id,
      book.title,
      book.author,
      book.genre,
      book.fundraiser,
      book.price,
      book.plot ?? null,
      book.userId,
    ],
  );
}

for (const order of data.orders) {
  const user = data.users.find((item) => item.id === order.userId);
  const book = data.books.find((item) => item.id === order.bookId);

  if (!user || !book) continue;

  await pool.query(
    "INSERT INTO orders (id, userId, bookId, status) VALUES (?, ?, ?, ?)",
    [order.id, order.userId, order.bookId, order.status],
  );
}

console.log("Done");
await pool.end();
