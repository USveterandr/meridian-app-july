"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WelcomeHero } from "@/components/welcome-hero"
import { WelcomeSteps } from "@/components/welcome-steps"
import { WelcomeResources } from "@/components/welcome-resources"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <WelcomeHero />
      <WelcomeSteps />
      <WelcomeResources />
      <Footer />
    </div>
  )
}
