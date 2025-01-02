import { TransactionType } from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  date: z.date(),
});
