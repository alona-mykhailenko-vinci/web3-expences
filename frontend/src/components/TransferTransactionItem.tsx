import { CalendarDays, ArrowRight, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/types/Transaction';

interface TransferTransactionItemProps {
  transaction: Transaction;
}

export default function TransferTransactionItem({ transaction }: TransferTransactionItemProps) {
  const formattedDate = new Date(transaction.date).toLocaleDateString();
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-purple-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Transfer
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {formattedDate}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                <span className="font-semibold text-primary">{transaction.payer.name}</span>{' '}
                transferred{' '}
                <span className="font-bold text-purple-600">${Math.abs(transaction.amount).toFixed(2)}</span>{' '}
                to{' '}
                <span className="font-semibold text-primary">
                  {transaction.participants.map((p) => p.name).join(', ')}
                </span>
              </p>
              
              {transaction.description && (
                <p className="text-muted-foreground">
                  <span className="font-medium">Description:</span> {transaction.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-red-50 text-red-700 rounded font-medium">
                From: {transaction.payer.name}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded font-medium">
                To: {transaction.participants.map((p) => p.name).join(', ')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-lg font-bold text-purple-600">
            <DollarSign className="h-5 w-5" />
            {Math.abs(transaction.amount).toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}