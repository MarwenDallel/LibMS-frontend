// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { AddBookState } from 'app/pages/AddBookPage/AddBookForm/slice/types';
import { AddBookAuthorsState } from 'app/pages/AddBookPage/components/AuthorsAutoComplete/slice/types';
import { BookState } from 'app/pages/BooksPage/slice/types';
import { LoginUserState } from 'app/pages/LoginPage/LoginForm/slice/types';
import { RegisterUserState } from 'app/pages/RegisterPage/RegisterForm/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  loginUser: LoginUserState;
  registerUser: RegisterUserState;
  addBookAuthors: AddBookAuthorsState;
  addBook: AddBookState;
  ListBook: BookState;
}
