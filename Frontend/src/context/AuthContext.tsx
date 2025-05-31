import { createContext, useContext, useEffect, useState } from "react";
import { UserSession } from "types/User";

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  setSession: (token: string, user: UserSession) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * @description Contexto para gerenciar a autenticação do usuário na aplicação.
 *
 * Esse contexto fornece funções para login, logout e informações sobre o estado de autenticação do usuário.
 *
 * @component
 * @returns {JSX.Element} O componente de contexto de autenticação renderizado.
 */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado para armazenar o usuário autenticado e o token
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!user;

  // Recupera o token e o usuário do localStorage ao inicializar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as UserSession);
    }
  }, []);

  // Salva o token e o usuário no estado e no localStorage
  const setSession = (token: string, user: UserSession) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Função para fazer logout, limpando o estado e redirecionando para a página de login
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setSession, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * @description Hook para acessar o contexto de autenticação.
 *
 * Esse hook permite que componentes acessem o estado de autenticação e as funções
 * de login e logout fornecidas pelo AuthContext.
 *
 * @returns {AuthContextType} O contexto de autenticação.
 * @throws {Error} Se o hook for usado fora do AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
