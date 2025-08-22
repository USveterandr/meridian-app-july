// components/property-card.tsx
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    description: string;
    image: string;
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="hover:shadow-xl transition-shadow overflow-hidden">
      <Image
        src={property.image}
        alt={property.title}
        width={400}
        height={250}
        className="h-64 w-full object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
        <p className="text-slate-600 mb-2">{property.location}</p>
        <p className="text-amber-600 font-bold mb-2">{property.price}</p>
        <div className="flex justify-between text-sm text-slate-500">
          <span>{property.bedrooms} Habitaciones</span>
          <span>{property.bathrooms} Baños</span>
          <span>{property.area}</span>
        </div>
        <p className="mt-2 text-slate-700">{property.description}</p>
      </div>
    </div>
  );
}