import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertySearch } from "@/components/property-search"
import { PropertyGrid } from "@/components/property-grid"
import { PropertyFilters } from "@/components/property-filters"

export default function PropertiesPage() {
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
              <PropertyGrid />
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
