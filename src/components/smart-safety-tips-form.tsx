
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'; // Added Controller import
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSmartSafetyTips, type SmartSafetyTipsInput, type SmartSafetyTipsOutput } from '@/ai/flows/smart-safety-tips';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lightbulb } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';


const formSchema = z.object({
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  appActivity: z.string().min(1, { message: "Please select an app activity." }),
});

type FormData = z.infer<typeof formSchema>;

const appActivities = ["SOR APP", "FORKLIFT APP", "SAFETY PRO APP", "E-REPORT APP"];

export function SmartSafetyTipsForm() {
  const [safetyTips, setSafetyTips] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({ // Removed setValue and watch as they are not strictly needed here anymore for appActivity
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      appActivity: ''
    }
  });
  

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setSafetyTips(null);
    try {
      const result: SmartSafetyTipsOutput = await getSmartSafetyTips(data);
      setSafetyTips(result.safetyTips);
    } catch (error) {
      console.error("Error fetching safety tips:", error);
      toast({
        title: "Error",
        description: "Failed to fetch safety tips. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-xl">Smart Safety Tips</CardTitle>
        </div>
        <CardDescription>Get AI-powered safety recommendations based on your location and current task.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location" className="font-semibold">Current Location</Label>
            <Input 
              id="location"
              placeholder="e.g., Warehouse Section A" 
              {...register("location")} 
              aria-invalid={errors.location ? "true" : "false"}
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && <p className="text-sm text-destructive flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.location.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="appActivity" className="font-semibold">Current App/Activity</Label>
            <Controller
              name="appActivity"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger 
                    id="appActivity" 
                    aria-invalid={errors.appActivity ? "true" : "false"}
                    className={errors.appActivity ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select an app/activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {appActivities.map(activity => (
                      <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.appActivity && <p className="text-sm text-destructive flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.appActivity.message}</p>}
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? 'Getting Tips...' : 'Get Safety Tips'}
          </Button>
        </form>
      </CardContent>
      {(isLoading || safetyTips) && (
        <CardFooter className="flex flex-col items-start pt-6">
          <h4 className="font-semibold text-lg mb-2 text-foreground">Recommendations:</h4>
          {isLoading && (
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}
          {safetyTips && safetyTips.length > 0 && (
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {safetyTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          )}
          {safetyTips && safetyTips.length === 0 && (
            <p className="text-sm text-muted-foreground">No specific tips generated. Ensure your inputs are detailed.</p>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

// Removed the custom Controller component that was previously here.
// The official Controller from 'react-hook-form' is now imported and used directly.
