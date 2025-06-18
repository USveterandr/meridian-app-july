import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { AboutMission } from "@/components/about-mission"
import { AboutTeam } from "@/components/about-team"
import { AboutValues } from "@/components/about-values"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <Footer />
    </div>
  )
}
