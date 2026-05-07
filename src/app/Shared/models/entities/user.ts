
export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface User {
  id?: number;           
  name: string;
  email: string;
  telNumber: string;
  role: UserRole;
  registerDate: string; 
  
}