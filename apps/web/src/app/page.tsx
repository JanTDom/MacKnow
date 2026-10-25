import { pl } from '@macknow/ui';

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="font-display text-3xl font-semibold">
        {pl('Witaj, Małgorzato – co dziś ćwiczymy?')}
      </h1>
    </main>
  );
}
