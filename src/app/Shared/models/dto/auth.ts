import { User } from "../entities/user";


export interface LoginRequest {
  email: string;
  password: string;
}


export interface AuthResponse {
  token: string;
  user: User;
}