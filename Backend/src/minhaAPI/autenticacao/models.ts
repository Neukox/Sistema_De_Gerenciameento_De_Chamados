export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string; // Pode ser 'admin', 'cliente'
}

export interface ForgotPasswordData {
  user_name: string; // Nome do usuário
  url: string; // URL para redefinição de senha
}

export interface AuthResponse {
  mensagem: string;
  session?: any; // Pode ser um objeto com informações da sessão
  token?: string; // Token JWT gerado após o login
  erro?: string; // Mensagem de erro, se houver
}

export interface AuthRequest {
  nome?: string; // Nome do usuário, opcional para login
  email: string; // Email do usuário
  senha: string; // Senha do usuário
}

export interface ForgotPasswordRequest {
  new_password: string; // Nova senha
  token: string; // Token de redefinição de senha
}
