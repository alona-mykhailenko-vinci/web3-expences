import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { Package } from 'lucide-react';
import ExpenseTransactionItem from '@/components/ExpenseTransactionItem';
import TransferTransactionItem from '@/components/TransferTransactionItem';
import type { LoaderData } from './loader';

export default function Transactions() {
  const { transactions } = useLoaderData<LoaderData>();
  const [filter, setFilter] = useState<'all' | 'expense' | 'transfer'>('all');

  // Filter transactions based on selected filter
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.kind === filter);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-4">
          <Package className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h2 className="text-2xl font-semibold text-foreground">No Transactions Found</h2>
            <p className="text-muted-foreground mt-2">
              It looks like there are no transactions to display yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">All Transactions</h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground">
            View all your expenses and transfers in one place
          </p>
        </div>

        {/* Transaction Counter and Filter */}
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">
              {filter === 'all' ? 'All Transactions' : filter === 'expense' ? 'Expenses' : 'Transfers'} ({filteredTransactions.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({transactions.length})
              </button>
              <button
                onClick={() => setFilter('expense')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === 'expense' 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Expenses ({transactions.filter(tx => tx.kind === 'expense').length})
              </button>
              <button
                onClick={() => setFilter('transfer')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  filter === 'transfer' 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Transfers ({transactions.filter(tx => tx.kind === 'transfer').length})
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <section>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">
                No {filter === 'expense' ? 'expenses' : filter === 'transfer' ? 'transfers' : 'transactions'} found
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try selecting a different filter
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredTransactions.map((tx) => (
                <li key={tx.id}>
                  {tx.kind === 'expense' ? (
                    <ExpenseTransactionItem transaction={tx} />
                  ) : (
                    <TransferTransactionItem transaction={tx} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}