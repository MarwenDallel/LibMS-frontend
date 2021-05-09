export interface BookState {
  AuthorName: string;
  AuthorLastName: string;
  isbn: number;
  BookTitle: string;
  BookSubTitle: string;
  originalTitle: string;
  publishedDate: string;
  image: string;
  pageCount: string;
  overview: string;
  publisher: string;
  errorMessage: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}
