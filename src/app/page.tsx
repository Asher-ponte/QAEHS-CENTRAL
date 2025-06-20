
"use client";

import { useState } from 'react';
import { FileText, Truck, Shield, BarChart2, type LucideIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { ServiceCard } from '@/components/service-card';
import { AppModal } from '@/components/app-modal';
import { AnnouncementBoard } from '@/components/announcement-board';
import { Button } from '@/components/ui/button';

interface Service {
  name: string;
  icon: LucideIcon;
  url: string;
}

const services: Service[] = [
  { name: "SOR APP", icon: FileText, url: "http://10.232.248.62/sor/index.html" },
  { name: "FORKLIFT APP", icon: Truck, url: "http://10.232.248.62:9003/" },
  { name: "SAFETY PRO APP", icon: Shield, url: "http://10.232.248.62//learnhub_db/training.html" },
  { name: "E-REPORT APP", icon: BarChart2, url: "http://10.232.248.62/ehs%20pro%20app/index.html" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedAppUrl, setSelectedAppUrl] = useState<string | null>(null);

  const handleServiceClick = (appName: string, appUrl: string) => {
    setSelectedApp(appName);
    setSelectedAppUrl(appUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
    setSelectedAppUrl(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[450px] rounded-3xl bg-card text-card-foreground shadow-xl overflow-hidden flex flex-col">
        {/* Header Section */}
        <header className="p-6 text-center border-b border-border">
          <h1 className="text-3xl font-bold font-headline mb-1 text-foreground">Welcome</h1>
          <p className="text-base text-muted-foreground">
            Your centralized hub for safety and quality management.
          </p>
        </header>

        {/* Services Grid Section */}
        <section aria-labelledby="services-title" className="p-6">
          <div className="services-grid grid grid-cols-2 sm:grid-cols-2 gap-5">
            {services.map((service) => (
              <ServiceCard
                key={service.name}
                appName={service.name}
                Icon={service.icon}
                onClick={() => handleServiceClick(service.name, service.url)}
              />
            ))}
          </div>
        </section>

        {/* Announcement Board Section */}
        <section aria-labelledby="announcements-title" className="p-6 border-t border-border">
          <AnnouncementBoard />
        </section>

        {/* Admin Actions Section */}
        <section aria-labelledby="admin-actions-title" className="p-6 border-t border-border">
          <Link href="/admin/announcements" passHref legacyBehavior>
            <Button variant="outline" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Announcement
            </Button>
          </Link>
        </section>


        {/* Spacer to respect padding-bottom from original design if needed, or rely on sections' padding */}
        <div className="pb-1"></div>

      </div>
      <AppModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        appName={selectedApp} 
        appUrl={selectedAppUrl} 
      />
    </main>
  );
}

