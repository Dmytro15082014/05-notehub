import axios from "axios";
import { type Note } from "../types/note";

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
  accept: "application/json",
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

export async function createNote(noteData: Note) {
  const res = await axios.post<FetchNotesProps>("/notes", noteData, {
    headers: headersToken,
  });
  return res.data;
}

export async function deleteNote(note: number | undefined) {
  const res = await axios.delete(`/notes/${note}`, { headers: headersToken });
  return res.data;
}
