"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Eye, 
  Camera, 
  Monitor, 
  Glasses,
  Play,
  Sparkles,
  Zap,
  Rocket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InteractivePropertyExploration } from './interactive-property-exploration'
import { toast } from 'react-hot-toast'

interface PropertyExplorationTriggerProps {
  className?: string
}

export function PropertyExplorationTrigger({ className = '' }: PropertyExplorationTriggerProps) {
  const [showExploration, setShowExploration] = useState(false)

  const handleLaunchExploration = () => {
    setShowExploration(true)
    toast.success('¡Iniciando exploración inmersiva! 🚀', { 
      icon: '🎯',
      duration: 3000 
    })
  }

  return (
    <>
      <motion.div
        className={`relative ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-purple-500/20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-amber-600/10" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-xl" />
          
          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-purple-600 rounded-full mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Eye className="h-8 w-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                Exploración Inmersiva
              </h3>
              <p className="text-slate-300 max-w-md mx-auto">
                Descubre propiedades con tecnología de vanguardia: 3D, AR y más
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <motion.div
                className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Monitor className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm">Tours 3D</h4>
                <p className="text-slate-400 text-xs">Recorridos virtuales interactivos</p>
              </motion.div>

              <motion.div
                className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Camera className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm">Realidad AR</h4>
                <p className="text-slate-400 text-xs">Ve propiedades en tu entorno</p>
              </motion.div>

              <motion.div
                className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <VrIcon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm">Experiencia VR</h4>
                <p className="text-slate-400 text-xs">Inmersión total (próximamente)</p>
              </motion.div>
            </div>

            {/* Innovation Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                Tecnología Avanzada
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <Zap className="h-3 w-3 mr-1" />
                Experiencia Única
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Rocket className="h-3 w-3 mr-1" />
                Innovación RD
              </Badge>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleLaunchExploration}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Iniciar Exploración
                </Button>
              </motion.div>
              
              <p className="text-slate-400 text-sm mt-3">
                Disponible en dispositivos móviles y desktop
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">50+</div>
                <div className="text-slate-400 text-xs">Propiedades 3D</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">AR</div>
                <div className="text-slate-400 text-xs">Compatibilidad</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">4K</div>
                <div className="text-slate-400 text-xs">Ultra HD</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Exploration Interface */}
      <InteractivePropertyExploration
        isOpen={showExploration}
        onClose={() => setShowExploration(false)}
      />
    </>
  )
}