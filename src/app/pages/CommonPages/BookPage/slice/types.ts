import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';

export interface MemberBookState extends Book {
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  successMessage?: string;
}
