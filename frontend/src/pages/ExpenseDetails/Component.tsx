import { useLoaderData, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, CreditCard, Users, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LoaderData } from './loader';

export default function ExpenseDetails() {
  const { expense } = useLoaderData<LoaderData>();

  if (!expense) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl">😞</div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Expense Not Found</h2>
            <p className="text-muted-foreground mt-2">
              The expense you're looking for doesn't exist or couldn't be loaded.
            </p>
          </div>
          <Link 
            to="/expenses" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Expenses
          </Link>
        </div>
      </div>
    );
  }

  const participants = expense.participants || [];
  const sharePerParticipant = participants.length > 0 ? expense.amount / participants.length : expense.amount;
  const formattedDate = new Date(expense.date).toLocaleDateString();

  return (
    <div className="min-h-[calc(100vh-200px)] py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Link 
            to="/expenses" 
            className="inline-flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Expenses
          </Link>
        </div>

        {/* Expense Overview */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Expense
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formattedDate}
                  </div>
                </div>
                <CardTitle className="text-2xl">{expense.description}</CardTitle>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-3xl font-bold text-green-600">
                  <DollarSign className="h-8 w-8" />
                  {expense.amount.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Payer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Payer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <User className="h-4 w-4" />
                  Name
                </div>
                <p className="text-lg font-semibold">{expense.payer.name}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
                <p className="text-lg">{expense.payer.email}</p>
              </div>
              
              {expense.payer.bankAccount && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Bank Account
                  </div>
                  <p className="text-lg font-mono">{expense.payer.bankAccount}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Participants Information */}
        {participants.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participants ({participants.length})
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Each participant owes ${sharePerParticipant.toFixed(2)}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {participants.map((participant) => (
                  <Card key={participant.id} className="border-2">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <User className="h-4 w-4" />
                              Name
                            </div>
                            <p className="font-semibold">{participant.name}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              Email
                            </div>
                            <p className="text-sm">{participant.email}</p>
                          </div>
                          
                          {participant.bankAccount && (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <CreditCard className="h-4 w-4" />
                                Bank Account
                              </div>
                              <p className="text-sm font-mono">{participant.bankAccount}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-lg font-bold text-primary">
                            <DollarSign className="h-4 w-4" />
                            {sharePerParticipant.toFixed(2)}
                          </div>
                          <p className="text-xs text-muted-foreground">Share</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">${expense.amount.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{participants.length || 1}</div>
                <p className="text-sm text-muted-foreground">Participants</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">${sharePerParticipant.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Per Person</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}