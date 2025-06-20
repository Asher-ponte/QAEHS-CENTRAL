import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Card might not be needed if Button is styled directly

interface ServiceCardProps {
  appName: string;
  Icon: LucideIcon;
  onClick: () => void;
}

export function ServiceCard({ appName, Icon, onClick }: ServiceCardProps) {
  return (
    <Button
      variant="outline"
      className="service-card h-28 flex flex-col items-center justify-center p-4 rounded-xl shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-in-out bg-card border-border focus:ring-2 focus:ring-primary/50"
      onClick={onClick}
      aria-label={`Launch ${appName}`}
    >
      <div className="service-icon-wrapper w-12 h-12 rounded-full flex justify-center items-center mb-2 bg-primary/10">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-sm font-semibold text-card-foreground text-center leading-tight">{appName}</span>
    </Button>
  );
}
