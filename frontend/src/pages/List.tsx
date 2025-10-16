import { useState, useEffect, useCallback } from 'react';
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
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await sendApiRequestandHandleError('GET', 'expenses');
      // Ensure data is an array before setting state
      setExpenses(Array.isArray(data) ? data : []);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo);
  };

  // Create a safe sorted copy of expenses array
  const sortedExpenses = Array.isArray(expenses) ? [...expenses].sort(sortingAlgo) : [];

  return (
    <div className="min-h-[calc(100vh-160px)] py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-60"></div>
      
      <div className="space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1a2037' }}>
            Expense List
          </h1>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
          <p className="text-lg opacity-70 mt-4" style={{ color: '#6b7280' }}>
            Track and manage all your expenses
          </p>
        </div>

        {/* Expense Counter and Sorter */}
        {!loading && !error && expenses.length > 0 && (
          <div className="flex flex-row justify-between items-center mb-8 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
            <h2 className="text-2xl font-semibold flex items-center gap-3" style={{ color: '#1a2037' }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e4d7bc' }}></span>
              Expenses ({expenses.length})
            </h2>
            <ExpenseSorter setSortingAlgo={handleAlgoChange} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-row justify-center items-center gap-6 my-12 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#1a2037' }}></div>
            <p className="text-lg font-medium" style={{ color: '#1a2037' }}>Loading expenses…</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex justify-between items-center shadow-lg">
            <span className="font-medium">{error}</span>
            <button 
              onClick={fetchExpenses}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
              Retry
            </button>
          </div>
        )}

        {/* Expenses Table */}
        {!loading && !error && (
          <div className="w-full">
            {sortedExpenses.length === 0 ? (
              <div className="text-center my-16 p-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
                <p className="text-xl font-medium mb-4" style={{ color: '#1a2037' }}>
                  No expenses yet
                </p>
                <p className="text-lg opacity-70" style={{ color: '#6b7280' }}>
                  Add your first expense to get started!
                </p>
              </div>
            ) : (
              <div className="overflow-hidden shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2" style={{ borderColor: '#e4d7bc' }}>
                      <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Date</TableHead>
                      <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Description</TableHead>
                      <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Paid by</TableHead>
                      <TableHead className="text-right py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedExpenses.map((expense, index) => (
                      <TableRow 
                        key={expense.id} 
                        className="hover:bg-white/80 transition-all duration-300 border-b border-gray-100"
                        style={{ 
                          backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(228, 215, 188, 0.1)'
                        }}
                      >
                        <TableCell className="text-left py-6 px-6 text-sm font-medium" style={{ color: '#6b7280' }}>
                          {expense.date}
                        </TableCell>
                        <TableCell className="text-left py-6 px-6">
                          <div className="text-base font-semibold" style={{ color: '#1a2037' }} title={expense.description}>
                            {expense.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-left py-6 px-6">
                          <span className="px-3 py-1 rounded-full text-sm font-medium" 
                                style={{ 
                                  backgroundColor: '#e4d7bc', 
                                  color: '#1a2037'
                                }}>
                            {expense.payer.name}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-6 px-6 text-lg font-bold" style={{ color: '#1a2037' }}>
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