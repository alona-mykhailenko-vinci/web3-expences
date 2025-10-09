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
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm px-6 py-6 space-y-6"
      style={{ borderColor: '#1a2037', border: '1px solid' }}
    >
      <h3 className="text-xl font-bold text-center mb-6" style={{ color: '#1a2037' }}>
        Add New Expense
      </h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: '#1a2037' }}>
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter expense description"
            className={`w-full px-4 py-3 border rounded-lg text-base focus:outline-none transition-colors ${
              errors.description ? 'border-red-400' : ''
            }`}
            style={{ 
              borderColor: errors.description ? '#ef4444' : '#1a2037'
            }}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="payer" className="block text-sm font-semibold mb-2" style={{ color: '#1a2037' }}>
            Payer
          </label>
          <select
            id="payer"
            defaultValue="Alice"
            className={`w-full px-4 py-3 border rounded-lg text-base focus:outline-none transition-colors bg-white ${
              errors.payer ? 'border-red-400' : ''
            }`}
            style={{ 
              borderColor: errors.payer ? '#ef4444' : '#1a2037'
            }}
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
          <label htmlFor="amount" className="block text-sm font-semibold mb-2" style={{ color: '#1a2037' }}>
            Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className={`w-full px-4 py-3 border rounded-lg text-base focus:outline-none transition-colors ${
              errors.amount ? 'border-red-400' : ''
            }`}
            style={{ 
              borderColor: errors.amount ? '#ef4444' : '#1a2037'
            }}
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
          className="w-full font-bold text-lg py-4 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 mt-6"
          style={{ backgroundColor: '#1a2037', color: '#e4d7bc' }}
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}