import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PropertyTypes } from "@/components/property-types"
import { TaxIncentives } from "@/components/tax-incentives"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <HeroSection />
      <PropertyTypes />
      <HowItWorks />
      <TaxIncentives />
      <Stats />
      <Footer />
    </div>
  )
}
