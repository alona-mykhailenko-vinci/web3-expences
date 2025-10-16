import type { Identifiable } from './Core';

export interface User {
  id: number;
  name: string;
  email: string;
  bankAccount?: string;
}

export interface ExpenseInput {
  date: string;
  description: string;
  payer: string | User;
  amount: number;
}

export interface Expense extends ExpenseInput, Identifiable {
  payer: User;
  participants?: User[];
}