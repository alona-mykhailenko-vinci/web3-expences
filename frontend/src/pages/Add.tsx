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
    <div className="min-h-[calc(100vh-160px)] py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-60"></div>
      
      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1a2037' }}>
            Add New Expense
          </h1>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
          <p className="text-lg opacity-70 mt-4" style={{ color: '#6b7280' }}>
            Track your spending with ease
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="px-4 py-3 rounded-lg mb-6" style={{ backgroundColor: '#e4d7bc', borderColor: '#1a2037', color: '#1a2037', border: '1px solid' }}>
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            Error: {error}
          </div>
        )}

        {/* Add Expense Form */}
        <div className="mb-8">
          <ExpenseAdd addExpense={handleAddExpense} />
        </div>

        {/* Navigation Options */}
        <div className="flex flex-row justify-center items-center mt-12">
            <button
              onClick={() => navigate('/list')}
              className="font-bold text-lg py-4 px-8 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{ 
                backgroundColor: '#1a2037', 
                color: '#e4d7bc',
                boxShadow: '0 10px 25px -5px rgba(26, 32, 55, 0.2)'
              }}
            >
              View All Expenses
            </button>
          </div>
      </div>
    </div>
  );
}