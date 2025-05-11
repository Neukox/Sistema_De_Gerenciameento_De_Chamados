import Form from "@components/ui/form";

export default function EditUserForm() {
  return (
    <form className="flex flex-col gap-4 flex-1">
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="name" className="text-black">
          Nome
        </Form.Label>
        <Form.Input
          id="name"
          name="name"
          type="text"
          placeholder="Nome"
          className="bg-base-100 w-full"
        />
      </Form.Field>
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="email" className="text-black">
          Email
        </Form.Label>
        <Form.Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="bg-base-100 w-full"
        />
      </Form.Field>
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="password" className="text-black">
          Senha
        </Form.Label>
        <Form.Password
          id="password"
          name="password"
          placeholder="Senha"
          className="bg-base-100 w-full"
        />
      </Form.Field>
      <Form.Field className="flex flex-col flex-1">
        <Form.Label htmlFor="confirmPassword" className="text-black">
          Confirmar Senha
        </Form.Label>
        <Form.Password
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          className="bg-base-100 w-full"
        />
      </Form.Field>
      <button type="submit" className="btn btn-primary self-end">
        Salvar
      </button>
    </form>
  );
}
