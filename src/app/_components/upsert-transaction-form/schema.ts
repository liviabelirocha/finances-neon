import { TransactionType } from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),
  amount: z
    .number()
    .positive({
      message: "Amount must be positive",
    })
    .min(1, {
      message: "Amount is required",
    }),
  type: z.nativeEnum(TransactionType, {
    required_error: "Type is required",
  }),
  date: z.date({
    required_error: "Date is required",
  }),
  installments: z.number().positive().optional(),
  tagId: z.string().trim().optional(),
});
