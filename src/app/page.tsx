import { AppLinks } from "@/components/app-links";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-background border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">QAEHS Central</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <section>
          <AppLinks />
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground">
        <div className="container mx-auto px-4 py-6 text-center text-sm">
          <p>&copy; 2024 QAEHS Central. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
