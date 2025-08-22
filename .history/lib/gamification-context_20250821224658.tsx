"use client"

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ConfettiExplosion from 'react-confetti-explosion'
import { toast } from 'react-hot-toast'
import { 
  UserStats, 
  Achievement, 
  calculateLevel, 
  calculateLevelProgress,
  checkAchievementProgress,
  ACHIEVEMENTS,
  formatPoints,
  getRandomCelebration
} from '@/lib/gamification'

interface GamificationState extends UserStats {
  showConfetti: boolean
  recentAchievements: Achievement[]
}

type GamificationAction = 
  | { type: 'VIEW_PROPERTY' }
  | { type: 'LIKE_PROPERTY' }
  | { type: 'SHARE_PROPERTY' }
  | { type: 'MAKE_INVESTMENT' }
  | { type: 'ADD_REFERRAL' }
  | { type: 'UPDATE_STREAK' }
  | { type: 'COMPLETE_LEARNING_MODULE'; moduleId: string }
  | { type: 'LIST_PROPERTY'; value: number }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievement: Achievement }
  | { type: 'CLEAR_CONFETTI' }
  | { type: 'LOAD_USER_DATA'; data: UserStats }

const initialState: GamificationState = {
  level: 'explorer',
  totalPoints: 0,
  streak: 1,
  propertiesViewed: 0,
  propertiesLiked: 0,
  propertiesShared: 0,
  investmentsMade: 0,
  referralsCount: 0,
  achievements: [],
  lastActivity: new Date(),
  showConfetti: false,
  recentAchievements: []
}

function gamificationReducer(state: GamificationState, action: GamificationAction): GamificationState {
  switch (action.type) {
    case 'VIEW_PROPERTY':
      return {
        ...state,
        propertiesViewed: state.propertiesViewed + 1,
        totalPoints: state.totalPoints + 5,
        lastActivity: new Date()
      }

    case 'LIKE_PROPERTY':
      return {
        ...state,
        propertiesLiked: state.propertiesLiked + 1,
        totalPoints: state.totalPoints + 10,
        lastActivity: new Date()
      }

    case 'SHARE_PROPERTY':
      return {
        ...state,
        propertiesShared: state.propertiesShared + 1,
        totalPoints: state.totalPoints + 25,
        lastActivity: new Date()
      }

    case 'MAKE_INVESTMENT':
      return {
        ...state,
        investmentsMade: state.investmentsMade + 1,
        totalPoints: state.totalPoints + 500,
        lastActivity: new Date()
      }

    case 'ADD_REFERRAL':
      return {
        ...state,
        referralsCount: state.referralsCount + 1,
        totalPoints: state.totalPoints + 100,
        lastActivity: new Date()
      }

    case 'UPDATE_STREAK':
      return {
        ...state,
        streak: state.streak + 1,
        totalPoints: state.totalPoints + (state.streak * 2),
        lastActivity: new Date()
      }

    case 'COMPLETE_LEARNING_MODULE':
      return {
        ...state,
        totalPoints: state.totalPoints + 250,
        lastActivity: new Date()
      }

    case 'LIST_PROPERTY':
      const bonusPoints = action.value >= 1000000 ? 1000 : action.value >= 500000 ? 500 : 200
      return {
        ...state,
        totalPoints: state.totalPoints + bonusPoints,
        lastActivity: new Date()
      }

    case 'UNLOCK_ACHIEVEMENT':
      const existingAchievement = state.achievements.find(a => a.id === action.achievement.id)
      if (existingAchievement) return state

      return {
        ...state,
        achievements: [...state.achievements, { ...action.achievement, unlockedAt: new Date() }],
        totalPoints: state.totalPoints + action.achievement.points,
        showConfetti: true,
        recentAchievements: [action.achievement, ...state.recentAchievements.slice(0, 4)]
      }

    case 'CLEAR_CONFETTI':
      return {
        ...state,
        showConfetti: false
      }

    case 'LOAD_USER_DATA':
      return {
        ...state,
        ...action.data,
        level: calculateLevel(action.data.totalPoints)
      }

    default:
      return state
  }
}

const GamificationContext = createContext<{
  state: GamificationState
  dispatch: React.Dispatch<GamificationAction>
  viewProperty: () => void
  likeProperty: () => void
  shareProperty: () => void
  makeInvestment: () => void
  addReferral: () => void
  updateStreak: () => void
  completeLearningModule: (moduleId: string) => void
  listProperty: (value: number) => void
  getLevelProgress: () => number
  checkForNewAchievements: () => void
}>({
  state: initialState,
  dispatch: () => {},
  viewProperty: () => {},
  likeProperty: () => {},
  shareProperty: () => {},
  makeInvestment: () => {},
  addReferral: () => {},
  updateStreak: () => {},
  completeLearningModule: () => {},
  listProperty: () => {},
  getLevelProgress: () => 0,
  checkForNewAchievements: () => {}
})

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gamificationReducer, initialState)

  // Load user data on mount (in real app, this would come from API/localStorage)
  useEffect(() => {
    const savedData = localStorage.getItem('meridian-user-stats')
    if (savedData) {
      try {
        const userData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_USER_DATA', data: userData })
      } catch (error) {
        console.warn('Failed to load user data from localStorage', error)
      }
    }
  }, [])

  // Save user data whenever state changes
  useEffect(() => {
    const { showConfetti, recentAchievements, ...saveData } = state
    localStorage.setItem('meridian-user-stats', JSON.stringify(saveData))
  }, [state])

  // Clear confetti after 5 seconds
  useEffect(() => {
    if (state.showConfetti) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_CONFETTI' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.showConfetti])

  const checkForNewAchievements = useCallback(() => {
    ACHIEVEMENTS.forEach(achievement => {
      const alreadyUnlocked = state.achievements.some(a => a.id === achievement.id)
      if (alreadyUnlocked) return

      const { completed } = checkAchievementProgress(achievement, state)
      if (completed) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievement })
        
        // Show achievement toast
        toast.custom((t) => (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-lg max-w-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-bold">¡Logro Desbloqueado!</div>
                <div className="text-sm opacity-90">{achievement.titleES}</div>
                <div className="text-xs opacity-75">+{achievement.points} puntos {getRandomCelebration()}</div>
              </div>
            </div>
          </motion.div>
        ), {
          duration: 6000,
          position: 'top-center'
        })
      }
    })
  }, [state])

  // Check for achievements whenever relevant stats change
  useEffect(() => {
    checkForNewAchievements()
  }, [
    state.propertiesViewed,
    state.propertiesLiked,
    state.propertiesShared,
    state.investmentsMade,
    state.referralsCount,
    state.streak,
    checkForNewAchievements
  ])

  const viewProperty = useCallback(() => {
    dispatch({ type: 'VIEW_PROPERTY' })
  }, [])

  const likeProperty = useCallback(() => {
    dispatch({ type: 'LIKE_PROPERTY' })
  }, [])

  const shareProperty = useCallback(() => {
    dispatch({ type: 'SHARE_PROPERTY' })
  }, [])

  const makeInvestment = useCallback(() => {
    dispatch({ type: 'MAKE_INVESTMENT' })
  }, [])

  const addReferral = useCallback(() => {
    dispatch({ type: 'ADD_REFERRAL' })
  }, [])

  const updateStreak = useCallback(() => {
    dispatch({ type: 'UPDATE_STREAK' })
  }, [])

  const completeLearningModule = useCallback((moduleId: string) => {
    dispatch({ type: 'COMPLETE_LEARNING_MODULE', moduleId })
  }, [])

  const listProperty = useCallback((value: number) => {
    dispatch({ type: 'LIST_PROPERTY', value })
  }, [])

  const getLevelProgress = useCallback(() => {
    return calculateLevelProgress(state.totalPoints, state.level)
  }, [state.totalPoints, state.level])

  const value = {
    state,
    dispatch,
    viewProperty,
    likeProperty,
    shareProperty,
    makeInvestment,
    addReferral,
    updateStreak,
    completeLearningModule,
    listProperty,
    getLevelProgress,
    checkForNewAchievements
  }

  return (
    <GamificationContext.Provider value={value}>
      {children}
      {state.showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <ConfettiExplosion
            particleCount={200}
            duration={3000}
            force={0.8}
            particleSize={12}
            width={1600}
          />
        </div>
      )}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider')
  }
  return context
}

// Achievement Notification Component
export function AchievementNotification({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed top-20 right-4 z-50 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 text-white p-4 rounded-xl shadow-2xl max-w-sm border border-yellow-300"
    >
      <div className="flex items-center space-x-3">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 2 }}
          className="text-3xl"
        >
          {achievement.icon}
        </motion.div>
        <div className="flex-1">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="font-bold text-lg"
          >
            ¡Logro Desbloqueado!
          </motion.div>
          <div className="text-yellow-100">{achievement.titleES}</div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm font-bold text-yellow-200"
          >
            +{formatPoints(achievement.points)} puntos {getRandomCelebration()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}