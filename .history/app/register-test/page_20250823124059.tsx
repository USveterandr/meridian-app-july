import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RegisterTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Register Test Page</h1>
          <p className="text-center text-slate-600">Testing with just Header and Footer components.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}