import { Author } from '../../components/AuthorsAutoComplete/slice/types';

interface Image {
  name: string;
}
export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Author[];
  publishedDate: string;
  image: Image;
  pageCount: number;
  overview?: string;
  publisher: string;
  copiesNbr: number;
}

export interface AddBookState extends Omit<Book, 'id'> {
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  successMessage?: string;
}
