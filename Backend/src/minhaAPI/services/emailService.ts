import nodemailer from "nodemailer";

export async function sendEmail(
  from: string,
  to: string,
  subject: string,
  text: string
): Promise<void> {
  // Configuração do transportador SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true, // Habilita o modo de depuração
    logger: true, // Habilita o log
  });

  // Opções do email
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions);
}
