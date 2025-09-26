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
  Snackbar,
  Divider,
} from '@mui/material';
import ExpenseItem from '../components/ExpenseItem';
import ExpenseAdd from '../components/ExpenseAdd';
import type { Expense } from '../types/Expense';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/expenses`);
      if (!response.ok) throw new Error(`Failed to fetch expenses: ${response.statusText}`);
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load expenses';
      setError(errorMessage);
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async (newExpense: Omit<Expense, 'id'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });
      if (!response.ok) throw new Error(`Failed to add expense: ${response.statusText}`);
      await fetchExpenses();
      setSnackbar({ open: true, message: 'Expense added successfully!', severity: 'success' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add expense';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      console.error('Error adding expense:', err);
    }
  };

  const handleReset = async () => {
    try {
      setResetLoading(true);
      const response = await fetch(`${API_BASE_URL}/expenses/reset`, { method: 'POST' });
      if (!response.ok) throw new Error(`Failed to reset expenses: ${response.statusText}`);
      await fetchExpenses();
      setSnackbar({ open: true, message: 'Data reset to initial state successfully!', severity: 'success' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset data';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      console.error('Error resetting expenses:', err);
    } finally {
      setResetLoading(false);
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

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
            <ExpenseAdd handleAdd={handleAdd} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
              disabled={resetLoading}
              sx={{ textTransform: 'none', borderRadius: 2, px: 2.5 }}
            >
              {resetLoading ? <CircularProgress size={18} /> : 'Reset Data'}
            </Button>
          </Stack>

         

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
              {expenses.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ my: 4 }}>
                  No expenses yet. Add your first one!
                </Typography>
              ) : (
                expenses.map((expense, index) => (
                  <ExpenseItem key={expense.id} expense={expense} index={index} />
                ))
              )}
            </Stack>
          )}
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Home;
