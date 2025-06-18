import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TaxIncentives } from "@/components/tax-incentives"
import { IncentivesHero } from "@/components/incentives-hero"
import { GovernmentPartners } from "@/components/government-partners"

export default function IncentivesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <IncentivesHero />
      <TaxIncentives />
      <GovernmentPartners />
      <Footer />
    </div>
  )
}
