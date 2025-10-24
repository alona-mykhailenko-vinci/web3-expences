import type { Request, Response } from "express";
import * as transferRepository from './transferRepository';
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export async function listTransfers(req: Request, res: Response) {
  try {
    const transfers = await transferRepository.getAllTransfers();
    res.status(StatusCodes.OK).json(transfers);
  } catch (error) {
    console.error('Error listing transfers:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to fetch transfers' 
    });
  }
}

export async function getTransferDetail(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const transfer = await transferRepository.getTransferById(id);
    
    if (!transfer) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Transfer not found' 
      });
    }
    
    res.status(StatusCodes.OK).json(transfer);
  } catch (error) {
    console.error('Error getting transfer detail:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to fetch transfer' 
    });
  }
}

export async function createTransfer(req: Request, res: Response) {
  try {
    const { amount, date, sourceId, targetId, source, target } = req.body;

    let actualSourceId: number;
    let actualTargetId: number;

    // Handle source user - either by ID or by name
    if (source && !sourceId) {
      const sourceUser = await prisma.user.findFirst({
        where: { name: source }
      });
      
      if (!sourceUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          error: `Source user with name '${source}' not found` 
        });
      }
      
      actualSourceId = sourceUser.id;
    } else if (sourceId) {
      actualSourceId = Number(sourceId);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Either source name or sourceId must be provided' 
      });
    }

    // Handle target user - either by ID or by name
    if (target && !targetId) {
      const targetUser = await prisma.user.findFirst({
        where: { name: target }
      });
      
      if (!targetUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          error: `Target user with name '${target}' not found` 
        });
      }
      
      actualTargetId = targetUser.id;
    } else if (targetId) {
      actualTargetId = Number(targetId);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Either target name or targetId must be provided' 
      });
    }

    // Validate that source and target are different
    if (actualSourceId === actualTargetId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        error: 'Source and target users must be different' 
      });
    }

    const newTransfer = await transferRepository.createTransfer({
      amount: parseFloat(amount),
      date: date ? new Date(date) : new Date(),
      sourceId: actualSourceId,
      targetId: actualTargetId,
    });
    
    res.status(StatusCodes.CREATED).json(newTransfer);
  } catch (error) {
    console.error('Error creating transfer:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: 'Failed to create transfer' 
    });
  }
}