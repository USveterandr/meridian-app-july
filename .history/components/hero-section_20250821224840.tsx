"use client"

import { Button } from "@/components/ui/button"
import { Search, DollarSign, Shield, Camera, Play, Heart, Share2, TrendingUp } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useIntersectionObserver } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
import CountUp from "react-countup"
import { useState, useEffect } from "react"
import { useGamification } from "@/lib/gamification-context"

export function HeroSection() {
  const { scrollY } = useScroll()
  const { viewProperty, state } = useGamification()
  const [isPlaying, setIsPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: false
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '50%'])
  const contentY = useTransform(scrollY, [0, 500], ['0%', '-20%'])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  // Floating animations
  const floatingAnimation = useSpring({
    transform: inView ? 'translateY(0px)' : 'translateY(20px)',
    opacity: inView ? 1 : 0,
    config: { tension: 300, friction: 10 }
  })

  const featuredProperties = [
    {
      image: '/placeholder.svg?height=600&width=400',
      title: 'Penthouse Punta Cana',
      price: '$2.5M',
      location: 'Punta Cana, DR',
      likes: 1247,
      views: 15632
    },
    {
      image: '/placeholder.svg?height=600&width=400', 
      title: 'Villa Cap Cana',
      price: '$4.2M',
      location: 'Cap Cana, DR',
      likes: 2156,
      views: 28941
    },
    {
      image: '/placeholder.svg?height=600&width=400',
      title: 'Apartamento Malecón',
      price: '$850K',
      location: 'Santo Domingo, DR', 
      likes: 892,
      views: 12403
    }
  ]

  useEffect(() => {
    if (inView) {
      viewProperty()
    }
  }, [inView, viewProperty])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % featuredProperties.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideo}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={featuredProperties[currentVideo].image}
              alt={`Dominican Republic Property ${currentVideo + 1}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>

      {/* TikTok-style Content */}
      <motion.div 
        className="relative z-10 w-full max-w-md mx-auto px-4 h-screen flex flex-col justify-center"
        style={{ y: contentY, opacity }}
      >
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-4 right-4 flex justify-between items-center z-20"
        >
          <div className="flex items-center space-x-2">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-r from-amber-400 to-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-sm font-bold">M</span>
            </motion.div>
            <span className="text-white font-semibold">Meridian DR</span>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center space-x-1"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm">En Vivo</span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <animated.div style={floatingAnimation} className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
              animate={{
                textShadow: [
                  "0 0 10px #fbbf24",
                  "0 0 20px #f59e0b", 
                  "0 0 10px #fbbf24"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Invierte en
              <motion.span 
                className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Lujo Dominicano
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-200 mb-6"
            >
              🇩🇴 Solo <span className="text-amber-400 font-bold">3% comisión</span>
              <br />Propiedades verificadas • ROI garantizado
            </motion.p>
          </motion.div>

          {/* Property Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{featuredProperties[currentVideo].title}</h3>
                <p className="text-slate-300 text-sm">{featuredProperties[currentVideo].location}</p>
              </div>
              <div className="text-right">
                <div className="text-amber-400 font-bold text-xl">{featuredProperties[currentVideo].price}</div>
                <div className="text-green-400 text-sm">+24% ROI</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-white/80">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <CountUp end={featuredProperties[currentVideo].likes} duration={2} />
                </div>
                <div className="flex items-center space-x-1">
                  <Play className="h-4 w-4" />
                  <CountUp end={featuredProperties[currentVideo].views} duration={2} />
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
              </motion.button>
            </div>
          </motion.div>
        </animated.div>

        {/* Bottom Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-20 left-4 right-4 z-20"
        >
          <div className="flex flex-col space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Ver Propiedades</span>
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border-2 border-white/30 text-white font-bold py-4 rounded-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Calcular ROI</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Side Actions */}
        <div className="absolute right-4 bottom-32 flex flex-col space-y-4 z-20">
          {[
            { icon: Heart, count: '2.1K', active: liked },
            { icon: Share2, count: '847' },
            { icon: Camera, count: 'AR' }
          ].map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex flex-col items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <action.icon className={`h-5 w-5 ${action.active ? 'text-red-500 fill-current' : ''}`} />
              <span className="text-xs mt-1">{action.count}</span>
            </motion.button>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-20">
          {featuredProperties.map((_, index) => (
            <motion.div
              key={index}
              className={`w-1 h-8 rounded-full transition-all duration-300 ${
                index === currentVideo ? 'bg-white' : 'bg-white/30'
              }`}
              animate={{
                height: index === currentVideo ? 32 : 16
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Gamification Stats Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-20 right-4 bg-black/40 backdrop-blur-xl rounded-xl p-3 text-white text-sm border border-white/20 z-20"
      >
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Nivel {state.level}</span>
        </div>
        <div className="text-amber-400 font-bold">{state.totalPoints} puntos</div>
        <div className="text-xs text-slate-300">Racha: {state.streak} días</div>
      </motion.div>
    </section>
  )
}
