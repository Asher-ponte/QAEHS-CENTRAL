// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview An AI agent that provides smart safety tips based on the user's location and the QAEHS app they are using.
 *
 * - getSmartSafetyTips - A function that returns safety tips based on location and app activity.
 * - SmartSafetyTipsInput - The input type for the getSmartSafetyTips function.
 * - SmartSafetyTipsOutput - The return type for the getSmartSafetyTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSafetyTipsInputSchema = z.object({
  location: z.string().describe('The current location of the user.'),
  appActivity: z.string().describe('The QAEHS app the user is currently using.'),
});
export type SmartSafetyTipsInput = z.infer<typeof SmartSafetyTipsInputSchema>;

const SmartSafetyTipsOutputSchema = z.object({
  safetyTips: z.array(z.string()).describe('A list of safety tips tailored to the user\u2019s current location and app activity.'),
});
export type SmartSafetyTipsOutput = z.infer<typeof SmartSafetyTipsOutputSchema>;

export async function getSmartSafetyTips(input: SmartSafetyTipsInput): Promise<SmartSafetyTipsOutput> {
  return smartSafetyTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSafetyTipsPrompt',
  input: {schema: SmartSafetyTipsInputSchema},
  output: {schema: SmartSafetyTipsOutputSchema},
  prompt: `You are an AI assistant that provides smart safety tips to users based on their current location and the QAEHS app they are using.

  Location: {{{location}}}
  App Activity: {{{appActivity}}}

  Provide a list of safety tips tailored to the user's current location and app activity. Consider potential hazards and how the user can proactively address them to maintain a safe working environment.
  The response must be a JSON array of strings.
  `,
});

const smartSafetyTipsFlow = ai.defineFlow(
  {
    name: 'smartSafetyTipsFlow',
    inputSchema: SmartSafetyTipsInputSchema,
    outputSchema: SmartSafetyTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
