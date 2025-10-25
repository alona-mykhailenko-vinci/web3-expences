import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import type { ExpenseInput } from '../types/Expense';
import type { User } from '../types/User';

const host = import.meta.env.VITE_API_URL;

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

interface FormData {
  description: string;
  payer: string;
  amount: string; // Will be converted to number in onSubmit
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        console.log('Fetching users from:', `${host}/api/users`);
        
        const response = await fetch(`${host}/api/users`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const serviceResponse = await response.json();
        console.log('Fetched service response:', serviceResponse);
        
        // Handle ServiceResponse format: { success, message, responseObject, statusCode }
        if (serviceResponse.success && serviceResponse.responseObject) {
          const userData = serviceResponse.responseObject;
          setUsers(Array.isArray(userData) ? userData : []);
          setUserError(null);
        } else {
          throw new Error(serviceResponse.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setUserError(`Failed to load users: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

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
      className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-8 space-y-8 border-0"
      style={{ 
        boxShadow: '0 25px 50px -12px rgba(26, 32, 55, 0.25), 0 0 0 1px rgba(26, 32, 55, 0.1)'
      }}
    >
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold" style={{ color: '#1a2037' }}>
          Add New Expense
        </h3>
        <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold mb-3" style={{ color: '#1a2037' }}>
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter expense description"
            className={`w-full px-5 py-4 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 focus:scale-105 bg-white/50 backdrop-blur-sm ${
              errors.description ? 'border-red-400 focus:border-red-500' : 'focus:shadow-lg'
            }`}
            style={{ 
              borderColor: errors.description ? '#ef4444' : '#e5e7eb',
              boxShadow: errors.description ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
            }}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="payer" className="block text-sm font-semibold mb-3" style={{ color: '#1a2037' }}>
            Payer
          </label>
          <select
            id="payer"
            defaultValue=""
            className={`w-full px-5 py-4 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 focus:scale-105 bg-white/50 backdrop-blur-sm ${
              errors.payer ? 'border-red-400' : 'focus:shadow-lg'
            }`}
            style={{ 
              borderColor: errors.payer ? '#ef4444' : '#e5e7eb'
            }}
            {...register('payer', { required: 'Payer is required' })}
          >
            <option value="" disabled>
              {loadingUsers ? 'Loading users...' : userError ? 'Error loading users' : users.length === 0 ? 'No users available' : 'Select payer'}
            </option>
            {!loadingUsers && !userError && users.length > 0 && users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.payer && (
            <p className="text-red-500 text-xs mt-1">{errors.payer.message}</p>
          )}
          {userError && (
            <p className="text-red-500 text-xs mt-1">{userError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-semibold mb-3" style={{ color: '#1a2037' }}>
            Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className={`w-full px-5 py-4 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 focus:scale-105 bg-white/50 backdrop-blur-sm ${
              errors.amount ? 'border-red-400' : 'focus:shadow-lg'
            }`}
            style={{ 
              borderColor: errors.amount ? '#ef4444' : '#e5e7eb'
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
          className="w-full font-bold text-lg py-5 px-6 rounded-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 mt-8 relative overflow-hidden"
          style={{ 
            backgroundColor: '#1a2037', 
            color: '#e4d7bc',
            boxShadow: '0 10px 25px -5px rgba(26, 32, 55, 0.3)'
          }}
        >
          <span className="relative z-10">
            Add Expense
          </span>
        </button>
      </div>
    </form>
  );
}