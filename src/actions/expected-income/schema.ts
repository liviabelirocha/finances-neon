import { z } from "zod";

export const upsertExpectedIncomeSchema = z.object({
  boardId: z.string(),
  year: z.number().int(),
  month: z.number().int().min(0).max(11),
  /** In cents. */
  amount: z.number().int().positive(),
});

export type UpsertExpectedIncomeSchema = z.infer<
  typeof upsertExpectedIncomeSchema
>;
