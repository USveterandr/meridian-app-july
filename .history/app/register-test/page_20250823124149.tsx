import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterHero } from "@/components/register-hero"

export default function RegisterTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <RegisterHero />
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Register Test Page</h1>
          <p className="text-center text-slate-600">Testing with Header, Footer, and RegisterHero components.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}