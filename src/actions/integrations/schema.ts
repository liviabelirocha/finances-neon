import { z } from "zod";

export const saveIntegrationSchema = z.object({
  boardId: z.string(),
  apiKey: z.string().trim().min(1),
});

export type SaveIntegrationSchema = z.infer<typeof saveIntegrationSchema>;
