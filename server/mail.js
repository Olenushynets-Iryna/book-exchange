import "dotenv/config";
import nodemailer from "nodemailer";
import { pool } from "./db.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

// Загальна відправка. Помилка листа не ламає запит.
export async function sendMail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"Book Exchange" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error("Mail error:", err.message);
  }
}

// kind = 'created' або 'paid'
export async function sendOrderMail(orderId, kind) {
  try {
    const [rows] = await pool.query(
      `SELECT u.email, u.name, b.title, b.price,
              s.email AS sellerEmail, s.name AS sellerName, s.notifyOrders
       FROM orders o
       JOIN users u ON u.id = o.userId
       JOIN books b ON b.id = o.bookId
       JOIN users s ON s.id = b.userId
       WHERE o.id = ?`,
      [orderId],
    );
    if (rows.length === 0) return;
    const r = rows[0];

    if (kind === "created") {
      await sendMail(
        r.email,
        "Замовлення створено",
        `Привіт, ${r.name}!\n\nВи замовили книгу «${r.title}». Сума внеску: ${r.price} грн.\nЩоб завершити, оплатіть замовлення в особистому кабінеті.`,
      );
      // сповіщення продавцю, якщо він це дозволив
      if (r.notifyOrders) {
        await sendMail(
          r.sellerEmail,
          "Нове замовлення вашої книги",
          `Привіт, ${r.sellerName}!\n\nХтось замовив вашу книгу «${r.title}».`,
        );
      }
    } else if (kind === "paid") {
      await sendMail(
        r.email,
        "Оплату отримано",
        `Привіт, ${r.name}!\n\nДякуємо! Оплату за книгу «${r.title}» (${r.price} грн) отримано. Ваш внесок піде на благодійність.`,
      );
    }
  } catch (err) {
    console.error("Order mail error:", err.message);
  }
}

// Новий збір: лист усім, хто ввімкнув сповіщення, крім автора
export async function notifyNewBook(bookId) {
  try {
    const [books] = await pool.query(
      "SELECT title, fundraiser, userId FROM books WHERE id = ?",
      [bookId],
    );
    if (books.length === 0) return;
    const book = books[0];

    const [users] = await pool.query(
      "SELECT email, name FROM users WHERE notifyFundraisers = 1 AND id <> ?",
      [book.userId],
    );

    for (const u of users) {
      await sendMail(
        u.email,
        "Новий збір на Book Exchange",
        `Привіт, ${u.name}!\n\nДодано нове оголошення «${book.title}» на збір: ${book.fundraiser}.`,
      );
    }
  } catch (err) {
    console.error("Fundraiser mail error:", err.message);
  }
}
