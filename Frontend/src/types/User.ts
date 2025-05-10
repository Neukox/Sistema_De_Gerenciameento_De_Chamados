export interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
}

export interface UserSession extends User {
  iat: string;
  exp: string;
}