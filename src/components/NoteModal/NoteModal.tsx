import { createPortal } from "react-dom";
import css from "./NoteModal.module.css";
import NoteForm from "../NoteForm/NoteForm";

interface NodeModal {
  onClose: () => void;
}

export default function NodeModal({ onClose }: NodeModal) {
  const handleBackDropClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <>
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackDropClose}
      >
        <div className={css.modal}>
          <NoteForm cancel={onClose} />
        </div>
      </div>
    </>,
    document.body
  );
}
