import { useLoaderData } from 'react-router-dom';
import { Package } from 'lucide-react';
import ExpenseTransactionItem from '@/components/ExpenseTransactionItem';
import TransferTransactionItem from '@/components/TransferTransactionItem';
import type { LoaderData } from './loader';

export default function Transactions() {
  const { transactions } = useLoaderData<LoaderData>();

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

        {/* Transaction Counter */}
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Transactions ({transactions.length})
            </h2>
            <div className="flex gap-2 text-sm">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                Expenses: {transactions.filter(tx => tx.kind === 'expense').length}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                Transfers: {transactions.filter(tx => tx.kind === 'transfer').length}
              </span>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <section>
          <ul className="space-y-4">
            {transactions.map((tx) => (
              <li key={tx.id}>
                {tx.kind === 'expense' ? (
                  <ExpenseTransactionItem transaction={tx} />
                ) : (
                  <TransferTransactionItem transaction={tx} />
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}