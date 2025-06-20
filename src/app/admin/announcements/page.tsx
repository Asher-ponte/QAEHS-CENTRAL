
"use client";

import { AnnouncementForm } from '@/components/admin/AnnouncementForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminAnnouncementsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        <Card className="shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-foreground">Manage Announcements</CardTitle>
            <CardDescription>Add new announcements that will be displayed on the main page.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnnouncementForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
