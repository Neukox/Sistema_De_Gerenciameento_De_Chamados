import { useState } from "react";

export default function useFilters() {
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return {
    status,
    search,
    handleSearch,
    handleStatus,
  };
}
