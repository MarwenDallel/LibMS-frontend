import { Author } from '../components/AuthorsAutoComplete/slice/types';

export interface AddBookForm {
  isbn: string;
  title: string;
  subtitle?: string;
  originalTitle?: string;
  authors: Array<Author>;
  publisher: string;
  publicationDate: string;
  image: FileList;
  pageCount: number;
  overview?: string;
  copieCount: number;
}
