import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { google } from "googleapis";
import form from "./routes/form.route.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

export const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets = google.sheets({
  version: "v4",
  auth,
});

console.log("Connected successfully");

app.use("/api/v1", form);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
