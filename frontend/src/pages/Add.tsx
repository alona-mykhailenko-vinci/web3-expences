import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Alert,
} from '@mui/material';
import ExpenseAdd from '../components/ExpenseAdd';
import type { ExpenseInput } from '../types/Expense';

const host = import.meta.env.VITE_API_URL;

export default function Add() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      throw error;
    }
  };

  const handleAddExpense = async (newExpenseForm: ExpenseInput) => {
    try {
      setError(null);
      setSuccess(null);
      
      const addedExpense = await sendApiRequestandHandleError('POST', 'expenses', newExpenseForm);
      
      if (addedExpense) {
        setSuccess('Expense added successfully!');
        // Navigate to List page after successful addition
        setTimeout(() => {
          navigate('/list');
        }, 1500);
      }
    } catch (error) {
      // Error is already handled in sendApiRequestandHandleError
    }
  };

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
            Add New Expense
          </Typography>



          {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Add Expense Form */}
          <Box sx={{ mb: 2 }}>
            <ExpenseAdd addExpense={handleAddExpense} />
          </Box>

          {/* Navigation Options */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate('/list')}
              sx={{ textTransform: 'none' }}
            >
              View All Expenses
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}