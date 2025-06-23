import { z } from 'zod';

export const trainingSuggestionSchema = z.object({
  userRole: z.string().min(3, { message: "User role must be at least 3 characters long." }),
  recentEhsIncidents: z.string().min(10, { message: "Please describe recent incidents (at least 10 characters)." }),
});

export type TrainingSuggestionForm = z.infer<typeof trainingSuggestionSchema>;
