import { useState, useEffect } from 'react';
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
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)', // Subtract navbar height
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
            Expense List
          </Typography>



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

          {/* Loading State */}
          {loading && (
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5} sx={{ my: 4 }}>
              <CircularProgress />
              <Typography>Loading expenses…</Typography>
            </Stack>
          )}

          {/* Error State */}
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

          {/* Expenses List */}
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
}