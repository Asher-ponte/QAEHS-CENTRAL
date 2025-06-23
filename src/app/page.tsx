import { AppLinks } from "@/components/app-links";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-4xl font-bold font-headline tracking-tight">QAEHS Central</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section>
          <AppLinks />
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm">
          <p>&copy; 2024 QAEHS Central. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
