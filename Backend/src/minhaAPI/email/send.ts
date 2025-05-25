import { buscarAdmins } from "../bancodedados/usuarioRepo";
import { email } from "./config";

/**
 * Envia um e-mail de recuperação de senha.
 *
 * @param {string} to - Endereço de e-mail do destinatário.
 * @param {Record<string, any>} locals - Dados locais para o template do e-mail.
 * @throws {Error} Se ocorrer um erro ao enviar o e-mail.
 */
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

/**
 * Envia uma notificação para todos os administradores sobre a abertura de um chamado.
 *
 * @param {Record<string, any>} locals - Dados locais para o template do e-mail.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando todos os e-mails forem enviados.
 * @throws {Error} Se ocorrer um erro ao buscar os e-mails dos administradores ou ao enviar os e-mails.
 */
export async function sendNotificationToAdmins(
  locals: Record<string, any>
): Promise<void> {
  try {
    const admins = await buscarAdmins();

    if (admins.length === 0) {
      console.log("No admin emails found.");
      return;
    }

    const promises = admins.map((admin) =>
      email.send({
        template: "abertura-chamado",
        message: {
          to: admin.email,
        },
        locals: {
          ...locals,
          name: admin.nome, // Adiciona o nome do administrador ao template
        },
      })
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Error sending notification to admins:", error);
    throw error;
  }
}

/**
 * Envia um e-mail de mensagem para o usuário sobre um chamado.
 *
 * @param {string} to - Endereço de e-mail do destinatário.
 * @param {string} template - Nome do template a ser usado.
 * @param {Record<string, any>} locals - Dados locais para o template do e-mail.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando o e-mail for enviado.
 * @throws {Error} Se ocorrer um erro ao enviar o e-mail.
 */

export async function sendMessageEmail(
  to: string,
  locals: Record<string, any>
): Promise<void> {
  try {
    await email.send({
      template: "mensagem-chamado",
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

/**
 * Envia um e-mail de atualização de status para o usuário sobre um chamado.
 *
 * @param {string} to - Endereço de e-mail do destinatário.
 * @param {Record<string, any>} locals - Dados locais para o template do e-mail.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando o e-mail for enviado.
 * @throws {Error} Se ocorrer um erro ao enviar o e-mail.
 */
export async function sendStatusChangeEmail(
  to: string,
  locals: Record<string, any>
): Promise<void> {
  try {
    await email.send({
      template: "atualizacao-chamado",
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
