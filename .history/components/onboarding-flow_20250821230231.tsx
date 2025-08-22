"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  ChevronLeft, 
  X,
  Play,
  Trophy,
  Target,
  Zap,
  Gift,
  Star,
  Coins,
  Sparkles,
  Heart,
  Share2,
  Calculator,
  Building2,
  MapPin,
  DollarSign,
  TrendingUp,
  Users,
  Crown
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import CountUp from 'react-countup'
import { toast } from 'react-hot-toast'
import ConfettiExplosion from 'react-confetti-explosion'

interface OnboardingStep {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  action: {
    label: string
    points: number
    onClick: () => void
  }
  quickWin?: boolean
  gameMechanic?: 'tap' | 'swipe' | 'hold'
  illustration?: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  points: number
  unlocked: boolean
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: '¡Bienvenido a Meridian! 🎉',
    subtitle: 'Tu aventura inmobiliaria comienza aquí',
    description: 'Descubre el primer TikTok inmobiliario de República Dominicana. Gana puntos, desbloquea logros y encuentra tu próxima inversión.',
    icon: <Crown className="h-12 w-12 text-amber-500" />,
    action: {
      label: 'Comenzar Aventura',
      points: 100,
      onClick: () => {}
    },
    quickWin: true,
    illustration: '/illustrations/welcome.svg'
  },
  {
    id: 'explore_properties',
    title: 'Explora como en TikTok 📱',
    subtitle: 'Desliza para descubrir propiedades increíbles',
    description: 'Usa gestos naturales para navegar por propiedades. Desliza hacia arriba para la siguiente, toca para ver detalles, mantén presionado para vista rápida.',
    icon: <Play className="h-12 w-12 text-blue-500" />,
    action: {
      label: 'Ver mi Primera Propiedad',
      points: 50,
      onClick: () => {}
    },
    gameMechanic: 'swipe',
    illustration: '/illustrations/swipe.svg'
  },
  {
    id: 'like_property',
    title: 'Marca tus Favoritos ❤️',
    subtitle: 'Cada like suma puntos',
    description: 'Dale like a las propiedades que te gusten. Cada interacción te da puntos y nos ayuda a recomendarte mejores opciones.',
    icon: <Heart className="h-12 w-12 text-red-500" />,
    action: {
      label: 'Dar mi Primer Like',
      points: 25,
      onClick: () => {}
    },
    quickWin: true,
    gameMechanic: 'tap'
  },
  {
    id: 'calculate_roi',
    title: 'Calcula tu ROI 📊',
    subtitle: 'Gamifica tus inversiones',
    description: 'Usa nuestra calculadora gamificada para ver el potencial de cada propiedad. Descubre incentivos fiscales exclusivos de RD.',
    icon: <Calculator className="h-12 w-12 text-purple-500" />,
    action: {
      label: 'Hacer mi Primer Cálculo',
      points: 75,
      onClick: () => {}
    },
    illustration: '/illustrations/calculator.svg'
  },
  {
    id: 'share_property',
    title: 'Comparte y Gana 🚀',
    subtitle: 'Programa de referidos activo',
    description: 'Comparte propiedades increíbles y gana puntos. Por cada amigo que se registre, ¡obtienes rewards especiales!',
    icon: <Share2 className="h-12 w-12 text-green-500" />,
    action: {
      label: 'Compartir Primera Propiedad',
      points: 100,
      onClick: () => {}
    },
    quickWin: true
  },
  {
    id: 'unlock_profile',
    title: 'Tu Perfil de Inversionista 🏆',
    subtitle: 'Trackea tu progreso',
    description: 'Ve todos tus logros, puntos acumulados y nivel actual. Desbloquea badges exclusivos y descuentos en comisiones.',
    icon: <Trophy className="h-12 w-12 text-amber-500" />,
    action: {
      label: 'Ver mi Perfil',
      points: 50,
      onClick: () => {}
    },
    illustration: '/illustrations/profile.svg'
  }
]

const STARTER_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    name: 'Primeros Pasos',
    description: 'Completaste el onboarding',
    icon: '🚀',
    points: 200,
    unlocked: false
  },
  {
    id: 'property_explorer',
    name: 'Explorador Novato',
    description: 'Viste tu primera propiedad',
    icon: '🔍',
    points: 50,
    unlocked: false
  },
  {
    id: 'heart_giver',
    name: 'Corazón Generoso',
    description: 'Diste tu primer like',
    icon: '❤️',
    points: 25,
    unlocked: false
  },
  {
    id: 'number_cruncher',
    name: 'Calculador Experto',
    description: 'Hiciste tu primer cálculo de ROI',
    icon: '🧮',
    points: 75,
    unlocked: false
  },
  {
    id: 'social_butterfly',
    name: 'Mariposa Social',
    description: 'Compartiste tu primera propiedad',
    icon: '🦋',
    points: 100,
    unlocked: false
  }
]

interface OnboardingFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function OnboardingFlow({ isOpen, onClose, onComplete }: OnboardingFlowProps) {
  // const { completeExploration, completeLearningModule, shareProperty, state } = useGamification() // Temporarily disabled
  
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [achievements, setAchievements] = useState(STARTER_ACHIEVEMENTS)
  const [showConfetti, setShowConfetti] = useState(false)
  const [totalPointsEarned, setTotalPointsEarned] = useState(0)

  const progress = (completedSteps.size / ONBOARDING_STEPS.length) * 100

  const completeStep = (stepId: string, points: number) => {
    if (completedSteps.has(stepId)) return

    setCompletedSteps(prev => new Set([...prev, stepId]))
    setTotalPointsEarned(prev => prev + points)
    setShowConfetti(true)

    // Unlock corresponding achievement
    const achievementMap: { [key: string]: string } = {
      'explore_properties': 'property_explorer',
      'like_property': 'heart_giver', 
      'calculate_roi': 'number_cruncher',
      'share_property': 'social_butterfly'
    }

    const achievementId = achievementMap[stepId]
    if (achievementId) {
      setAchievements(prev => 
        prev.map(ach => 
          ach.id === achievementId 
            ? { ...ach, unlocked: true }
            : ach
        )
      )
    }

    // Award gamification points
    switch (stepId) {
      case 'explore_properties':
        completeExploration()
        break
      case 'calculate_roi':
        completeLearningModule('onboarding-calculator')
        break
      case 'share_property':
        shareProperty()
        break
    }

    toast(`¡+${points} puntos ganados! 🎯`, {
      icon: '✨',
      style: {
        background: '#f59e0b',
        color: 'white'
      }
    })

    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleStepAction = (step: OnboardingStep) => {
    completeStep(step.id, step.action.points)
    step.action.onClick()

    // Auto advance to next step
    setTimeout(() => {
      if (currentStep < ONBOARDING_STEPS.length - 1) {
        setCurrentStep(prev => prev + 1)
      }
    }, 1500)
  }

  const handleComplete = () => {
    // Unlock final achievement
    setAchievements(prev => 
      prev.map(ach => 
        ach.id === 'first_steps'
          ? { ...ach, unlocked: true }
          : ach
      )
    )

    setTotalPointsEarned(prev => prev + 200)
    setShowConfetti(true)
    
    toast('¡Onboarding completado! ¡+200 puntos bonus! 🚀', {
      icon: '🏆',
      duration: 5000,
      style: {
        background: '#10b981',
        color: 'white'
      }
    })

    setTimeout(() => {
      onComplete()
      onClose()
    }, 3000)
  }

  const currentStepData = ONBOARDING_STEPS[currentStep]
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          {showConfetti && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ConfettiExplosion
                particleCount={100}
                width={1200}
                colors={['#f59e0b', '#8b5cf6', '#10b981', '#ef4444', '#3b82f6']}
              />
            </div>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-amber-500 to-purple-500 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Meridian Onboarding</h2>
                  <p className="text-slate-500 text-sm">Paso {currentStep + 1} de {ONBOARDING_STEPS.length}</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progreso</span>
                <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Current Step */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center mb-8"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-full">
                  {currentStepData.icon}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-lg text-amber-600 font-medium mb-4">
                  {currentStepData.subtitle}
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {currentStepData.description}
                </p>

                {/* Quick Win Badge */}
                {currentStepData.quickWin && (
                  <Badge className="bg-green-100 text-green-700 mb-4">
                    <Zap className="h-3 w-3 mr-1" />
                    Quick Win
                  </Badge>
                )}
              </motion.div>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <Button
                onClick={() => handleStepAction(currentStepData)}
                disabled={completedSteps.has(currentStepData.id)}
                className="w-full bg-gradient-to-r from-amber-500 to-purple-500 hover:from-amber-600 hover:to-purple-600 text-white py-4 text-lg font-bold rounded-2xl"
              >
                {completedSteps.has(currentStepData.id) ? (
                  <>
                    <Trophy className="h-5 w-5 mr-2" />
                    ¡Completado!
                  </>
                ) : (
                  <>
                    <span>{currentStepData.action.label}</span>
                    <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                      +{currentStepData.action.points}
                    </Badge>
                  </>
                )}
              </Button>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>

                {isLastStep ? (
                  <Button
                    onClick={handleComplete}
                    disabled={completedSteps.size < ONBOARDING_STEPS.length - 1}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Finalizar
                    <Crown className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(Math.min(ONBOARDING_STEPS.length - 1, currentStep + 1))}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Points Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-purple-50 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Coins className="h-5 w-5 text-amber-500" />
                  <span className="font-medium text-slate-700">Puntos Ganados</span>
                </div>
                <span className="text-xl font-bold text-amber-600">
                  <CountUp end={totalPointsEarned} duration={1} />
                </span>
              </div>

              {/* Mini Achievements */}
              <div className="mt-4 grid grid-cols-5 gap-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`text-center p-2 rounded-lg transition-all ${
                      achievement.unlocked 
                        ? 'bg-amber-100 scale-105' 
                        : 'bg-slate-100 opacity-50'
                    }`}
                  >
                    <div className="text-lg">{achievement.icon}</div>
                    <div className="text-xs font-medium text-slate-600 mt-1">
                      {achievement.unlocked ? '+' + achievement.points : '?'}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for managing onboarding state
export function useOnboarding() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('meridian_onboarding_completed')
    if (!seen) {
      setIsOnboardingOpen(true)
    } else {
      setHasSeenOnboarding(true)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('meridian_onboarding_completed', 'true')
    setHasSeenOnboarding(true)
    setIsOnboardingOpen(false)
  }

  const resetOnboarding = () => {
    localStorage.removeItem('meridian_onboarding_completed')
    setHasSeenOnboarding(false)
    setIsOnboardingOpen(true)
  }

  return {
    hasSeenOnboarding,
    isOnboardingOpen,
    setIsOnboardingOpen,
    completeOnboarding,
    resetOnboarding
  }
}