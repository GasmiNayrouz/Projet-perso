import { Role } from "./Role";


 export interface User {
  id: number;
  username: string;
  password?: string;
  appUserRole: string;
  enabled?: boolean;
  authorities?: { authority: string }[];
}

 export interface userId {
 userId: number;
 }
