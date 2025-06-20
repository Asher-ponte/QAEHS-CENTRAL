"use client";

import { useState } from 'react';
import { FileText, Truck, Shield, BarChart2, type LucideIcon } from 'lucide-react';
import { ServiceCard } from '@/components/service-card';
import { AppModal } from '@/components/app-modal';
import { SmartSafetyTipsForm } from '@/components/smart-safety-tips-form';
import { AnnouncementBoard } from '@/components/announcement-board';

interface Service {
  name: string;
  icon: LucideIcon;
}

const services: Service[] = [
  { name: "SOR APP", icon: FileText },
  { name: "FORKLIFT APP", icon: Truck },
  { name: "SAFETY PRO APP", icon: Shield },
  { name: "E-REPORT APP", icon: BarChart2 },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const handleServiceClick = (appName: string) => {
    setSelectedApp(appName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
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
                onClick={() => handleServiceClick(service.name)}
              />
            ))}
          </div>
        </section>

        {/* Smart Safety Tips Section */}
        <section aria-labelledby="safety-tips-title" className="p-6 border-t border-border">
          <SmartSafetyTipsForm />
        </section>

        {/* Announcement Board Section */}
        <section aria-labelledby="announcements-title" className="p-6 border-t border-border">
          <AnnouncementBoard />
        </section>

        {/* Spacer to respect padding-bottom from original design if needed, or rely on sections' padding */}
        <div className="pb-1"></div>

      </div>
      <AppModal isOpen={isModalOpen} onClose={closeModal} appName={selectedApp} />
    </main>
  );
}
