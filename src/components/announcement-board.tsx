
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bell } from 'lucide-react';
import type React from 'react';

interface Announcement {
  id: string;
  title: string;
  description: React.ReactNode; // Changed from string to React.ReactNode
  date: string;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Scheduled System Maintenance',
    description: 'All QAEHS apps will be unavailable on Saturday from 2 AM to 4 AM for scheduled maintenance.',
    date: '2 days ago',
  },
  {
    id: '2',
    title: 'New Safety Protocol Update: Forklift Operation',
    description: (
      <>
        Please review the updated forklift operation guidelines in the{' '}
        <a 
          href="http://10.232.248.62//learnhub_db/training.html" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline"
        >
          Safety Pro App
        </a>
        . Mandatory compliance by end of week.
      </>
    ),
    date: '5 days ago',
  },
  {
    id: '3',
    title: 'Emergency Drill Next Week',
    description: 'A site-wide emergency evacuation drill is scheduled for next Wednesday at 10:00 AM. Participation is mandatory.',
    date: '1 week ago',
  },
  {
    id: '4',
    title: 'Updated E-Report App Guide',
    description: (
      <>
        The guide for the E-Report App has been updated. You can find it{' '}
        <a 
          href="http://10.232.248.62/ehs%20pro%20app/guide.html"
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline"
        >
          here
        </a>.
      </>
    ),
    date: '1 day ago',
  },
  {
    id: '5',
    title: 'How to Add New Announcements',
    description: (
      <>
        This is a sample new announcement. You can add new ones by editing the `announcements` array in the `AnnouncementBoard.tsx` file.
        Remember, you can also include links, for example, to the{' '}
        <a 
          href="http://10.232.248.62/sor/index.html"
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline"
        >
          SOR App
        </a>.
      </>
    ),
    date: 'Just now',
  }
];

export function AnnouncementBoard() {
  return (
    <Card className="w-full shadow-lg rounded-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Bell className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-xl">Announcement Board</CardTitle>
        </div>
        <CardDescription>Stay updated with the latest QAEHS news and protocols.</CardDescription>
      </CardHeader>
      <CardContent>
        {announcements.length > 0 ? (
          <ScrollArea className="h-[200px] pr-3">
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={announcement.id}>
                  <div className="mb-2">
                    <h4 className="font-semibold text-md text-foreground">{announcement.title}</h4>
                    <p className="text-xs text-muted-foreground">{announcement.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{announcement.description}</p>
                  {index < announcements.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No announcements at this time.</p>
        )}
      </CardContent>
    </Card>
  );
}

