import ApiClient from '../../lib/api';
import type { Expense } from '../../types/Expense';

export interface LoaderData {
  expenses: Expense[];
}

export async function loader(): Promise<LoaderData> {
  try {
    const expenses = await ApiClient.getExpenses();
    return {
      expenses,
    };
  } catch (error) {
    console.error('Failed to load expenses:', error);
    // Return empty array on error to prevent loader from failing
    return {
      expenses: [],
    };
  }
}
