import { useForm } from 'react-hook-form';
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Stack,
  Typography
} from '@mui/material';
import type { ExpenseInput } from '../types/Expense';

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

interface FormData {
  description: string;
  payer: string;
  amount: string;
}

export default function ExpenseAdd({ addExpense }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      description: '',
      payer: 'Alice',
      amount: ''
    }
  });

  const onSubmit = ({ description, payer, amount }: FormData) => {
    addExpense({
      description,
      payer,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    });
    reset(); // Reset form after submission
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        px: 2,
        py: 2,
        bgcolor: 'background.paper',
        transition: 'border-color .2s ease, transform .2s ease',
        '&:hover': {
          borderColor: 'text.primary',
          transform: 'translateY(-1px)',
        },
        mb: 2
      }}
    >
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 2,
        }}
      >
        Add New Expense
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          size="small"
          label="Description"
          placeholder="Enter expense description"
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description', { required: 'Description is required' })}
        />

        <FormControl fullWidth size="small" error={!!errors.payer}>
          <InputLabel id="payer-select-label">Payer</InputLabel>
          <Select
            labelId="payer-select-label"
            label="Payer"
            defaultValue="Alice"
            {...register('payer', { required: 'Payer is required' })}
          >
            <MenuItem value="Alice">Alice</MenuItem>
            <MenuItem value="Bob">Bob</MenuItem>
          </Select>
          {errors.payer && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {errors.payer.message}
            </Typography>
          )}
        </FormControl>

        <TextField
          fullWidth
          size="small"
          type="number"
          label="Amount"
          placeholder="0.00"
          error={!!errors.amount}
          helperText={errors.amount?.message}
          inputProps={{
            step: "0.01",
            min: "0"
          }}
          {...register('amount', { 
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' }
          })}
        />

        <Button 
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 2.5,
            fontWeight: 600
          }}
        >
          Add Expense
        </Button>
      </Stack>
    </Box>
  );
}