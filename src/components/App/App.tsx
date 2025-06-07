import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import { fetchNotes } from "../../services/noteService";

function App() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note"],
    queryFn: fetchNotes,
  });

  const handleSearch = () => {};

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />
          {/* Пагінація */}
          <button className={css.button}>Create note +</button>
        </header>
        <NoteList />
      </div>
    </>
  );
}

export default App;
