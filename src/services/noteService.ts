import axios from "axios";
import { type Note } from "../types/note";

const config = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    accept: "application/json",
  },
};

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string
): Promise<FetchNotesProps> {
  const res = await axios.get<FetchNotesProps>(
    `https://notehub-public.goit.study/api/notes?search=${search}&page=${page}&perPage=12`,
    config
  );
  return res.data;
}

// Типізуйте їх параметри, результат, який вони повертають, та відповідь від Axios. У вас мають бути наступні функції:

// fetchNotes : має виконувати запит для отримання колекції нотатків із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
