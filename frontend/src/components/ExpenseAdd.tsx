import React from 'react';
import { Button } from '@mui/material';
import type { Expense } from '../types/Expense';

interface ExpenseAddProps {
  handleAdd: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseAdd: React.FC<ExpenseAddProps> = ({ handleAdd }) => {
  const onAdd = () => {
    // Generate random payer between Alice, Bob, and Charlie
    const payers = ['Alice', 'Bob', 'Charlie'];
    const randomPayer = payers[Math.floor(Math.random() * payers.length)];
    
    // Generate random amount between 5 and 200 with max 2 decimal places
    const randomAmount = Math.round((Math.random() * 195 + 5) * 100) / 100;
    
    // Generate current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Generate random expense descriptions
    const descriptions = [
      'Random grocery shopping',
      'Coffee and pastries',
      'Gas station fill-up',
      'Restaurant dinner',
      'Movie theater tickets',
      'Online shopping',
      'Pharmacy supplies',
      'Book store purchase',
      'Hardware store items',
      'Food delivery order'
    ];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Create new expense (without id - backend will generate it)
    const newExpense: Omit<Expense, 'id'> = {
      date: currentDate,
      description: randomDescription,
      payer: randomPayer,
      amount: randomAmount
    };
    
    // Call the parent's handleAdd function
    handleAdd(newExpense);
  };

  return (
    <Button 
      variant="contained"
      color="primary"
      onClick={onAdd}
      sx={{
        px: 3,
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 1.5,
        boxShadow: 1,
        '&:hover': {
          boxShadow: 2,
          transform: 'translateY(-1px)',
        },
        transition: 'all 0.2s ease',
      }}
    >
      Add
    </Button>
  );
};

export default ExpenseAdd;
