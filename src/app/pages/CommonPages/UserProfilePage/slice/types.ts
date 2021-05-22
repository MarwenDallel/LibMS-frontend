/* --- STATE --- */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  universityID: string;
  role: string;
}

export interface UserProfileState extends User {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
