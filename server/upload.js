import fs from "node:fs";
import multer from "multer";

fs.mkdirSync("uploads", { recursive: true });

const extensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, name + extensions[file.mimetype]);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    callback(null, file.mimetype in extensions);
  },
  limits: { fileSize: 2 * 1024 * 1024 },
});
