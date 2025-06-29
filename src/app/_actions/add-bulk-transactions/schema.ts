import { TransactionMethod, TransactionType } from "@prisma/client";
import { z } from "zod";

export const addBulkTransactionsSchema = z.object({
  transactions: z
    .object({
      name: z.string().trim().min(1),
      amount: z.number().positive(),
      type: z.nativeEnum(TransactionType),
      method: z.nativeEnum(TransactionMethod).optional(),
      date: z.date(),
    })
    .array(),
  boardId: z.string(),
});

export type AddBulkTransactionsSchema = z.infer<
  typeof addBulkTransactionsSchema
>;
