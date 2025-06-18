import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterHero } from "@/components/register-hero"
import { RegisterForm } from "@/components/register-form"
import { RegisterBenefits } from "@/components/register-benefits"
import { RegisterProcess } from "@/components/register-process"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <RegisterHero />
      <RegisterBenefits />
      <RegisterProcess />
      <RegisterForm />
      <Footer />
    </div>
  )
}
