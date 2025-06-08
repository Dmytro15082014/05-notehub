import css from "./NoteList.module.css";
import { type Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onSelect: (note: Note) => void;
}

export default function NoteList({ notes, onSelect }: NoteListProps) {
  return (
    <>
      <ul className={css.list}>
        {notes.map((note: Note) => (
          <li
            className={css.listItem}
            key={note.id}
            onClick={() => onSelect(note)}
          >
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
