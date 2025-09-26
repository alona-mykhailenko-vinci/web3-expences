// components/ExpenseItem.tsx
import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import type { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
  index: number; // kept to match your existing map signature (unused now)
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <Box
      component="article"
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        px: 2,
        py: 1.5,
        bgcolor: 'background.paper',
        transition: 'border-color .2s ease, transform .2s ease',
        '&:hover': {
          borderColor: 'text.primary',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ letterSpacing: 0.2 }}
          >
            {expense.date}
          </Typography>

          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mt: 0.5,
              mb: 0.25,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={expense.description}
          >
            {expense.description}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Paid by {expense.payer}
          </Typography>
        </Box>

        <Chip
          label={`$${expense.amount.toFixed(2)}`}
          variant="outlined"
          sx={{
            fontWeight: 700,
            '& .MuiChip-label': { px: 1.5 },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ExpenseItem;
