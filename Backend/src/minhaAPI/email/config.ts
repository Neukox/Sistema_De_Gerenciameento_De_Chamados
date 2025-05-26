import nodemailer from "nodemailer";
import Email from "email-templates";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true,
  logger: true,
});

export const email = new Email({
  message: {
    from: `"Neukox" <${process.env.SMTP_USER}>`,
  },
  transport: transporter,
  send: true,
  preview: false,
  views: {
    root: path.join(__dirname, "templates"),
    options: {
      extension: "hbs",
      map: {
        hbs: "handlebars",
      },
    },
  },
});
