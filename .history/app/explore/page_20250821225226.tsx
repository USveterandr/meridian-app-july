import { PropertySwipeInterface } from '@/components/property-swipe-interface'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explorar Propiedades - Meridian DR | Experiencia TikTok de Bienes Raíces',
  description: 'Explora propiedades de lujo en República Dominicana con nuestra experiencia única tipo TikTok. Desliza, descubre y encuentra tu próxima inversión.',
  keywords: 'propiedades República Dominicana, bienes raíces, inversión inmobiliaria, Punta Cana, Cap Cana, explorar propiedades'
}

export default function ExplorePage() {
  return (
    <main className=\"h-screen overflow-hidden\">
      <PropertySwipeInterface />
    </main>
  )
}
