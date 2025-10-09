import { useState, useEffect } from 'react';
import ExpenseSorter from '../components/ExpenseSorter';
import type { Expense } from '../types/Expense';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="min-h-[calc(100vh-160px)] py-8">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Expense List
        </h1>

        {/* Expense Counter and Sorter */}
        {!loading && !error && expenses.length > 0 && (
          <div className="flex flex-row justify-between items-center mb-6">
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

        {/* Expenses Table */}
        {!loading && !error && (
          <div className="w-full">
            {sortedExpenses.length === 0 ? (
              <p className="text-base text-gray-600 text-center my-8">
                No expenses yet. Add your first one!
              </p>
            ) : (
              <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Date</TableHead>
                      <TableHead className="text-left">Description</TableHead>
                      <TableHead className="text-left">Paid by</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedExpenses.map((expense) => (
                      <TableRow key={expense.id} className="hover:bg-gray-50">
                        <TableCell className="text-left text-sm text-gray-500 font-medium">
                          {expense.date}
                        </TableCell>
                        <TableCell className="text-left">
                          <div className="text-base font-semibold text-gray-900" title={expense.description}>
                            {expense.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-left text-sm text-gray-600">
                          {expense.payer}
                        </TableCell>
                        <TableCell className="text-right text-base font-bold text-gray-900">
                          ${expense.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}