// app/properties/page.tsx
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertySearch } from "@/components/property-search";
import { PropertyGrid } from "@/components/property-grid";
import { PropertyFilters } from "@/components/property-filters";

export default function PropertiesPage() {
  const properties = [
    {
      id: 1,
      title: "Villa Oceanfront en Casa de Campo",
      location: "La Romana",
      price: "$3,500,000",
      bedrooms: 5,
      bathrooms: 6,
      area: "850 m²",
      description: "Exclusiva villa frente al mar con acceso privado a la playa, piscina infinita y vistas panorámicas al Caribe.",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      title: "Mansión Moderna en Piantini",
      location: "Santo Domingo",
      price: "$2,800,000",
      bedrooms: 6,
      bathrooms: 7,
      area: "1,200 m²",
      description: "Lujosa mansión en uno de los barrios más exclusivos de Santo Domingo, con diseño de arquitecto de renombre.",
      image: "/placeholder.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Propiedades de Lujo en
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              República Dominicana
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Descubre nuestra exclusiva selección de propiedades verificadas, desde villas costeras hasta resorts
            completos
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertySearch />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <PropertyFilters />
            </aside>
            <main className="lg:w-3/4">
              <PropertyGrid properties={properties} />
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}