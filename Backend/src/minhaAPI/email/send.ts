import { email } from "./config";

export function sendRecoverPasswordEmail(
  to: string,
  locals: Record<string, any>
): void {
  try {
    email.send({
      template: "recuperar-senha",
      message: {
        to,
      },
      locals,
    });
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
}
