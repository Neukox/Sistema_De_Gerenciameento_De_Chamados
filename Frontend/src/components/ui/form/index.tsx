import Input from "./Input";
import Field from "./Field";
import Label from "./Label";
import Error from "./Error";
import Submit from "./Submit";
import Select from "./Select";
import Search from "./Search";

/**
 * Componente funcional React que renderiza um formulário.
 *
 * Este componente é uma coleção de subcomponentes que facilitam a criação de
 * formulários reutilizáveis e estilizados.
 *
 * @component
 * @return {JSX.Element} O formulário renderizado.
 */

const Form = {
  Input,
  Select,
  Search,
  Field,
  Label,
  Error,
  Submit,
};

export default Form;
