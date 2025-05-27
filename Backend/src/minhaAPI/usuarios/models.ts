export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  public_key: string;
  private_key: string;
}

export interface UsuarioCreate {
  nome: string;
  email: string;
  senha: string;
}
