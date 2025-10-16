// Transaction types matching the backend unified structure

export interface TransactionUser {
  id: number;
  name: string;
  email: string;
  bankAccount: string | null;
}

export interface Transaction {
  id: string; // Format: "expense-{id}" or "transfer-{id}"
  kind: 'expense' | 'transfer';
  amount: number;
  description: string;
  date: string;
  payer: TransactionUser;
  participants: TransactionUser[];
}

// Type guards for runtime type checking
export function isExpenseTransaction(transaction: Transaction): boolean {
  return transaction.kind === 'expense';
}

export function isTransferTransaction(transaction: Transaction): boolean {
  return transaction.kind === 'transfer';
}