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
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      accept: "application/json",
    },
  });
  return res.data;
}

// Типізуйте їх параметри, результат, який вони повертають, та відповідь від Axios. У вас мають бути наступні функції:

// fetchNotes : має виконувати запит для отримання колекції нотатків із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
