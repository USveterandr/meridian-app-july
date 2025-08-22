/**
 * Gamification System for Meridian Real Estate Platform
 * Inspired by TikTok engagement mechanics for Dominican Republic market
 */

export type UserLevel = 'explorer' | 'investor' | 'expert' | 'mogul' | 'legend'

export interface Achievement {
  id: string
  title: string
  titleES: string
  description: string
  descriptionES: string
  icon: string
  points: number
  category: 'exploration' | 'investment' | 'social' | 'learning' | 'milestone'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

export interface UserStats {
  level: UserLevel
  totalPoints: number
  streak: number
  propertiesViewed: number
  propertiesLiked: number
  propertiesShared: number
  investmentsMade: number
  referralsCount: number
  achievements: Achievement[]
  lastActivity: Date
}

export interface Reward {
  id: string
  type: 'discount' | 'premium_feature' | 'exclusive_access' | 'badge' | 'points'
  title: string
  titleES: string
  description: string
  descriptionES: string
  value: number | string
  cost: number
  available: boolean
  expiresAt?: Date
}

// Dominican Republic specific achievements
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_property_view',
    title: 'Property Explorer',
    titleES: 'Explorador de Propiedades',
    description: 'Viewed your first property',
    descriptionES: 'Viste tu primera propiedad',
    icon: '🏠',
    points: 10,
    category: 'exploration',
    rarity: 'common',
    maxProgress: 1
  },
  {
    id: 'dominican_dreamer',
    title: 'Dominican Dreamer',
    titleES: 'Soñador Dominicano',
    description: 'Viewed 10 Dominican properties',
    descriptionES: 'Viste 10 propiedades dominicanas',
    icon: '🇩🇴',
    points: 50,
    category: 'exploration',
    rarity: 'common',
    maxProgress: 10
  },
  {
    id: 'coastal_lover',
    title: 'Coastal Lover',
    titleES: 'Amante de la Costa',
    description: 'Liked 5 beachfront properties',
    descriptionES: 'Te gustaron 5 propiedades frente al mar',
    icon: '🏖️',
    points: 75,
    category: 'exploration',
    rarity: 'rare',
    maxProgress: 5
  },
  {
    id: 'punta_cana_collector',
    title: 'Punta Cana Collector',
    titleES: 'Coleccionista de Punta Cana',
    description: 'Saved 3 Punta Cana properties',
    descriptionES: 'Guardaste 3 propiedades de Punta Cana',
    icon: '🌴',
    points: 100,
    category: 'exploration',
    rarity: 'rare',
    maxProgress: 3
  },
  {
    id: 'first_investment',
    title: 'First Investor',
    titleES: 'Primer Inversionista',
    description: 'Made your first investment inquiry',
    descriptionES: 'Hiciste tu primera consulta de inversión',
    icon: '💰',
    points: 200,
    category: 'investment',
    rarity: 'epic',
    maxProgress: 1
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    titleES: 'Mariposa Social',
    description: 'Shared 5 properties with friends',
    descriptionES: 'Compartiste 5 propiedades con amigos',
    icon: '🦋',
    points: 150,
    category: 'social',
    rarity: 'rare',
    maxProgress: 5
  },
  {
    id: 'tax_savvy',
    title: 'Tax Savvy',
    titleES: 'Experto en Impuestos',
    description: 'Completed tax incentive learning module',
    descriptionES: 'Completaste el módulo de incentivos fiscales',
    icon: '📊',
    points: 250,
    category: 'learning',
    rarity: 'epic',
    maxProgress: 1
  },
  {
    id: 'referral_master',
    title: 'Referral Master',
    titleES: 'Maestro de Referencias',
    description: 'Referred 10 friends to the platform',
    descriptionES: 'Referiste 10 amigos a la plataforma',
    icon: '👥',
    points: 500,
    category: 'social',
    rarity: 'legendary',
    maxProgress: 10
  },
  {
    id: 'property_mogul',
    title: 'Property Mogul',
    titleES: 'Magnate Inmobiliario',
    description: 'Listed a property worth over $1M',
    descriptionES: 'Listaste una propiedad de más de $1M',
    icon: '👑',
    points: 1000,
    category: 'milestone',
    rarity: 'legendary',
    maxProgress: 1
  },
  {
    id: 'streak_legend',
    title: 'Streak Legend',
    titleES: 'Leyenda de Racha',
    description: 'Visited the app 30 days in a row',
    descriptionES: 'Visitaste la app 30 días seguidos',
    icon: '🔥',
    points: 750,
    category: 'milestone',
    rarity: 'legendary',
    maxProgress: 30
  }
]

export const LEVEL_THRESHOLDS = {
  explorer: 0,
  investor: 500,
  expert: 2000,
  mogul: 5000,
  legend: 10000
}

export const LEVEL_BENEFITS = {
  explorer: ['Basic property search', 'Standard listings'],
  investor: ['Priority support', 'Investment calculator', 'Market insights'],
  expert: ['Exclusive properties', 'Direct agent contact', 'Investment webinars'],
  mogul: ['VIP properties', 'Personal advisor', 'Early access features'],
  legend: ['Ultra-luxury properties', 'Concierge service', 'Custom investment strategies']
}

export const REWARDS_CATALOG: Reward[] = [
  {
    id: 'commission_discount_1',
    type: 'discount',
    title: '0.5% Commission Discount',
    titleES: '0.5% Descuento en Comisión',
    description: 'Reduce your commission by 0.5%',
    descriptionES: 'Reduce tu comisión en 0.5%',
    value: '0.5%',
    cost: 1000,
    available: true
  },
  {
    id: 'premium_analytics',
    type: 'premium_feature',
    title: 'Premium Analytics',
    titleES: 'Analíticas Premium',
    description: 'Access detailed property analytics for 30 days',
    descriptionES: 'Accede a analíticas detalladas por 30 días',
    value: '30 days',
    cost: 500,
    available: true
  },
  {
    id: 'vip_support',
    type: 'premium_feature',
    title: 'VIP Support',
    titleES: 'Soporte VIP',
    description: 'Priority customer support for 3 months',
    descriptionES: 'Soporte prioritario por 3 meses',
    value: '3 months',
    cost: 750,
    available: true
  },
  {
    id: 'exclusive_listings',
    type: 'exclusive_access',
    title: 'Exclusive Listings Access',
    titleES: 'Acceso a Listados Exclusivos',
    description: 'Access to off-market properties for 60 days',
    descriptionES: 'Acceso a propiedades exclusivas por 60 días',
    value: '60 days',
    cost: 1500,
    available: true
  }
]

export function calculateLevel(points: number): UserLevel {
  if (points >= LEVEL_THRESHOLDS.legend) return 'legend'
  if (points >= LEVEL_THRESHOLDS.mogul) return 'mogul'
  if (points >= LEVEL_THRESHOLDS.expert) return 'expert'
  if (points >= LEVEL_THRESHOLDS.investor) return 'investor'
  return 'explorer'
}

export function getNextLevelThreshold(currentLevel: UserLevel): number {
  switch (currentLevel) {
    case 'explorer': return LEVEL_THRESHOLDS.investor
    case 'investor': return LEVEL_THRESHOLDS.expert
    case 'expert': return LEVEL_THRESHOLDS.mogul
    case 'mogul': return LEVEL_THRESHOLDS.legend
    case 'legend': return LEVEL_THRESHOLDS.legend
    default: return LEVEL_THRESHOLDS.investor
  }
}

export function calculateLevelProgress(points: number, level: UserLevel): number {
  const currentThreshold = LEVEL_THRESHOLDS[level]
  const nextThreshold = getNextLevelThreshold(level)
  
  if (level === 'legend') return 100
  
  const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  return Math.min(100, Math.max(0, progress))
}

export function checkAchievementProgress(
  achievement: Achievement, 
  userStats: UserStats
): { completed: boolean; progress: number } {
  let progress = 0
  let completed = false

  switch (achievement.id) {
    case 'first_property_view':
      progress = Math.min(1, userStats.propertiesViewed)
      completed = userStats.propertiesViewed >= 1
      break
    case 'dominican_dreamer':
      progress = Math.min(10, userStats.propertiesViewed)
      completed = userStats.propertiesViewed >= 10
      break
    case 'coastal_lover':
      progress = Math.min(5, userStats.propertiesLiked)
      completed = userStats.propertiesLiked >= 5
      break
    case 'punta_cana_collector':
      // This would need additional tracking for saved properties
      progress = 0
      completed = false
      break
    case 'first_investment':
      progress = Math.min(1, userStats.investmentsMade)
      completed = userStats.investmentsMade >= 1
      break
    case 'social_butterfly':
      progress = Math.min(5, userStats.propertiesShared)
      completed = userStats.propertiesShared >= 5
      break
    case 'referral_master':
      progress = Math.min(10, userStats.referralsCount)
      completed = userStats.referralsCount >= 10
      break
    case 'streak_legend':
      progress = Math.min(30, userStats.streak)
      completed = userStats.streak >= 30
      break
  }

  return { completed, progress }
}

export function getRandomCelebration(): string {
  const celebrations = ['🎉', '✨', '🚀', '💫', '🌟', '🎊', '🔥', '💎']
  return celebrations[Math.floor(Math.random() * celebrations.length)]
}

export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`
  }
  return points.toString()
}