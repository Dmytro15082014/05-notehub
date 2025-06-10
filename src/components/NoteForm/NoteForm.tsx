import { useEffect, useId } from "react";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";

interface NoteForm {
  cancel: () => void;
}

const initValues: Note = {
  title: "",
  content: "",
  tag: "Todo",
};

const SchemaNoteOrder = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Content is too long")
    .required("Content is required"),
  tag: Yup.string().oneOf(
    ["Todo", "Work", "Personal", "Meeting", "Shopping"],
    "Invalid tag"
  ),
});

export default function NoteForm({ cancel }: NoteForm) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (newNote: Note) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
    onError: () => {
      cancel();
    },
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") cancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [cancel]);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) cancel();
  };

  const noteFormSubmit = (values: Note, actions: FormikHelpers<Note>) => {
    mutate(values);
    actions.resetForm();
    cancel();
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        onSubmit={noteFormSubmit}
        validationSchema={SchemaNoteOrder}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage component="span" name="title" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows="8"
              className={css.textarea}
            />
            <ErrorMessage
              component="span"
              name="content"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage component="span" name="tag" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={false}>
              {isPending ? "Creating new note..." : "Create note"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
