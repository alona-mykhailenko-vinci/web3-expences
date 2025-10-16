import type { Request, Response } from "express";
import * as expenseRepository from './expenseRepository';
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

  export async function listExpenses(req: Request, res: Response) {
      const expenses = await expenseRepository.getAllExpenses();
      res.status(StatusCodes.OK).json(expenses);
  }

  export async function getExpenseDetail(req: Request, res: Response) {
      const id = Number(req.params.id);
      const expense = await expenseRepository.getExpenseById(id);
      if (!expense) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Expense not found' });
      }
      res.status(StatusCodes.OK).json(expense);
  }


  export async function createExpense(req: Request, res: Response) {
  try {
    const { description, amount, date, payerId, participantIds, payer } = req.body;

    let actualPayerId: number;
    let actualParticipantIds: number[] = [];

    // If payer name is provided (from frontend), look up the user ID
    if (payer && !payerId) {
      const payerUser = await prisma.user.findFirst({
        where: { name: payer }
      });
      
      if (!payerUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          error: `User with name '${payer}' not found` 
        });
      }
      
      actualPayerId = payerUser.id;
      // For now, include only the payer as participant if no participants specified
      actualParticipantIds = [payerUser.id];
    } else if (payerId) {
      // If payerId is provided directly, use it
      actualPayerId = Number(payerId);
      actualParticipantIds = participantIds || [];
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Either payer name or payerId must be provided' 
      });
    }

    const newExpense = await expenseRepository.createExpense({
      description,
      amount: parseFloat(amount),
      date: date ? new Date(date) : new Date(),
      payerId: actualPayerId,
      participantIds: actualParticipantIds
    });
    
    res.status(StatusCodes.CREATED).json(newExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to create expense' 
    });
  }
}