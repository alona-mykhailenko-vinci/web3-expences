import { useState, useEffect, useCallback } from 'react';
import type { Transaction } from '../types/Transaction';
import ApiClient from '../lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function List() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'expense' | 'transfer'>('all');

  // Fetch transactions from backend
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ApiClient.getTransactions();
      // Ensure data is an array before setting state
      setTransactions(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('API request failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Filter transactions based on the selected filter
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(transaction => transaction.kind === filter);

  // Sort transactions by date (most recent first) - they should already be sorted from backend
  const sortedTransactions = [...filteredTransactions];

  return (
    <div className="min-h-[calc(100vh-160px)] py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-60"></div>
      
      <div className="space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1a2037' }}>
            Expences List
          </h1>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
          <p className="text-lg opacity-70 mt-4" style={{ color: '#6b7280' }}>
            Track and manage all your transactions
          </p>
        </div>

        {/* Transaction Counter and Filter */}
        {!loading && !error && transactions.length > 0 && (
          <div className="flex flex-row justify-between items-center mb-8 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
            <h2 className="text-2xl font-semibold flex items-center gap-3" style={{ color: '#1a2037' }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e4d7bc' }}></span>
              Transactions ({filteredTransactions.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({transactions.length})
              </button>
              <button
                onClick={() => setFilter('expense')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === 'expense' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Expenses ({transactions.filter(t => t.kind === 'expense').length})
              </button>
              <button
                onClick={() => setFilter('transfer')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === 'transfer' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Transfers ({transactions.filter(t => t.kind === 'transfer').length})
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-row justify-center items-center gap-6 my-12 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#1a2037' }}></div>
            <p className="text-lg font-medium" style={{ color: '#1a2037' }}>Loading transactions…</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex justify-between items-center shadow-lg">
            <span className="font-medium">{error}</span>
            <button 
              onClick={fetchTransactions}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
              Retry
            </button>
          </div>
        )}

        {/* Transactions Table */}
        {!loading && !error && (
          <div className="w-full">
            {sortedTransactions.length === 0 ? (
              <div className="text-center my-16 p-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
                <p className="text-xl font-medium mb-4" style={{ color: '#1a2037' }}>
                  {filter === 'all' ? 'No transactions yet' : `No ${filter}s yet`}
                </p>
                <p className="text-lg opacity-70" style={{ color: '#6b7280' }}>
                  Add your first transaction to get started!
                </p>
              </div>
            ) : (
              <div className="overflow-hidden shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2" style={{ borderColor: '#e4d7bc' }}>
                      <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Type</TableHead>
                      <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Date</TableHead>
                      <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Description</TableHead>
                      <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Details</TableHead>
                      <TableHead className="text-right py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTransactions.map((transaction, index) => (
                      <TableRow 
                        key={transaction.id} 
                        className="hover:bg-white/80 transition-all duration-300 border-b border-gray-100"
                        style={{ 
                          backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(228, 215, 188, 0.1)'
                        }}
                      >
                        <TableCell className="text-left py-6 px-6">
                          <span 
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: transaction.kind === 'expense' ? '#10b981' : '#8b5cf6',
                              color: 'white'
                            }}
                          >
                            {transaction.kind === 'expense' ? 'Expense' : 'Transfer'}
                          </span>
                        </TableCell>
                        <TableCell className="text-left py-6 px-6 text-sm font-medium" style={{ color: '#6b7280' }}>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-left py-6 px-6">
                          <div className="text-base font-semibold" style={{ color: '#1a2037' }} title={transaction.description}>
                            {transaction.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-left py-6 px-6">
                          {transaction.kind === 'expense' ? (
                            <div>
                              <div className="text-sm font-medium" style={{ color: '#1a2037' }}>
                                Paid by: {transaction.payer.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Participants: {transaction.participants.map(p => p.name).join(', ')}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm">
                              <span style={{ color: '#dc2626' }}>From: {transaction.payer.name}</span>
                              <br />
                              <span style={{ color: '#059669' }}>To: {transaction.participants.map(p => p.name).join(', ')}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right py-6 px-6 text-lg font-bold" style={{ color: '#1a2037' }}>
                          ${transaction.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}