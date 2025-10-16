import type { User } from './User';

export interface Transfer {
  id: number;
  amount: number;
  date: string;
  sourceId: number;
  targetId: number;
  source: User;
  target: User;
}

export interface NewTransferPayload {
  amount: number;
  sourceId: number;
  targetId: number;
}