import { Book } from 'app/pages/LibrarianPages/AddBookPage/AddBookForm/slice/types';

export interface MemberBooksState {
  books: Book[];
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
}
