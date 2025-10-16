import type { Request, Response } from "express";
import * as transactionRepository from './transactionRepository';
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

export async function listTransactions(req: Request, res: Response) {
  try {
    const transactions = await transactionRepository.getAllTransactions();
    res.status(StatusCodes.OK).json(transactions);
  } catch (error) {
    console.error('Error listing transactions:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to fetch transactions' 
    });
  }
}