export type Role = 'Admin' | 'Supporter' | 'User';
export type Priority = 'Lav' | 'Normal' | 'Høj';
export type Status = 'backlog' | 'blokeret' | 'Igang' | 'færdig';

export interface User {
  username: string;
  role: Role;
}