
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { addAnnouncement, type Announcement } from '@/lib/announcements'; // Omit cannot be used as a type

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }).max(100, { message: "Title must be 100 characters or less." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, { message: "Description must be 500 characters or less." }),
  linkUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  linkText: z.string().max(50, { message: "Link text must be 50 characters or less." }).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AnnouncementForm() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      linkUrl: '',
      linkText: '',
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Construct the announcement data, ensuring optional fields are handled
      const announcementPayload: Omit<Announcement, 'id' | 'date'> = {
        title: data.title,
        description: data.description,
      };
      if (data.linkUrl && data.linkText) {
        announcementPayload.linkUrl = data.linkUrl;
        announcementPayload.linkText = data.linkText;
      } else if (data.linkUrl && !data.linkText) {
        // If URL is provided but no text, use the URL as text or a default
         announcementPayload.linkUrl = data.linkUrl;
         announcementPayload.linkText = "Learn more"; // Default link text
      }


      addAnnouncement(announcementPayload);
      toast({
        title: "Success!",
        description: "Announcement added. It will appear on the main page.",
      });
      reset(); // Reset form fields
    } catch (error) {
      console.error("Error adding announcement:", error);
      toast({
        title: "Error",
        description: "Failed to add announcement. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          {...register("title")} 
          placeholder="Enter announcement title"
          className={errors.title ? "border-destructive" : ""}
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          {...register("description")} 
          placeholder="Enter announcement details"
          rows={4}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkUrl">Link URL (Optional)</Label>
        <Input 
          id="linkUrl" 
          type="url"
          {...register("linkUrl")} 
          placeholder="https://example.com"
          className={errors.linkUrl ? "border-destructive" : ""}
        />
        {errors.linkUrl && <p className="text-sm text-destructive">{errors.linkUrl.message}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkText">Link Text (Optional - requires Link URL)</Label>
        <Input 
          id="linkText" 
          {...register("linkText")} 
          placeholder="e.g., Read More"
          className={errors.linkText ? "border-destructive" : ""}
        />
        {errors.linkText && <p className="text-sm text-destructive">{errors.linkText.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Adding...' : 'Add Announcement'}
      </Button>
    </form>
  );
}
