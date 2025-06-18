import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InvestHero } from "@/components/invest-hero"
import { InvestmentOpportunities } from "@/components/investment-opportunities"
import { MarketInsights } from "@/components/market-insights"
import { InvestorResources } from "@/components/investor-resources"

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <InvestHero />
      <InvestmentOpportunities />
      <MarketInsights />
      <InvestorResources />
      <Footer />
    </div>
  )
}
