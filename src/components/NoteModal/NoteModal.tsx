import { createPortal } from "react-dom";
import css from "./NoteModal.module.css";
import NoteForm from "../NoteForm/NoteForm";

export default function NodeModal() {
  return createPortal(
    <>
      <div className={css.backdrop} role="dialog" aria-modal="true">
        <div className={css.modal}>
          <NoteForm />
        </div>
      </div>
    </>,
    document.body
  );
}
