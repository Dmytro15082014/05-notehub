import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import ReactPaginate from "react-paginate";
import Pagination from "../Pagination/Pagination";

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
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} />
          {isSuccess && totalPages > 1 && (
            <Pagination totalPages={totalPages} page={page} onPage={setPage} />
          )}
          <button className={css.button}>Create note +</button>
        </header>
        {isSuccess && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

export default App;
