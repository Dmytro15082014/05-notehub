import axios from "axios";
import { type Note, type NoteInput } from "../types/note";

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

interface paramsProps {
  page: number;
  perPage: number;
  search?: string;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const headersToken = {
  Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  Accept: "application/json",
};

export async function fetchNotes(
  search: string,
  page: number
): Promise<FetchNotesProps> {
  const params: paramsProps = {
    page,
    perPage: 12,
  };
  if (search.trim()) {
    params.search = search;
  }
  const res = await axios.get<FetchNotesProps>(`/notes`, {
    params,
    headers: headersToken,
  });
  return res.data;
}

export async function createNote(noteData: NoteInput): Promise<NoteInput> {
  const res = await axios.post<NoteInput>("/notes", noteData, {
    headers: headersToken,
  });
  return res.data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: headersToken,
  });
  return res.data;
}
