import { Link } from 'react-router-dom';
import { CalendarDays, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/types/Transaction';

interface ExpenseTransactionItemProps {
  transaction: Transaction;
}

export default function ExpenseTransactionItem({ transaction }: ExpenseTransactionItemProps) {
  // Extract the expense ID from the transaction ID (format: "expense-{id}")
  const expenseId = transaction.id.replace('expense-', '');
  const formattedDate = new Date(transaction.date).toLocaleDateString();
  const participantCount = transaction.participants.length;
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-green-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Expense
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {formattedDate}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                <span className="font-semibold" style={{ color: '#1a2037' }}>{transaction.payer.name}</span> paid{' '}
                <span className="font-bold text-green-600">${Math.abs(transaction.amount).toFixed(2)}</span>{' '}
                for <span className="font-semibold" style={{ color: '#1a2037' }}>{participantCount} people</span>
              </p>
              
              <p className="text-muted-foreground">
                <span className="font-medium" style={{ color: '#4a5568' }}>Description:</span> {transaction.description}
              </p>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Participants: {transaction.participants.map((p) => p.name).join(', ')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-1 text-lg font-bold text-green-600">
              <DollarSign className="h-5 w-5" />
              {Math.abs(transaction.amount).toFixed(2)}
            </div>
            
            <Link 
              to={`/expenses/${expenseId}`}
              className="px-4 py-2 rounded-md hover:opacity-90 transition-colors text-sm font-medium"
              style={{ backgroundColor: '#1a2037', color: '#e4d7bc' }}
            >
              View Details
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}