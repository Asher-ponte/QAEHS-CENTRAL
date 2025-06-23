'use server';

/**
 * @fileOverview Training Suggestion AI agent.
 *
 * - trainingSuggestion - A function that handles the training suggestion process.
 * - TrainingSuggestionInput - The input type for the trainingSuggestion function.
 * - TrainingSuggestionOutput - The return type for the trainingSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrainingSuggestionInputSchema = z.object({
  userRole: z.string().describe('The role of the user.'),
  recentEhsIncidents: z.string().describe('The list of recent EHS incidents.'),
});
export type TrainingSuggestionInput = z.infer<typeof TrainingSuggestionInputSchema>;

const TrainingSuggestionOutputSchema = z.object({
  trainingSuggestion: z.string().describe('The suggested training materials.'),
  summary: z.string().describe('The summary of the suggested training materials.'),
});
export type TrainingSuggestionOutput = z.infer<typeof TrainingSuggestionOutputSchema>;

export async function trainingSuggestion(input: TrainingSuggestionInput): Promise<TrainingSuggestionOutput> {
  return trainingSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trainingSuggestionPrompt',
  input: {schema: TrainingSuggestionInputSchema},
  output: {schema: TrainingSuggestionOutputSchema},
  prompt: `You are an expert in safety and compliance training.

  Based on the user's role and recent EHS incidents, you will suggest relevant training materials and summarize the key points.

  User Role: {{{userRole}}}
  Recent EHS Incidents: {{{recentEhsIncidents}}}
  `,
});

const trainingSuggestionFlow = ai.defineFlow(
  {
    name: 'trainingSuggestionFlow',
    inputSchema: TrainingSuggestionInputSchema,
    outputSchema: TrainingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
