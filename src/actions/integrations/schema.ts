import { z } from "zod";

export const saveIntegrationSchema = z.object({
  boardId: z.string(),
  apiKey: z.string().trim().min(1),
});

export type SaveIntegrationSchema = z.infer<typeof saveIntegrationSchema>;

export const saveIgnoreRulesSchema = z.object({
  boardId: z.string(),
  budgetIds: z.array(z.number().int()),
  tagIds: z.array(z.number().int()),
});

export type SaveIgnoreRulesSchema = z.infer<typeof saveIgnoreRulesSchema>;
