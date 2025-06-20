
"use client";

import type React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bell } from 'lucide-react';
import type { Announcement } from '@/lib/announcements';
import { getAndSeedAnnouncements, formatAnnouncementDate } from '@/lib/announcements';

export function AnnouncementBoard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Load announcements from localStorage on client-side mount
    setAnnouncements(getAndSeedAnnouncements());
  }, []);

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
                    <p className="text-xs text-muted-foreground">{formatAnnouncementDate(announcement.date)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{announcement.description}</p>
                  {announcement.linkUrl && announcement.linkText && (
                    <a
                      href={announcement.linkUrl}
                      target={announcement.linkUrl.startsWith('/') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 inline-block"
                    >
                      {announcement.linkText}
                    </a>
                  )}
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
