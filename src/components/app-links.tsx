import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {appLinks.map((link) => (
        <a
          key={link.title}
          href={link.href}
          target={link.href === '#' ? '_self' : '_blank'}
          rel="noopener noreferrer"
          className="group block"
        >
          <Card className="h-full bg-card border hover:border-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
            <CardContent className="p-6 flex-grow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg flex items-center justify-center">
                  <link.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{link.title}</CardTitle>
                  <p className="text-base text-muted-foreground mt-1">{link.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="flex items-center text-sm font-semibold text-primary group-hover:underline">
                Open Application
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </CardFooter>
          </Card>
        </a>
      ))}
    </div>
  );
}
