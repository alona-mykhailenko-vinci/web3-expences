// components/ExpenseItem.tsx
import React from 'react';
import type { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
  index: number; // kept to match your existing map signature (unused now)
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-200">
      <td className="px-6 py-4 text-left text-sm text-gray-500 font-medium">
        {expense.date}
      </td>
      <td className="px-6 py-4 text-left">
        <div className="text-base font-semibold text-gray-900" title={expense.description}>
          {expense.description}
        </div>
      </td>
      <td className="px-6 py-4 text-left text-sm text-gray-600">
        {expense.payer.name}
      </td>
      <td className="px-6 py-4 text-right text-base font-bold text-gray-900">
        ${expense.amount.toFixed(2)}
      </td>
    </tr>
  );
};

export default ExpenseItem;
