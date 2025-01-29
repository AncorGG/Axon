export interface User {
  id_user?: number;
  username: string;
  email: string;
  level?: number;
  experience?: number;
  registrationDate?: string;
  hashedPassword?: string;
  token?: string;
}
