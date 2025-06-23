'use server';

import { trainingSuggestion, type TrainingSuggestionOutput } from "@/ai/flows/training-suggestion";
import { trainingSuggestionSchema } from "@/lib/schema";
import { z } from "zod";

export async function getTrainingSuggestion(values: z.infer<typeof trainingSuggestionSchema>): Promise<{ success?: TrainingSuggestionOutput; error?: string }> {
  const validatedFields = trainingSuggestionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid input provided." };
  }

  try {
    const result = await trainingSuggestion(validatedFields.data);
    return { success: result };
  } catch (error) {
    console.error("Error getting training suggestion:", error);
    return { error: "An unexpected error occurred while generating suggestions. Please try again later." };
  }
}
