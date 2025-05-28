export default function formatDate(timestamp: Date | null): string {
  if (!timestamp) {
    return "";
  }

  // Regex para validar o formato de timestamp atual no SQLite
  // Formato esperado: "YYYY-MM-DD HH:MM:SS"
  const sqliteTimestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  // Extraindo a parte da data e hora do timestamp
  const match = sqliteTimestampRegex.exec(
    timestamp.toISOString().replace("T", " ").substring(0, 19)
  );

  if (!match) {
    throw new Error("Formato de data inválido");
  }

  const year = match[0].substring(0, 4);
  const month = match[0].substring(5, 7);
  const day = match[0].substring(8, 10);
  const hour = match[0].substring(11, 13);
  const minute = match[0].substring(14, 16);
  const second = match[0].substring(17, 19);

  // Remove o sufixo "Z" da string de data

  const date = new Date(
    Date.UTC(+year, +month - 1, +day, +hour, +minute, +second)
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleString("pt-BR", options).split(", ").join(" ");
}
