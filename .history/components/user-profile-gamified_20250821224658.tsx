"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Gift, 
  TrendingUp, 
  Flame,
  Crown,
  Zap,
  Target,
  Award,
  Coins
} from 'lucide-react'
import { useGamification } from '@/lib/gamification-context'
import { 
  LEVEL_BENEFITS, 
  REWARDS_CATALOG, 
  formatPoints, 
  getNextLevelThreshold,
  calculateLevelProgress 
} from '@/lib/gamification'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@radix-ui/react-progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const LEVEL_COLORS = {
  explorer: 'from-slate-500 to-slate-600',
  investor: 'from-blue-500 to-blue-600', 
  expert: 'from-purple-500 to-purple-600',
  mogul: 'from-amber-500 to-amber-600',
  legend: 'from-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
}

const LEVEL_ICONS = {
  explorer: '🔍',
  investor: '💰',
  expert: '🎯',
  mogul: '👑',
  legend: '⚡'
}

export function UserProfileGamified() {
  const { state, getLevelProgress } = useGamification()
  const [selectedTab, setSelectedTab] = useState('achievements')
  
  const levelProgress = getLevelProgress()
  const nextLevelThreshold = getNextLevelThreshold(state.level)
  const pointsToNextLevel = nextLevelThreshold - state.totalPoints

  const rarityColors = {
    common: 'border-gray-400 bg-gray-50',
    rare: 'border-blue-400 bg-blue-50',
    epic: 'border-purple-400 bg-purple-50',
    legendary: 'border-yellow-400 bg-yellow-50 shadow-lg'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-20 h-20 rounded-full bg-gradient-to-r ${LEVEL_COLORS[state.level]} flex items-center justify-center text-3xl font-bold shadow-lg`}
            >
              {LEVEL_ICONS[state.level]}
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold capitalize">Inversionista {state.level}</h1>
              <p className="text-blue-200 text-lg">{formatPoints(state.totalPoints)} puntos</p>
              <div className="flex items-center space-x-2 mt-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-orange-300">{state.streak} días de racha</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2 text-amber-300">
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Nivel {state.level}</span>
            </div>
            {state.level !== 'legend' && (
              <div className="text-right text-sm">
                <p className="text-blue-200">Siguiente nivel: {pointsToNextLevel} puntos</p>
                <div className="w-48 bg-slate-700 rounded-full h-2 mt-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Propiedades Vistas', value: state.propertiesViewed, icon: '👁️' },
          { label: 'Propiedades Guardadas', value: state.propertiesLiked, icon: '❤️' },
          { label: 'Compartidas', value: state.propertiesShared, icon: '📤' },
          { label: 'Referencias', value: state.referralsCount, icon: '👥' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs for Achievements, Rewards, etc. */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Logros</span>
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center space-x-2">
            <Gift className="h-4 w-4" />
            <span>Recompensas</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Beneficios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 ${rarityColors[achievement.rarity]}`}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="text-3xl"
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-800">{achievement.titleES}</h3>
                      <Badge variant={achievement.rarity === 'legendary' ? 'default' : 'secondary'}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{achievement.descriptionES}</p>
                    <div className="flex items-center space-x-2">
                      <Coins className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-semibold text-amber-600">
                        +{formatPoints(achievement.points)} puntos
                      </span>
                      {achievement.unlockedAt && (
                        <span className="text-xs text-slate-500">
                          Desbloqueado {achievement.unlockedAt.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {state.achievements.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl mb-2">¡Comienza tu aventura!</p>
              <p>Explora propiedades para desbloquear tu primer logro</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REWARDS_CATALOG.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-1">{reward.titleES}</h3>
                    <p className="text-sm text-slate-600 mb-3">{reward.descriptionES}</p>
                    <div className="flex items-center space-x-2">
                      <Coins className="h-4 w-4 text-amber-500" />
                      <span className="font-semibold text-amber-600">{reward.cost} puntos</span>
                    </div>
                  </div>
                  <Badge variant={reward.available ? 'default' : 'secondary'}>
                    {reward.available ? 'Disponible' : 'Agotado'}
                  </Badge>
                </div>
                
                <Button 
                  className="w-full"
                  disabled={state.totalPoints < reward.cost || !reward.available}
                  variant={state.totalPoints >= reward.cost ? 'default' : 'outline'}
                >
                  {state.totalPoints >= reward.cost ? 'Canjear' : `Faltan ${reward.cost - state.totalPoints} puntos`}
                </Button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <Crown className="h-6 w-6 text-amber-500 mr-2" />
              Beneficios del Nivel {state.level}
            </h3>
            <div className="space-y-3">
              {LEVEL_BENEFITS[state.level]?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-slate-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress to next level */}
          {state.level !== 'legend' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200"
            >
              <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 text-amber-500 mr-2" />
                Progreso al Siguiente Nivel
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso: {levelProgress.toFixed(1)}%</span>
                  <span>{pointsToNextLevel} puntos restantes</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}