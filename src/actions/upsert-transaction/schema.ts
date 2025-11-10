import { TransactionMethod, TransactionType } from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  method: z.nativeEnum(TransactionMethod).optional(),
  date: z.date(),
  tagId: z.string().optional(),
  installments: z.number().positive().default(1).optional(),
  boardId: z.string(),
  recurring: z.boolean().optional(),
});

export type UpsertTransactionSchema = z.infer<typeof upsertTransactionSchema>;
