import { useState, useEffect } from 'react';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseSorter from '../components/ExpenseSorter';
import type { Expense } from '../types/Expense';

const host = import.meta.env.VITE_API_URL;

export default function List() {
  const [sortingAlgo, setSortingAlgo] = useState<(_a: Expense, _b: Expense) => number>(() => () => 0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sendApiRequestandHandleError = async (method: string = 'GET', path: string, body?: unknown) => {
    try {
      const response = await fetch(`${host}/api/${path}`, {
        method: method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await sendApiRequestandHandleError('GET', 'expenses');
      // Ensure data is an array before setting state
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo);
  };

  // Create a safe sorted copy of expenses array
  const sortedExpenses = Array.isArray(expenses) ? [...expenses].sort(sortingAlgo) : [];

  return (
    <div className="min-h-[calc(100vh-80px)] grid place-items-center px-2 py-6 bg-white">
      <div className="max-w-sm px-0 sm:px-2">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
            Expense List
          </h1>

          {/* Expense Counter and Sorter */}
          {!loading && !error && expenses.length > 0 && (
            <div className="flex flex-row justify-between items-center mb-4 px-1">
              <h2 className="text-xl text-gray-600">
                Expenses ({expenses.length})
              </h2>
              <ExpenseSorter setSortingAlgo={handleAlgoChange} />
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-row justify-center items-center gap-6 my-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="text-gray-700">Loading expenses…</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={fetchExpenses}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          )}

          {/* Expenses List */}
          {!loading && !error && (
            <div className="flex flex-col gap-5 w-full max-w-xl mx-auto">
              {sortedExpenses.length === 0 ? (
                <p className="text-base text-gray-600 text-center my-8">
                  No expenses yet. Add your first one!
                </p>
              ) : (
                sortedExpenses.map((expense, index) => (
                  <ExpenseItem key={expense.id} expense={expense} index={index} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}