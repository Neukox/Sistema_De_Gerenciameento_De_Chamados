# Sistema de Gerenciamento de Chamados - Frontend

Este é o frontend do Sistema de Gerenciamento de Chamados, desenvolvido com **React**, **TypeScript** e **Vite**. Ele utiliza **TailwindCSS** e **DaisyUI** para estilização e segue boas práticas de desenvolvimento.

## 📂 Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
src/
├── assets/               # Arquivos estáticos (imagens, ícones, etc.)
├── components/           # Componentes reutilizáveis
│   └── ui/               # Componentes de interface do usuário (formulários, botões, etc.)
├── pages/                # Páginas do sistema
├── App.tsx               # Componente principal do aplicativo
├── main.tsx              # Ponto de entrada do React
├── routes.ts             # Configuração de rotas
└── index.css             # Estilos globais
```

### Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd Frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse o aplicativo no navegador:
   ```
   http://localhost:5173
   ```

## 🚀 Funcionalidades

### Autenticação

O projeto possui páginas e componentes para autenticação, como:

- **Login**: Página para autenticação de usuários.
- **Cadastro**: Página para registro de novos usuários.
- **Recuperação de Senha**: Página para solicitar redefinição de senha.
- **Redefinição de Senha**: Página para redefinir a senha utilizando um token.

### Rotas

As rotas do projeto são configuradas no arquivo [`routes.ts`](src/routes.ts).

#### Exemplo de uso:

```ts
import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "@pages/home/Home";
import Login from "@pages/auth/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "login", Component: LoginPage },
      { path: "home", Component: HomePage },
    ],
  },
]);

export default router;
```

#### Navegar Entre Páginas

Utilize o componente `Link` ou o hook `useNavigate` para navegar entre as páginas:

- **Componente `Link`:**

```tsx
import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
```

- **Hook `useNavigate`:**

```tsx
import { useNavigate } from "react-router";

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticação
    navigate("/home");
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

Com essas configurações, o React Router estará pronto para gerenciar as rotas do projeto.

### Estilização

O projeto utiliza **TailwindCSS** para estilização, com temas personalizados configurados no arquivo [`index.css`](src/index.css). **DaisyUI** é usado para componentes pré-estilizados.

#### Exemplo de configuração de tema no `index.css`:

```css
@plugin "daisyui/theme" {
    name: "neukox";
    default: true;
    --color-base-100: oklch(100% 0% 89.876);
    --color-primary: oklch(21.3% 9.75% 250.09);
}
```

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa o ESLint para verificar problemas no código.
- `npm run preview`: Visualiza a build de produção localmente.

## 📚 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida para desenvolvimento web.
- **TailwindCSS**: Framework de CSS utilitário.
- **DaisyUI**: Componentes estilizados para TailwindCSS.
- **React Router**: Gerenciamento de rotas.