import EditUserForm from "@components/user/Edit";

/**
 * Componente de página de perfil do usuário.
 * Exibe informações do perfil do usuário e permite  editar o perfil do usuário.
 *
 * @returns {JSX.Element} Componente de página de perfil do usuário.
 */
export default function UserProfilePage() {
  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-screen-lg flex flex-col">
        <h1 className="mb-6">Meu perfil</h1>
        <div className="flex flex-col gap-4">
          <div className="w-full bg-base-200 rounded-lg shadow-md p-6 flex flex-col gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Informações do Usuário
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 text-base">
                <p className="flex-1">Nome: User name</p>
                <p className="flex-1">Email: username@gmail.com</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold">
                Editar informações do usuário
              </h3>
              <EditUserForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
