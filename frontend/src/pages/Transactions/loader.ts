import ApiClient from '../../lib/api';
import type { Transaction } from '../../types/Transaction';

export interface LoaderData {
  transactions: Transaction[];
}

export async function loader(): Promise<LoaderData> {
  try {
    const transactions = await ApiClient.getTransactions();
    return {
      transactions,
    };
  } catch (error) {
    console.error('Failed to load transactions:', error);
    // Return empty array on error to prevent loader from failing
    return {
      transactions: [],
    };
  }
}