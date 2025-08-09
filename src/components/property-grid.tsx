// components/property-grid.tsx
import React from 'react';
import Image from 'next/image';

export type Property = {
  id: string | number;
  title: string;
  location?: string;
  price?: string;
  image?: string;
};

export default function PropertyGrid({ properties }: { properties: Property[] }) {
  if (!properties || properties.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No properties found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p) => (
        <article key={p.id} className="border rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-48 w-full">
            {p.image ? (
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="bg-gray-100 h-full w-full flex items-center justify-center">No image</div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            {p.location && <p className="text-sm text-muted-foreground">{p.location}</p>}
            {p.price && <p className="mt-2 text-base font-medium">{p.price}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}