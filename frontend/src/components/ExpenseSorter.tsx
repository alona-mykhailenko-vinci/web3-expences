import React from 'react';
import type { Expense } from '../types/Expense';

interface ExpenseSorterProps {
  setSortingAlgo: (algo: (a: Expense, b: Expense) => number) => void;
}

const ExpenseSorter: React.FC<ExpenseSorterProps> = ({ setSortingAlgo }) => {
  const [sortBy, setSortBy] = React.useState('none');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="min-w-40">
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="none">Sort by</option>
        <option value="date-desc">Date (Newest)</option>
        <option value="date-asc">Date (Oldest)</option>
        <option value="amount-desc">Amount (High to Low)</option>
        <option value="amount-asc">Amount (Low to High)</option>
        <option value="payer-asc">Payer (A-Z)</option>
        <option value="payer-desc">Payer (Z-A)</option>
        <option value="description-asc">Description (A-Z)</option>
        <option value="description-desc">Description (Z-A)</option>
      </select>
    </div>
  );
};

export default ExpenseSorter;