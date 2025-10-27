import { useLoaderData, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { gql } from '@apollo/client';
import graphqlClient from '@/lib/graphql-client';
import { useCurrentUser } from '@/pages/Layout';


import {  EuroIcon, Calendar, ArrowLeft, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@radix-ui/react-label';

import type { LoaderData } from './loader';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';




const CREATE_EXPENSE_GQL = gql`
  mutation CreateExpense(
      $description: String!, 
      $amount: Float!, 
      $date: String!, 
      $payerId: Int!, 
      $participantIds: [Int!]!) {
    createExpense(
      description: $description, 
      amount: $amount, 
      date: $date, 
      payerId: $payerId, 
      participantIds: $participantIds) {
      id
      description
    }
  }
`;

const expenseSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  payerId: z.string().min(1, 'Payer is required'),
  amount: z.coerce.number<number>().min(0.01, 'Amount must be greater than 0'),
  date: z.string().optional(),
  participantIds: z.array(z.string()).min(1, 'At least one participant is required'),
});
type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpenseForm() {
  const currentUser = useCurrentUser();
  const { users } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: '',
      payerId: currentUser?.id.toString() || '',
      amount: undefined,
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      participantIds: [],
    },
  });

  // Watch form values
  const watchedParticipantIds = form.watch('participantIds');

  // Handle participant toggle
  const handleParticipantToggle = (userId: number) => {
    const currentParticipants = form.getValues('participantIds');
    const userIdString = userId.toString();
    
    if (currentParticipants.includes(userIdString)) {
      // Remove if already selected, but only if not the last participant
      if (currentParticipants.length > 1) {
        form.setValue('participantIds', currentParticipants.filter(id => id !== userIdString));
      }
    } else {
      // Add if not selected
      form.setValue('participantIds', [...currentParticipants, userIdString]);
    }
  };

const onSubmit = async (data: ExpenseFormData) => {
    if (!data.payerId) {
      toast.error('Please select who paid for this expense');
      return;
    }

    try {
      await graphqlClient.mutate({
        mutation: CREATE_EXPENSE_GQL,
        variables: {
          description: data.description,
          amount: data.amount,
          date: data.date,
          payerId: Number(data.payerId),
          participantIds: data.participantIds.map(id => Number(id)),
        },
      });
      toast('Expense has been created.');
      return navigate('/expenses');
    } catch (error) {
      console.error('Expense creation failed:', error);
      form.setError('root', {
        type: 'custom',
        message: 'Could not create new expense',
      });
    }
  };


  return (
    <div className="min-h-[calc(100vh-200px)] py-8 relative overflow-hidden">
      {/* Background gradient matching welcome page */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-60"></div>
      
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/expenses')}
            className="flex items-center gap-2 shadow-sm"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(4px)',
              color: '#1a2037'
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Expenses
          </Button>
        </div>

        {/* Expense Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <CardTitle className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight"
                  style={{ 
                    color: '#1a2037',
                    background: 'linear-gradient(135deg, #1a2037 0%, #2d3748 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                  <Plus className="h-8 w-8" style={{ color: '#1a2037' }} />
                  New Expense
                </CardTitle>
                <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
              </div>
              <p className="text-lg font-medium" style={{ color: '#4a5568' }}>
                Create a new expense and split it among participants
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Root Error Display */}
                {form.formState.errors.root && (
                  <div className="border border-red-200 rounded-lg p-4 shadow-sm bg-red-50/80 backdrop-blur-sm">
                    <p className="text-red-700 text-sm font-medium">
                      {form.formState.errors.root.message}
                    </p>
                  </div>
                )}

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold" style={{ color: '#1a2037' }}>
                        Description
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#6b7280' }} />
                          <Input
                            placeholder="Enter expense description"
                            className="pl-10 h-12 border-2 shadow-sm text-lg"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              backdropFilter: 'blur(4px)',
                              borderColor: '#e5e7eb',
                              color: '#1a2037'
                            }}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold" style={{ color: '#1a2037' }}>
                        Amount
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <EuroIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#6b7280' }} />
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Enter amount"
                            className="pl-10 h-12 border-2 shadow-sm text-lg"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              backdropFilter: 'blur(4px)',
                              borderColor: '#e5e7eb',
                              color: '#1a2037'
                            }}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold" style={{ color: '#1a2037' }}>
                        Date
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#6b7280' }} />
                          <Input
                            type="date"
                            className="pl-10 h-12 border-2 shadow-sm text-lg"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              backdropFilter: 'blur(4px)',
                              borderColor: '#e5e7eb',
                              color: '#1a2037'
                            }}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payer */}
                <FormField
                  control={form.control}
                  name="payerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold" style={{ color: '#1a2037' }}>
                        Who Paid?
                      </FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full h-12 px-3 border-2 rounded-md shadow-sm text-lg"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderColor: '#e5e7eb',
                            color: '#1a2037'
                          }}
                        >
                          <option value="">Select who paid</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id.toString()}>
                              {user.name} ({user.email})
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Participants */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold" style={{ color: '#1a2037' }}>
                    Participants
                  </Label>
                  <p className="text-sm" style={{ color: '#6b7280' }}>
                    Select who should share this expense
                  </p>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border rounded-md p-3"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      borderColor: '#e5e7eb'
                    }}
                  >
                    {users.map((user) => {
                      const isSelected = watchedParticipantIds?.includes(user.id.toString()) || false;
                      const isOnlyParticipant = watchedParticipantIds?.length === 1 && isSelected;
                      
                      return (
                        <div key={user.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`participant-${user.id}`}
                            checked={isSelected}
                            onChange={() => handleParticipantToggle(user.id)}
                            disabled={isOnlyParticipant}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label 
                            htmlFor={`participant-${user.id}`}
                            className={`flex-1 text-sm ${isOnlyParticipant ? '' : 'cursor-pointer'}`}
                            style={{ color: isOnlyParticipant ? '#6b7280' : '#1a2037' }}
                          >
                            {user.name} ({user.email})
                            {isOnlyParticipant && (
                              <span className="text-xs ml-2" style={{ color: '#6b7280' }}>
                                (at least one participant required)
                              </span>
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  {form.formState.errors.participantIds && (
                    <p className="text-red-600 text-sm">{form.formState.errors.participantIds.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-16 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: '#1a2037', color: '#e4d7bc' }}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3" />
                      Creating Expense...
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-3" />
                      Create Expense
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
