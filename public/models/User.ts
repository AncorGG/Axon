export interface User {
  id?: number;
  username: string;
  email: string;
  level?: number;
  experience?: number;
  registrationDate?: string;
  hashedPassword?: string;
  token?: string;
}
