import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClipboardList, Truck, BookOpenCheck, Siren, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AppLink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const appLinks: AppLink[] = [
  {
    title: "SOR App",
    description: "Submit and review Safety Observation Reports.",
    href: "http://10.232.248.194/sor",
    icon: ClipboardList,
  },
  {
    title: "Forklift Safety",
    description: "Access forklift operation and safety protocols.",
    href: "http://10.232.248.194:9003",
    icon: Truck,
  },
  {
    title: "QAEHS Training",
    description: "Browse and complete mandatory training modules.",
    href: "http://10.232.248.194/learnhub",
    icon: BookOpenCheck,
  },
  {
    title: "EHS IR",
    description: "Report and manage Environmental Health & Safety Incidents.",
    href: "http://10.232.248.194/ehs%20pro%20app/index.html",
    icon: Siren,
  },
];

export function AppLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {appLinks.map((link) => (
        <a
          key={link.title}
          href={link.href}
          target={link.href === '#' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="group block"
        >
          <Card className="h-full bg-card border hover:border-accent transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10">
            <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
              <CardTitle className="text-xl font-medium">{link.title}</CardTitle>
              <link.icon className="w-7 h-7 text-primary" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-base text-muted-foreground">{link.description}</p>
              <div className="flex items-center mt-4 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                Open Application
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
