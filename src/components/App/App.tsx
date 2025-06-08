import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebounce } from "use-debounce";

function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>(" ");
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note", page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} />
          {/* Пагінація */}
          <button className={css.button}>Create note +</button>
        </header>
        <NoteList />
      </div>
    </>
  );
}

export default App;
