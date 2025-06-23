import { AppLinks } from "@/components/app-links";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary/90 text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold font-headline tracking-tight">QAEHS Central</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold font-headline mb-6">Application Gateway</h2>
          <AppLinks />
        </section>
      </main>

      <footer className="bg-primary/90 text-primary-foreground mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm">
          <p>&copy; 2024 QAEHS Central. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
