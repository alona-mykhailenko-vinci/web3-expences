// pages/Home.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseAdd from '../components/ExpenseAdd';
import ExpenseSorter from '../components/ExpenseSorter';
import type { Expense,ExpenseInput } from '../types/Expense';

const host = import.meta.env.VITE_API_URL;

console.log('\ud83c\udf10 Frontend Environment:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  host,
  NODE_ENV: import.meta.env.NODE_ENV
});

const Home: React.FC = () => {
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
      setExpenses(data);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

const handleAddExpense = async (newExpenseForm: ExpenseInput) => {
    const newExpenseOptimistic = { id: 'optimistic', ...newExpenseForm } as Expense; // We add a temporary id -1 for React key, it will be replaced when we get the real added expense from backend
    const newExpensesOptimistic = [newExpenseOptimistic, ...expenses]; // Optimistically update the state, whatever the sort method, add on top
    setExpenses(newExpensesOptimistic);
    const addedExpense = await sendApiRequestandHandleError('POST', 'expenses', newExpenseForm);
    const newExpensesActual = [addedExpense, ...expenses]; // Now that we have the actual added expense with id from backend, let's use it instead of the optimistically added one
    setExpenses(newExpensesActual);
  };

  const handleResetData = async () => {
    setExpenses([]); // Clear current expenses optimistically
    setLoading(true);

    const resetData = await sendApiRequestandHandleError('POST', 'expenses/reset');
    setExpenses(resetData.data);
    setLoading(false);
  };

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo); // Pay attention here, we're wrapping algo in a function because useState setter accept either a value or a function returning a value.
  };

  const sortedExpenses = expenses.sort(sortingAlgo);

  if (loading) {
    return <div>Loading expenses...</div>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: 6,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box sx={{ maxWidth: 560, mx: 'auto' }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight={700}
            sx={{ mb: 3 }}
          >
            Expense Tracker
          </Typography>

          {/* Actions */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 2 }}
          >
            <ExpenseAdd handleAdd={handleAddExpense} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetData}
              disabled={loading}
              sx={{ textTransform: 'none', borderRadius: 2, px: 2.5 }}
            >
              {loading ? <CircularProgress size={18} /> : 'Reset Data'}
            </Button>
          </Stack>

          {/* Expense Counter and Sorter */}
          {!loading && !error && expenses.length > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2, px: 1 }}
            >
              <Typography variant="h6" color="text.secondary">
                Expenses ({expenses.length})
              </Typography>
              <ExpenseSorter setSortingAlgo={handleAlgoChange} />
            </Stack>
          )}

         

          {/* States */}
          {loading && (
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5} sx={{ my: 4 }}>
              <CircularProgress />
              <Typography>Loading expenses…</Typography>
            </Stack>
          )}

          {error && !loading && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              action={
                <Button color="inherit" size="small" onClick={fetchExpenses}>
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          )}

          {/* Centered, minimalist column */}
          {!loading && !error && (
            <Stack spacing={1.25} sx={{ width: '100%', maxWidth: 560, mx: 'auto' }}>
              {sortedExpenses.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ my: 4 }}>
                  No expenses yet. Add your first one!
                </Typography>
              ) : (
                sortedExpenses.map((expense, index) => (
                  <ExpenseItem key={expense.id} expense={expense} index={index} />
                ))
              )}
            </Stack>
          )}
        </Box>


      </Container>
    </Box>
  );
};

export default Home;
