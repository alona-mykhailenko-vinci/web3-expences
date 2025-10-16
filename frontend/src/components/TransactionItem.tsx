// components/TransactionItem.tsx
import React from 'react';
import type { Transaction } from '../types/Transaction';
import { TableCell, TableRow } from "@/components/ui/table";

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, index }) => {
  return (
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
  );
};

export default TransactionItem;