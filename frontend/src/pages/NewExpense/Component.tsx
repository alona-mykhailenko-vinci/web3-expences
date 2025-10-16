import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { ArrowLeft, Plus, Users, DollarSign, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ApiClient from '../../lib/api';
import { useCurrentUser } from '../Layout/hooks';
import type { LoaderData } from './loader';

interface ExpenseFormData {
  description: string;
  amount: number;
  payerId: number;
  participantIds: number[];
}

export default function NewExpense() {
  const { users } = useLoaderData<LoaderData>();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const navigation = useNavigation();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<ExpenseFormData>({
    defaultValues: {
      payerId: currentUser?.id || 0,
      participantIds: currentUser ? [currentUser.id] : [],
      description: '',
      amount: 0,
    }
  });

  const watchedPayerId = watch('payerId');
  const watchedParticipantIds = watch('participantIds');
  const watchedDescription = watch('description');
  const watchedAmount = watch('amount');

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      clearErrors('root');
      
      if (!data.description.trim()) {
        setError('root', { 
          message: 'Description is required' 
        });
        return;
      }

      if (data.amount <= 0) {
        setError('root', { 
          message: 'Amount must be greater than 0' 
        });
        return;
      }

      if (!data.payerId) {
        setError('root', { 
          message: 'Please select a payer' 
        });
        return;
      }

      if (!data.participantIds || data.participantIds.length === 0) {
        setError('root', { 
          message: 'Please select at least one participant' 
        });
        return;
      }

      const payload = {
        description: data.description.trim(),
        amount: data.amount,
        payerId: data.payerId,
        participantIds: data.participantIds,
      };

      await ApiClient.createExpense(payload);
      
      // Navigate to transactions page on success
      navigate('/transactions');
    } catch (error) {
      console.error('Failed to create expense:', error);
      setError('root', { 
        message: error instanceof Error ? error.message : 'Failed to create expense' 
      });
    }
  };

  const handleParticipantToggle = (userId: number) => {
    const currentParticipants = watchedParticipantIds || [];
    const isSelected = currentParticipants.includes(userId);
    
    if (isSelected) {
      // Remove participant (but don't allow removing all participants)
      if (currentParticipants.length > 1) {
        setValue('participantIds', currentParticipants.filter(id => id !== userId));
      }
    } else {
      // Add participant
      setValue('participantIds', [...currentParticipants, userId]);
    }
  };

  const selectedParticipants = users.filter(user => 
    watchedParticipantIds?.includes(user.id)
  );

  const sharePerParticipant = selectedParticipants.length > 0 
    ? watchedAmount / selectedParticipants.length 
    : 0;

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 relative overflow-hidden">
      {/* Background gradient matching welcome page */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-60"></div>
      
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/transactions')}
            className="flex items-center gap-2 shadow-sm"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(4px)',
              color: '#1a2037'
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Transactions
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Root Error Display */}
              {errors.root && (
                <div className="border border-red-200 rounded-lg p-4 shadow-sm bg-red-50/80 backdrop-blur-sm">
                  <p className="text-red-700 text-sm font-medium">
                    {errors.root.message}
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold" style={{ color: '#1a2037' }}>
                  Description
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#6b7280' }} />
                  <Input
                    id="description"
                    type="text"
                    placeholder="Enter expense description"
                    className="pl-10 h-12 border-2 shadow-sm text-lg"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      borderColor: '#e5e7eb',
                      color: '#1a2037'
                    }}
                    {...register('description', {
                      required: 'Description is required',
                      minLength: { value: 1, message: 'Description cannot be empty' }
                    })}
                  />
                </div>
                {errors.description && (
                  <p className="text-red-600 text-sm">{errors.description.message}</p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-base font-semibold" style={{ color: '#1a2037' }}>
                  Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#6b7280' }} />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    className="pl-10 h-12 border-2 shadow-sm text-lg"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      borderColor: '#e5e7eb',
                      color: '#1a2037'
                    }}
                    {...register('amount', {
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be greater than 0' },
                      valueAsNumber: true,
                    })}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-600 text-sm">{errors.amount.message}</p>
                )}
              </div>

              {/* Payer */}
              <div className="space-y-2">
                <Label htmlFor="payerId" className="text-base font-semibold" style={{ color: '#1a2037' }}>
                  Payer
                </Label>
                <Select
                  value={watchedPayerId?.toString() || ''}
                  onValueChange={(value) => setValue('payerId', parseInt(value, 10))}
                >
                  <SelectTrigger 
                    className="h-12 border-2 shadow-sm"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      borderColor: '#e5e7eb',
                      color: '#1a2037'
                    }}
                  >
                    <SelectValue 
                      placeholder="Select who paid for this expense" 
                      style={{ color: '#6b7280' }} 
                    />
                  </SelectTrigger>
                  <SelectContent 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.payerId && (
                  <p className="text-red-600 text-sm">{errors.payerId.message}</p>
                )}
              </div>

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
                    const isSelected = watchedParticipantIds?.includes(user.id) || false;
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
              </div>

              {/* Expense Summary */}
              {watchedDescription && watchedAmount > 0 && selectedParticipants.length > 0 && (
                <Card className="bg-white/60 backdrop-blur-sm border-2 shadow-md" style={{ borderColor: '#e4d7bc' }}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: '#1a2037' }}>
                      <Users className="h-5 w-5" />
                      Expense Summary
                    </h3>
                    <div className="space-y-3 text-base">
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>Description:</span>{' '}
                        <span style={{ color: '#4a5568' }}>{watchedDescription}</span>
                      </p>
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>Payer:</span>{' '}
                        <span style={{ color: '#4a5568' }}>
                          {users.find(u => u.id === watchedPayerId)?.name || 'Not selected'}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>Total Amount:</span>{' '}
                        <span className="text-xl font-bold" style={{ color: '#1a2037' }}>
                          ${watchedAmount?.toFixed(2) || '0.00'}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>Participants:</span>{' '}
                        <span style={{ color: '#4a5568' }}>
                          {selectedParticipants.map(p => p.name).join(', ')} ({selectedParticipants.length} people)
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>Per Person:</span>{' '}
                        <span className="text-lg font-bold" style={{ color: '#1a2037' }}>
                          ${sharePerParticipant.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: '#1a2037', color: '#e4d7bc' }}
                disabled={isSubmitting || navigation.state === 'submitting'}
              >
                {isSubmitting || navigation.state === 'submitting' ? (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}