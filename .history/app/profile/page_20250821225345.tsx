import { UserProfileGamified } from '@/components/user-profile-gamified'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Perfil - Meridian DR | Logros y Recompensas',
  description: 'Ve tus logros, nivel de inversionista y recompensas en la plataforma de bienes raíces más avanzada de República Dominicana.',
  keywords: 'perfil usuario, logros, recompensas, nivel inversionista, gamificación'
}

export default function ProfilePage() {
  return (
    <div className=\"min-h-screen bg-gradient-to-br from-slate-50 to-blue-50\">
      <Header />
      <main className=\"pt-20\">
        <UserProfileGamified />
      </main>
      <Footer />
    </div>
  )
}
