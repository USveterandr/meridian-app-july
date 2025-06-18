import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SellHero } from "@/components/sell-hero"
import { SellProcess } from "@/components/sell-process"
import { SellBenefits } from "@/components/sell-benefits"
import { PropertyUploadForm } from "@/components/property-upload-form"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <SellHero />
      <SellBenefits />
      <SellProcess />
      <PropertyUploadForm />
      <Footer />
    </div>
  )
}
