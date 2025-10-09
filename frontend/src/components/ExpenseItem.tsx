// components/ExpenseItem.tsx
import React from 'react';
import type { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
  index: number; // kept to match your existing map signature (unused now)
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense }) => {
  return (
    <article className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white transition-all duration-200 hover:border-gray-900 hover:-translate-y-0.5">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500 tracking-wide uppercase">
            {expense.date}
          </p>

          <h3 
            className="text-lg font-semibold text-gray-900 mt-1 mb-1 whitespace-nowrap overflow-hidden text-ellipsis"
            title={expense.description}
          >
            {expense.description}
          </h3>

          <p className="text-sm text-gray-600">
            Paid by {expense.payer}
          </p>
        </div>

        <div className="border border-gray-300 rounded-full px-4 py-1 bg-gray-50">
          <span className="font-bold text-gray-900">
            ${expense.amount.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ExpenseItem;
