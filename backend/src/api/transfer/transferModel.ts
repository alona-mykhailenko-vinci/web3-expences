import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

export type Transfer = z.infer<typeof TransferSchema>;
export const TransferSchema = z.object({
  id: z.number(),
  amount: z.number().positive(),
  date: z.date(),
  sourceId: z.number(),
  targetId: z.number(),
  source: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    bankAccount: z.string().nullable(),
  }),
  target: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    bankAccount: z.string().nullable(),
  }),
});

// Input schema for creating a transfer
export const CreateTransferSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    date: z.string().datetime().optional(),
    sourceId: z.number().optional(),
    targetId: z.number().optional(),
    source: z.string().optional(), // User name (alternative to sourceId)
    target: z.string().optional(), // User name (alternative to targetId)
  }).refine(
    (data) => (data.sourceId || data.source) && (data.targetId || data.target),
    {
      message: "Either source name or sourceId must be provided, and either target name or targetId must be provided",
    }
  ),
});

// Input Validation for 'GET transfers/:id' endpoint
export const GetTransferSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export type CreateTransferInput = z.infer<typeof CreateTransferSchema>["body"];