"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { type TrainingSuggestionForm, trainingSuggestionSchema } from "@/lib/schema";
import { getTrainingSuggestion } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

type TrainingSuggestionOutput = {
  trainingSuggestion: string;
  summary: string;
};

export function TrainingSuggestion() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<TrainingSuggestionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TrainingSuggestionForm>({
    resolver: zodResolver(trainingSuggestionSchema),
    defaultValues: {
      userRole: "",
      recentEhsIncidents: "",
    },
  });

  const onSubmit = (values: TrainingSuggestionForm) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const response = await getTrainingSuggestion(values);
      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        setResult(response.success);
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl shadow-primary/10">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-accent" />
            <div>
                <CardTitle className="text-2xl font-headline text-primary">AI Training Advisor</CardTitle>
                <CardDescription>Get AI-powered training suggestions based on recent events.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Warehouse Operator" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recentEhsIncidents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe Recent Incidents</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Minor slip near loading bay, incorrect use of PPE..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full bg-accent hover:bg-accent/90">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Suggestions"
              )}
            </Button>
          </form>
        </Form>

        {isPending && (
            <div className="mt-8 pt-6 border-t space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-8 w-1/3 mt-4" />
                <Skeleton className="h-20 w-full" />
            </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-semibold font-headline text-primary mb-4">Recommended Training</h3>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Suggested Training</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{result.trainingSuggestion}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Key Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{result.summary}</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
