import FetchError from "@components/ui/FetchError";
import Loading from "@components/ui/Loading";
import ChangePasswordForm from "@components/user/ChangePassword";
import EditUserForm from "@components/user/Edit";
import useUserInfo from "@hooks/useUserInfo";
import getUserInfo, { UserResponse } from "@services/userServices";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "types/User";

/**
 * Componente de página de perfil do usuário.
 * Exibe informações do perfil do usuário e permite  editar o perfil do usuário.
 *
 * @returns {JSX.Element} Componente de página de perfil do usuário.
 */
export default function UserProfilePage() {
  // Hook para obter informações do usuário
  const user = useUserInfo();
  // Converte o ID do usuário para um número
  const id = Number(user?.id);
  // Hook para buscar informações do usuário
  const { data, isLoading, error, refetch } = useQuery<
    User,
    AxiosError<UserResponse>
  >({
    queryKey: ["user", id],
    queryFn: () => getUserInfo(id),
    enabled: !!id,
  });

  // Mostra um loading enquanto os dados estão sendo buscados
  if (isLoading) return <Loading className="h-dvh" />;

  // Mostra um erro se a busca falhar
  if (error)
    return (
      <FetchError
        title="Não foi possível carregar as informações do usuário"
        message={error.response?.data?.error || error.response?.data?.message}
        action={refetch}
      />
    );

  return (
    <>
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-screen-lg flex flex-col">
          <h1 className="mb-4">Meu perfil</h1>
          <div className="flex flex-col gap-4">
            <div className="w-full bg-base-200 rounded-lg shadow-md p-6 flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-4">
                  <h2 className="text-2xl font-bold">Informações do Usuário</h2>
                  {data?.role === "admin" && (
                    <span className="badge badge-primary font-semibold">
                      Administrador
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 text-base">
                  <p className="flex-1">Nome: {data?.name}</p>
                  <p className="flex-1">Email: {data?.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold">
                  Editar informações do usuário
                </h3>
                <EditUserForm
                  userID={data?.id as number}
                  userInfoToEdit={{
                    nome: data?.name as string,
                    email: data?.email as string,
                  }}
                />
              </div>
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold">Alterar senha do usuário</h3>
                <ChangePasswordForm userId={data?.id as number} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
