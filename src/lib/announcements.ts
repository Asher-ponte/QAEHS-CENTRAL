
'use client';

import { formatDistanceToNow, parseISO } from 'date-fns';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  linkUrl?: string;
  linkText?: string;
  date: string; // ISO string
}

const STORAGE_KEY = 'qahes_announcements';

// Helper for generating ISO dates for initial data relative to "now"
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const initialAnnouncementsData: Omit<Announcement, 'id'>[] = [
  {
    title: 'Scheduled System Maintenance',
    description: 'All QAEHS apps will be unavailable on Saturday from 2 AM to 4 AM for scheduled maintenance.',
    date: daysAgo(2),
  },
  {
    title: 'New Safety Protocol Update: Forklift Operation',
    description: 'Please review the updated forklift operation guidelines. Mandatory compliance by end of week.',
    linkUrl: 'http://10.232.248.62//learnhub_db/training.html',
    linkText: 'View Safety Pro App',
    date: daysAgo(5),
  },
  {
    title: 'Emergency Drill Next Week',
    description: 'A site-wide emergency evacuation drill is scheduled for next Wednesday at 10:00 AM. Participation is mandatory.',
    date: daysAgo(7), // Example: This was a week ago
  },
  {
    title: 'Updated E-Report App Guide',
    description: 'The guide for the E-Report App has been updated. You can find it here.',
    linkUrl: 'http://10.232.248.62/ehs%20pro%20app/guide.html',
    linkText: 'Read E-Report Guide',
    date: daysAgo(1),
  },
  {
    title: 'Manage Announcements Here',
    description: 'Admins can add new announcements using the new admin page.',
    linkUrl: '/admin/announcements',
    linkText: 'Go to Admin Page',
    date: new Date().toISOString(), // "Just now" effectively
  }
];

// Function to get all announcements from storage, used internally by addAnnouncement
function getAllAnnouncementsFromStorage(): Announcement[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Function for the AnnouncementBoard to get and potentially seed announcements
export function getAndSeedAnnouncements(): Announcement[] {
   if (typeof window === 'undefined') {
     // Provide a default structure for SSR or if window is not available
     return initialAnnouncementsData.map((ann, index) => ({
       ...ann,
       id: `ssr-initial-${index}`
     }));
   }
   
   let items = localStorage.getItem(STORAGE_KEY);
   if (!items) {
       const itemsToSeed = initialAnnouncementsData.map((ann, idx) => ({...ann, id: `initial-${idx}-${Date.now()}`}));
       localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToSeed));
       return itemsToSeed;
   }
   return JSON.parse(items);
}


export function addAnnouncement(data: Omit<Announcement, 'id' | 'date'>): Announcement {
  if (typeof window === 'undefined') {
    // Should not happen if called from client-side form
    const FAKE_ID_FOR_SSR_OR_ERROR = 'error-cannot-add-announcement-server-side';
    console.error("addAnnouncement called on the server or in an environment without localStorage.");
    return { ...data, id: FAKE_ID_FOR_SSR_OR_ERROR, date: new Date().toISOString() };
  }
  const currentAnnouncements = getAllAnnouncementsFromStorage();
  const newAnnouncement: Announcement = {
    ...data,
    id: `ann-${Date.now()}`,
    date: new Date().toISOString(),
  };
  const updatedAnnouncements = [newAnnouncement, ...currentAnnouncements]; // New announcements at the top
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnnouncements));
  return newAnnouncement;
}

export function formatAnnouncementDate(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch (error) {
    // Fallback for invalid date strings that might have been in old initial data
    return dateString; 
  }
}
