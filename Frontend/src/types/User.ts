export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserSession extends User {
  iat: string;
  exp: string;
}
