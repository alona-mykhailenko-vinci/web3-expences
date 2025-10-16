import type { LoaderFunctionArgs } from 'react-router-dom';
import ApiClient from '../../lib/api';
import type { Expense } from '../../types/Expense';

export interface LoaderData {
  expense: Expense | null;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
  try {
    const expenseId = params.id;
    
    if (!expenseId) {
      throw new Error('Expense ID is required');
    }

    const expenseIdNumber = parseInt(expenseId, 10);
    if (isNaN(expenseIdNumber)) {
      throw new Error('Invalid expense ID');
    }

    const expense = await ApiClient.getExpenseById(expenseIdNumber);
    
    return {
      expense,
    };
  } catch (error) {
    console.error('Failed to load expense:', error);
    // Return null expense on error to handle gracefully in component
    return {
      expense: null,
    };
  }
}