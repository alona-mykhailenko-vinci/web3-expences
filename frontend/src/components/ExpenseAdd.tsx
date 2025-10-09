import { useForm } from 'react-hook-form';
import type { ExpenseInput } from '../types/Expense';

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

interface FormData {
  description: string;
  payer: string;
  amount: string; // Will be converted to number in onSubmit
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = ({ description, payer, amount }: FormData) => {
    addExpense({
      description,
      payer,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border border-gray-300 rounded-lg px-4 py-4 bg-white transition-all duration-200 hover:border-gray-900 hover:-translate-y-0.5 mb-4"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add New Expense
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter expense description"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              errors.description ? 'border-red-400' : 'border-gray-300'
            }`}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="payer" className="block text-sm font-medium text-gray-700 mb-1">
            Payer
          </label>
          <select
            id="payer"
            defaultValue="Alice"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              errors.payer ? 'border-red-400' : 'border-gray-300'
            }`}
            {...register('payer', { required: 'Payer is required' })}
          >
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
          {errors.payer && (
            <p className="text-red-500 text-xs mt-1">{errors.payer.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              errors.amount ? 'border-red-400' : 'border-gray-300'
            }`}
            {...register('amount', { 
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' }
            })}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}