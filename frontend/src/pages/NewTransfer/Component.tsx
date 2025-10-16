import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { ArrowLeft, Send, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ApiClient from '../../lib/api';
import { useCurrentUser } from '../Layout/hooks';
import type { LoaderData } from './loader';
import type { NewTransferPayload } from '../../types/Transfer';

interface TransferFormData {
  amount: number;
  sourceId: number;
  targetId: number;
}

export default function NewTransfer() {
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
  } = useForm<TransferFormData>({
    defaultValues: {
      sourceId: currentUser?.id || 0,
      targetId: 0,
      amount: 0,
    }
  });

  const watchedSourceId = watch('sourceId');
  const watchedTargetId = watch('targetId');

  // Filter target users to exclude the source user
  const targetUsers = users.filter(user => user.id !== watchedSourceId);

  const onSubmit = async (data: TransferFormData) => {
    try {
      clearErrors('root');
      
      if (data.sourceId === data.targetId) {
        setError('root', { 
          message: 'Source and target users cannot be the same' 
        });
        return;
      }

      if (data.amount <= 0) {
        setError('root', { 
          message: 'Amount must be greater than 0' 
        });
        return;
      }

      const payload: NewTransferPayload = {
        amount: data.amount,
        sourceId: data.sourceId,
        targetId: data.targetId,
      };

      await ApiClient.createTransfer(payload);
      
      // Navigate to transactions page on success
      navigate('/transactions');
    } catch (error) {
      console.error('Failed to create transfer:', error);
      setError('root', { 
        message: error instanceof Error ? error.message : 'Failed to create transfer' 
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/transactions')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Transactions
          </Button>
        </div>

        {/* Transfer Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6" />
              New Transfer
            </CardTitle>
            <p className="text-muted-foreground">
              Send money to another user
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Root Error Display */}
              {errors.root && (
                <div className="bg-destructive/15 border border-destructive/20 rounded-md p-4">
                  <p className="text-destructive text-sm font-medium">
                    {errors.root.message}
                  </p>
                </div>
              )}

              {/* Source User */}
              <div className="space-y-2">
                <Label htmlFor="sourceId">From (Source)</Label>
                <Select
                  value={watchedSourceId?.toString() || ''}
                  onValueChange={(value) => setValue('sourceId', parseInt(value, 10))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sourceId && (
                  <p className="text-destructive text-sm">{errors.sourceId.message}</p>
                )}
              </div>

              {/* Target User */}
              <div className="space-y-2">
                <Label htmlFor="targetId">To (Target)</Label>
                <Select
                  value={watchedTargetId?.toString() || ''}
                  onValueChange={(value) => setValue('targetId', parseInt(value, 10))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target user" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.targetId && (
                  <p className="text-destructive text-sm">{errors.targetId.message}</p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    className="pl-10"
                    {...register('amount', {
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be greater than 0' },
                      valueAsNumber: true,
                    })}
                  />
                </div>
                {errors.amount && (
                  <p className="text-destructive text-sm">{errors.amount.message}</p>
                )}
              </div>

              {/* Transfer Summary */}
              {watchedSourceId && watchedTargetId && watchedSourceId !== watchedTargetId && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Transfer Summary</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">From:</span>{' '}
                        {users.find(u => u.id === watchedSourceId)?.name}
                      </p>
                      <p>
                        <span className="font-medium">To:</span>{' '}
                        {users.find(u => u.id === watchedTargetId)?.name}
                      </p>
                      <p>
                        <span className="font-medium">Amount:</span>{' '}
                        ${watch('amount')?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || navigation.state === 'submitting'}
              >
                {isSubmitting || navigation.state === 'submitting' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating Transfer...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Transfer
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