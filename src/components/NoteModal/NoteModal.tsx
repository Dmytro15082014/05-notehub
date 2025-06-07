import { createPortal } from "react-dom";
import css from "./NoteModal.module.css";

export default function NodeModal() {
  return createPortal(
    <>
      <div className={css.backdrop} role="dialog" aria-modal="true">
        <div className={css.modal}>{/* Компонент NoteForm */}</div>
      </div>
    </>,
    document.body
  );
}
