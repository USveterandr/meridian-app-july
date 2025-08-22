"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  X, 
  TrendingUp, 
  Heart, 
  Zap, 
  Gift, 
  Trophy, 
  Target,
  DollarSign,
  Users,
  Star,
  Clock,
  Sparkles,
  Flame
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'
import CountUp from 'react-countup'

type NotificationType = 
  | 'achievement' 
  | 'property_alert' 
  | 'market_update' 
  | 'engagement_hook' 
  | 'social_activity'
  | 'investment_opportunity'
  | 'milestone'
  | 'daily_bonus'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  icon: React.ReactNode
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
  urgency: 'low' | 'medium' | 'high'
  points?: number
}

interface EngagementHook {
  id: string
  trigger: string
  message: string
  reward: number
  frequency: number // minutes
}

const ENGAGEMENT_HOOKS: EngagementHook[] = [
  {
    id: 'daily_login',
    trigger: 'daily_check',
    message: '¡Vuelve mañana para tu bonus diario! 🎁',
    reward: 50,
    frequency: 1440 // 24 hours
  },
  {
    id: 'property_reminder',
    trigger: 'idle_time',
    message: 'Hay nuevas propiedades esperándote 🏠',
    reward: 10,
    frequency: 30
  },
  {
    id: 'streak_reminder',
    trigger: 'streak_break',
    message: '¡No pierdas tu racha! Explora una propiedad hoy 🔥',
    reward: 25,
    frequency: 60
  },
  {
    id: 'achievement_close',
    trigger: 'near_achievement',
    message: 'Solo te faltan 2 propiedades más para tu próximo logro 🏆',
    reward: 0,
    frequency: 15
  }
]

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'investment_opportunity',
    title: '🚨 Oportunidad Caliente',
    message: 'Nueva villa en Cap Cana con 24% ROI disponible',
    icon: <Flame className="h-5 w-5 text-red-400" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    urgency: 'high',
    points: 100,
    action: {
      label: 'Ver Propiedad',
      onClick: () => toast('Redirigiendo a la propiedad...', { icon: '🏠' })
    }
  },
  {
    id: '2',
    type: 'achievement',
    title: '🏆 ¡Nuevo Logro!',
    message: 'Desbloqueaste "Explorador Activo" - 10 propiedades vistas',
    icon: <Trophy className="h-5 w-5 text-amber-400" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    urgency: 'medium',
    points: 200
  },
  {
    id: '3',
    type: 'market_update',
    title: '📈 Actualización del Mercado',
    message: 'Los precios en Punta Cana subieron 8% este mes',
    icon: <TrendingUp className="h-5 w-5 text-green-400" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: true,
    urgency: 'medium'
  },
  {
    id: '4',
    type: 'social_activity',
    title: '❤️ Actividad Social',
    message: 'A 15 personas les gustó la propiedad que compartiste',
    icon: <Heart className="h-5 w-5 text-pink-400" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    urgency: 'low',
    points: 50
  },
  {
    id: '5',
    type: 'daily_bonus',
    title: '🎁 Bonus Diario',
    message: '¡Reclamaste tu bonus de 100 puntos por 7 días consecutivos!',
    icon: <Gift className="h-5 w-5 text-purple-400" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    urgency: 'low',
    points: 100
  }
]

export function NotificationCenter() {
  // const { state, completeExploration } = useGamification() // Temporarily disabled
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS)
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)
  
  // Real-time engagement hooks
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []
    
    // Set up engagement hook timers
    ENGAGEMENT_HOOKS.forEach(hook => {
      const interval = setInterval(() => {
        generateEngagementNotification(hook)
      }, hook.frequency * 60 * 1000)
      
      intervals.push(interval)
    })
    
    return () => intervals.forEach(clearInterval)
  }, [])

  // Daily login bonus
  useEffect(() => {
    const lastLogin = localStorage.getItem('lastLogin')
    const today = new Date().toDateString()
    
    if (lastLogin !== today) {
      localStorage.setItem('lastLogin', today)
      
      setTimeout(() => {
        addNotification({
          id: Date.now().toString(),
          type: 'daily_bonus',
          title: '🎉 ¡Bonus de Entrada!',
          message: `¡Ganaste 50 puntos por iniciar sesión hoy!`,
          icon: <Sparkles className="h-5 w-5 text-amber-400" />,
          timestamp: new Date(),
          read: false,
          urgency: 'medium',
          points: 50
        })
      }, 2000)
    }
  }, [])

  // Random property alerts
  useEffect(() => {
    const propertyAlerts = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 2 minutes
        generatePropertyAlert()
      }
    }, 2 * 60 * 1000)
    
    return () => clearInterval(propertyAlerts)
  }, [])

  const generateEngagementNotification = (hook: EngagementHook) => {
    if (document.visibilityState === 'visible') return // Don't show if user is active
    
    addNotification({
      id: Date.now().toString(),
      type: 'engagement_hook',
      title: '🎯 ¡Te Extrañamos!',
      message: hook.message,
      icon: <Zap className="h-5 w-5 text-blue-400" />,
      timestamp: new Date(),
      read: false,
      urgency: 'medium',
      points: hook.reward
    })
  }

  const generatePropertyAlert = () => {
    const properties = [
      'Penthouse en Punta Cana con vista al mar',
      'Villa moderna en Cap Cana',
      'Apartamento de lujo en Santo Domingo',
      'Casa de playa en Samaná'
    ]
    
    const roi = (Math.random() * 15 + 10).toFixed(1)
    const property = properties[Math.floor(Math.random() * properties.length)]
    
    addNotification({
      id: Date.now().toString(),
      type: 'property_alert',
      title: '🚀 Nueva Oportunidad',
      message: `${property} - ROI ${roi}%`,
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      timestamp: new Date(),
      read: false,
      urgency: 'high',
      points: 25,
      action: {
        label: 'Explorar',
        onClick: () => {
          // completeExploration() // Temporarily disabled
          toast(`¡+25 puntos! Explorando ${property}`, { icon: '🎯' })
        }
      }
    })
  }

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev])
    setUnreadCount(prev => prev + 1)
    
    // Show toast for high priority notifications
    if (notification.urgency === 'high') {
      toast(notification.message, {
        icon: '🚨',
        duration: 5000,
        style: {
          background: '#ef4444',
          color: 'white'
        }
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    
    if (!notifications.find(n => n.id === id)?.read) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id)
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
    
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'Ahora'
    if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)}h`
    return `Hace ${Math.floor(seconds / 86400)}d`
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-l-red-500 bg-red-500/10'
      case 'medium': return 'border-l-amber-500 bg-amber-500/10'
      case 'low': return 'border-l-blue-500 bg-blue-500/10'
      default: return 'border-l-slate-500 bg-slate-500/10'
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <Bell className="h-6 w-6 text-slate-700" />
        
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-slate-200 z-50 max-h-96 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-slate-700" />
                <h3 className="font-semibold text-slate-900">Notificaciones</h3>
                <Badge variant="secondary">{notifications.length}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Marcar todas
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Bell className="h-12 w-12 mx-auto text-slate-300 mb-2" />
                  <p>No hay notificaciones</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 border-l-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                        getUrgencyColor(notification.urgency)
                      } ${!notification.read ? 'bg-blue-50/50' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              !notification.read ? 'text-slate-900' : 'text-slate-700'
                            }`}>
                              {notification.title}
                            </p>
                            
                            <div className="flex items-center space-x-2">
                              {notification.points && (
                                <Badge variant="outline" className="text-xs">
                                  +{notification.points}
                                </Badge>
                              )}
                              
                              <span className="text-xs text-slate-500">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className={`text-sm mt-1 ${
                            !notification.read ? 'text-slate-700' : 'text-slate-500'
                          }`}>
                            {notification.message}
                          </p>
                          
                          {notification.action && (
                            <Button
                              size="sm"
                              className="mt-2 h-8"
                              onClick={(e) => {
                                e.stopPropagation()
                                notification.action?.onClick()
                                markAsRead(notification.id)
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Target className="h-4 w-4" />
                  <span>Puntos Totales:</span>
                  <span className="font-bold text-amber-600">
                    <CountUp end={0} duration={1} />
                  </span>
                </div>
                
                <Badge className="bg-purple-100 text-purple-700">
                  Nivel 1
                </Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}