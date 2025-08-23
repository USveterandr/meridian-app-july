import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterHero } from "@/components/register-hero"
import { RegisterForm } from "@/components/register-form"
import { RegisterBenefits } from "@/components/register-benefits"
import { RegisterProcess } from "@/components/register-process"

export default function RegisterTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <RegisterHero />
      <RegisterBenefits />
      <RegisterProcess />
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Register Test Page</h1>
          <p className="text-center text-slate-600">Testing all register page components.</p>
        </div>
      </div>
      <RegisterForm />
      <Footer />
    </div>
  )
}