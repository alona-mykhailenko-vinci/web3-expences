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
      amount: undefined,
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

        {/* Transfer Form */}
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
                  <Users className="h-8 w-8" style={{ color: '#1a2037' }} />
                  New Transfer
                </CardTitle>
                <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
              </div>
              <p className="text-lg font-medium" style={{ color: '#4a5568' }}>
                Send money to another user
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

              {/* Source User */}
              <div className="space-y-2">
                <Label htmlFor="sourceId" className="text-base font-semibold" style={{ color: '#1a2037' }}>
                  From (Source)
                </Label>
                <Select
                  value={watchedSourceId?.toString() || ''}
                  onValueChange={(value) => setValue('sourceId', parseInt(value, 10))}
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
                      placeholder="Select source user" 
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
                {errors.sourceId && (
                  <p className="text-red-600 text-sm">{errors.sourceId.message}</p>
                )}
              </div>

              {/* Target User */}
              <div className="space-y-2">
                <Label htmlFor="targetId" className="text-base font-semibold" style={{ color: '#1a2037' }}>
                  To (Target)
                </Label>
                <Select
                  value={watchedTargetId?.toString() || ''}
                  onValueChange={(value) => setValue('targetId', parseInt(value, 10))}
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
                      placeholder="Select target user" 
                      style={{ color: '#6b7280' }} 
                    />
                  </SelectTrigger>
                  <SelectContent 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {targetUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.targetId && (
                  <p className="text-red-600 text-sm">{errors.targetId.message}</p>
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
                    className="pl-10 h-12 border-2 bg-white/90 backdrop-blur-sm shadow-sm text-lg"
                    style={{ borderColor: '#e5e7eb' }}
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

              {/* Transfer Summary */}
              {watchedSourceId > 0 && watchedTargetId > 0 && watchedSourceId !== watchedTargetId && (
                <Card className="bg-white/60 backdrop-blur-sm border-2 shadow-md" style={{ borderColor: '#e4d7bc' }}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4" style={{ color: '#1a2037' }}>Transfer Summary</h3>
                    <div className="space-y-3 text-base">
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>From:</span>{' '}
                        <span style={{ color: '#4a5568' }}>
                          {users.find(u => u.id === watchedSourceId)?.name}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>To:</span>{' '}
                        <span style={{ color: '#4a5568' }}>
                          {users.find(u => u.id === watchedTargetId)?.name}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold" style={{ color: '#1a2037' }}>Amount:</span>{' '}
                        <span className="text-xl font-bold" style={{ color: '#1a2037' }}>
                          ${watch('amount')?.toFixed(2) || '0.00'}
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
                    Creating Transfer...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-3" />
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