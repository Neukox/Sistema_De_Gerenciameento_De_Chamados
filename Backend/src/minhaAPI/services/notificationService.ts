import { sendEmail } from "./emailService";
import { buscarEmailsAdmins } from "../bancodedados/usuarioRepo";

export async function sendNotificationToAdmins(
  subject: string,
  message: string
): Promise<void> {
  try {
    const adminEmails = await buscarEmailsAdmins();

    if (adminEmails.length === 0) {
      console.log("No admin emails found.");
      return;
    }

    const promises = adminEmails.map((email) =>
      sendEmail("gabrielcfonline0900@gmail.com", email, subject, message)
    );
    await Promise.all(promises);
  } catch (error) {
    console.error("Error sending notification to admins:", error);
  }
}
