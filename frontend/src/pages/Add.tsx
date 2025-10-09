import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-[calc(100vh-80px)] grid place-items-center px-2 py-6 bg-white">
      <div className="max-w-sm px-0 sm:px-2">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
            Add New Expense
          </h1>

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Add Expense Form */}
          <div className="mb-4">
            <ExpenseAdd addExpense={handleAddExpense} />
          </div>

          {/* Navigation Options */}
          <div className="flex flex-row justify-center items-center mt-8">
            <button
              onClick={() => navigate('/list')}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded transition-colors duration-200"
            >
              View All Expenses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}