import Image from "next/image"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PropertyTypes } from "@/components/property-types"
import { TaxIncentives } from "@/components/tax-incentives"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PropertyTypes />
      <TaxIncentives />
      <HowItWorks />
      <Stats />
      <Footer />
    </div>
  )
}
