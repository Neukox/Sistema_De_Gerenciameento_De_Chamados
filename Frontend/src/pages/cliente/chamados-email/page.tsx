import TicketCard from "@components/tickets/Card";
import Search from "@components/ui/form/Search";
import Select from "@components/ui/form/Select";
import { userTicketsMock } from "./../../../mocks/userTicketsMock";

/**
 * @description Página de Chamados por Chat do Cliente.
 *
 * Essa página exibe uma lista de chamados relacionados ao atendimento por chat.
 * O usuário pode filtrar os chamados por status e pesquisar por palavras-chave.
 *
 * @component
 * @returns {JSX.Element} O componente da página renderizado.
 */

export default function ClientEmailTicketsPage() {
  const emailTickets = userTicketsMock.filter(
    (ticket) => ticket.tipo_atendimento === "email"
  );

  return (
    <div className="w-full bg-base-200 flex justify-center min-h-[calc(100vh-5.0625rem)]">
      <div className="w-full max-w-screen-xl mb-8 px-4">
        <h1 className="my-6">Meus Chamados por E-mail</h1>
        <div className="flex flex-col xs:flex-row gap-4 justify-between bg-base-20 mb-6">
          <Search
            placeholder="Pesquisar chamados"
            onChange={(e) => console.log(e.target.value)}
            className="w-full xs:max-w-2xs"
          />
          <Select
            defaultValue=""
            onChange={(e) => console.log(e.target.value)}
            className="w-full xs:max-w-2xs"
          >
            <option value="" defaultChecked disabled>
              Selecione o status
            </option>
            <option value="">Todos</option>
            <option value="aberto">Aberto</option>
            <option value="em andamento">Em Andamento</option>
            <option value="pendente">Pendente</option>
            <option value="resolvido">Resolvido</option>
            <option value="fechado">Fechado</option>
            <option value="cancelado">Cancelado</option>
          </Select>
        </div>
        <div className="flex flex-col gap-8">
          {emailTickets.map((ticket) => (
            <TicketCard key={ticket.id} data={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
