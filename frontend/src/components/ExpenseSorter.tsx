import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, type SelectChangeEvent } from '@mui/material';
import type { Expense } from '../types/Expense';

interface ExpenseSorterProps {
  setSortingAlgo: (algo: (a: Expense, b: Expense) => number) => void;
}

const ExpenseSorter: React.FC<ExpenseSorterProps> = ({ setSortingAlgo }) => {
  const [sortBy, setSortBy] = React.useState('none');

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSortBy(value);

    switch (value) {
      case 'date-asc':
        setSortingAlgo((a: Expense, b: Expense) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        setSortingAlgo((a: Expense, b: Expense) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'amount-asc':
        setSortingAlgo((a: Expense, b: Expense) => a.amount - b.amount);
        break;
      case 'amount-desc':
        setSortingAlgo((a: Expense, b: Expense) => b.amount - a.amount);
        break;
      case 'payer-asc':
        setSortingAlgo((a: Expense, b: Expense) => a.payer.localeCompare(b.payer));
        break;
      case 'payer-desc':
        setSortingAlgo((a: Expense, b: Expense) => b.payer.localeCompare(a.payer));
        break;
      case 'description-asc':
        setSortingAlgo((a: Expense, b: Expense) => a.description.localeCompare(b.description));
        break;
      case 'description-desc':
        setSortingAlgo((a: Expense, b: Expense) => b.description.localeCompare(a.description));
        break;
      default:
        setSortingAlgo(() => 0);
        break;
    }
  };

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel id="sort-select-label">Sort by</InputLabel>
      <Select
        labelId="sort-select-label"
        value={sortBy}
        label="Sort by"
        onChange={handleSortChange}
        sx={{
          borderRadius: 2,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'divider',
          },
        }}
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="date-desc">Date (Newest)</MenuItem>
        <MenuItem value="date-asc">Date (Oldest)</MenuItem>
        <MenuItem value="amount-desc">Amount (High to Low)</MenuItem>
        <MenuItem value="amount-asc">Amount (Low to High)</MenuItem>
        <MenuItem value="payer-asc">Payer (A-Z)</MenuItem>
        <MenuItem value="payer-desc">Payer (Z-A)</MenuItem>
        <MenuItem value="description-asc">Description (A-Z)</MenuItem>
        <MenuItem value="description-desc">Description (Z-A)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ExpenseSorter;