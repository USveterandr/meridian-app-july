"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  Bookmark, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Eye,
  MessageCircle
} from 'lucide-react'
import { useGamification } from '@/lib/gamification-context'
import { useSwipeable } from 'react-swipeable'
import CountUp from 'react-countup'
import Image from 'next/image'

interface Property {
  id: string
  title: string
  titleES: string
  price: number
  priceUSD: number
  location: string
  locationES: string
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  video?: string
  description: string
  descriptionES: string
  agent: {
    name: string
    avatar: string
    verified: boolean
  }
  stats: {
    views: number
    likes: number
    shares: number
    comments: number
  }
  roi: number
  tags: string[]
  isLuxury: boolean
  hasVirtualTour: boolean
  isNew: boolean
}

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse Punta Cana',
    titleES: 'Penthouse de Lujo en Punta Cana',
    price: 185000000, // DOP
    priceUSD: 3200000,
    location: 'Punta Cana, La Altagracia',
    locationES: 'Punta Cana, La Altagracia',
    bedrooms: 4,
    bathrooms: 5,
    area: 450,
    images: ['/placeholder.svg?height=800&width=600'],
    video: '/placeholder-video.mp4',
    description: 'Spectacular oceanfront penthouse with panoramic views',
    descriptionES: 'Espectacular penthouse frente al océano con vistas panorámicas',
    agent: {
      name: 'Maria Rodriguez',
      avatar: '/placeholder.svg?height=100&width=100',
      verified: true
    },
    stats: {
      views: 15420,
      likes: 2847,
      shares: 456,
      comments: 128
    },
    roi: 18.5,
    tags: ['Oceanfront', 'Luxury', 'Investment'],
    isLuxury: true,
    hasVirtualTour: true,
    isNew: true
  },
  {
    id: '2',
    title: 'Modern Villa Cap Cana',
    titleES: 'Villa Moderna en Cap Cana',
    price: 290000000,
    priceUSD: 5200000,
    location: 'Cap Cana, La Altagracia',
    locationES: 'Cap Cana, La Altagracia',
    bedrooms: 6,
    bathrooms: 7,
    area: 680,
    images: ['/placeholder.svg?height=800&width=600'],
    description: 'Contemporary villa with golf course views and private beach access',
    descriptionES: 'Villa contemporánea con vistas al campo de golf y acceso privado a la playa',
    agent: {
      name: 'Carlos Mendez',
      avatar: '/placeholder.svg?height=100&width=100',
      verified: true
    },
    stats: {
      views: 28940,
      likes: 4521,
      shares: 892,
      comments: 276
    },
    roi: 22.3,
    tags: ['Golf', 'Beachfront', 'Luxury'],
    isLuxury: true,
    hasVirtualTour: true,
    isNew: false
  },
  {
    id: '3',
    title: 'Beachfront Condo Bavaro',
    titleES: 'Apartamento Frente al Mar en Bávaro',
    price: 48750000,
    priceUSD: 875000,
    location: 'Bavaro, Punta Cana',
    locationES: 'Bávaro, Punta Cana',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    images: ['/placeholder.svg?height=800&width=600'],
    description: 'Perfect investment condo with guaranteed rental income',
    descriptionES: 'Apartamento de inversión perfecto con ingresos de alquiler garantizados',
    agent: {
      name: 'Ana Jimenez',
      avatar: '/placeholder.svg?height=100&width=100',
      verified: true
    },
    stats: {
      views: 12340,
      likes: 1876,
      shares: 234,
      comments: 89
    },
    roi: 15.8,
    tags: ['Investment', 'Beachfront', 'Rental'],
    isLuxury: false,
    hasVirtualTour: false,
    isNew: true
  }
]

interface PropertyCardProps {
  property: Property
  isActive: boolean
  onLike: () => void
  onShare: () => void
  onSave: () => void
  onContact: () => void
}

function PropertyCard({ property, isActive, onLike, onShare, onSave, onContact }: PropertyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive, isPlaying])

  const handleLike = () => {
    setLiked(!liked)
    onLike()
  }

  const handleSave = () => {
    setSaved(!saved)
    onSave()
  }

  const formatPrice = (price: number, currency: 'DOP' | 'USD' = 'USD') => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(price)
    } else {
      return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP',
        minimumFractionDigits: 0
      }).format(price)
    }
  }

  return (
    <div className=\"relative h-screen w-full bg-black overflow-hidden\">
      {/* Background Media */}
      <div className=\"absolute inset-0\">
        {property.video ? (
          <video
            ref={videoRef}
            className=\"w-full h-full object-cover\"
            loop
            muted={isMuted}
            playsInline
          >
            <source src={property.video} type=\"video/mp4\" />
          </video>
        ) : (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className=\"object-cover\"
          />
        )}
        <div className=\"absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20\" />
      </div>

      {/* Play/Pause Overlay */}
      {property.video && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className=\"absolute inset-0 flex items-center justify-center z-10\"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isPlaying ? 0 : 1 }}
            className=\"w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center\"
          >
            <Play className=\"h-8 w-8 text-white ml-1\" />
          </motion.div>
        </motion.button>
      )}

      {/* Top Header */}
      <div className=\"absolute top-0 left-0 right-0 p-4 z-20\">
        <div className=\"flex items-center justify-between\">
          <div className=\"flex items-center space-x-2\">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: \"linear\" }}
              className=\"w-8 h-8 bg-gradient-to-r from-amber-400 to-red-500 rounded-full flex items-center justify-center\"
            >
              <span className=\"text-white text-sm font-bold\">M</span>
            </motion.div>
            <span className=\"text-white font-semibold text-sm\">meridian_dr</span>
            {property.isNew && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className=\"bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold\"
              >
                NUEVO
              </motion.div>
            )}
          </div>
          
          <div className=\"flex items-center space-x-2\">
            {property.video && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className=\"w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center\"
              >
                {isMuted ? (
                  <VolumeX className=\"h-4 w-4 text-white\" />
                ) : (
                  <Volume2 className=\"h-4 w-4 text-white\" />
                )}
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className=\"w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center\"
            >
              <MoreHorizontal className=\"h-4 w-4 text-white\" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Side Actions */}
      <div className=\"absolute right-4 bottom-20 flex flex-col space-y-4 z-20\">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className=\"flex flex-col items-center\"
        >
          <div className=\"w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center mb-1\">
            <Heart className={`h-6 w-6 ${liked ? 'text-red-500 fill-current' : 'text-white'}`} />
          </div>
          <CountUp 
            end={property.stats.likes + (liked ? 1 : 0)} 
            duration={0.5} 
            className=\"text-white text-xs font-semibold\"
          />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onShare}
          className=\"flex flex-col items-center\"
        >
          <div className=\"w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center mb-1\">
            <Share2 className=\"h-6 w-6 text-white\" />
          </div>
          <span className=\"text-white text-xs font-semibold\">{property.stats.shares}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSave}
          className=\"flex flex-col items-center\"
        >
          <div className=\"w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center mb-1\">
            <Bookmark className={`h-6 w-6 ${saved ? 'text-amber-500 fill-current' : 'text-white'}`} />
          </div>
          <span className=\"text-white text-xs font-semibold\">Guardar</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onContact}
          className=\"flex flex-col items-center\"
        >
          <div className=\"w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center mb-1\">
            <MessageCircle className=\"h-6 w-6 text-white\" />
          </div>
          <span className=\"text-white text-xs font-semibold\">{property.stats.comments}</span>
        </motion.button>
      </div>

      {/* Bottom Content */}
      <div className=\"absolute bottom-0 left-0 right-0 p-4 z-20\">
        {/* Agent Info */}
        <div className=\"flex items-center space-x-3 mb-4\">
          <Image
            src={property.agent.avatar}
            alt={property.agent.name}
            width={40}
            height={40}
            className=\"rounded-full border-2 border-white\"
          />
          <div className=\"flex-1\">
            <div className=\"flex items-center space-x-2\">
              <span className=\"text-white font-semibold\">{property.agent.name}</span>
              {property.agent.verified && (
                <div className=\"w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center\">
                  <span className=\"text-white text-xs\">✓</span>
                </div>
              )}
            </div>
            <span className=\"text-gray-300 text-sm\">Agente Verificado</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className=\"bg-white text-black px-4 py-2 rounded-full font-semibold text-sm\"
          >
            Seguir
          </motion.button>
        </div>

        {/* Property Info */}
        <div className=\"space-y-3\">
          <div>
            <h2 className=\"text-white text-xl font-bold mb-1\">{property.titleES}</h2>
            <div className=\"flex items-center text-gray-300 text-sm mb-2\">
              <MapPin className=\"h-4 w-4 mr-1\" />
              <span>{property.locationES}</span>
            </div>
          </div>

          <div className=\"flex items-center justify-between\">
            <div className=\"flex items-center space-x-4 text-white\">
              <div className=\"flex items-center space-x-1\">
                <Bed className=\"h-4 w-4\" />
                <span className=\"text-sm\">{property.bedrooms}</span>
              </div>
              <div className=\"flex items-center space-x-1\">
                <Bath className=\"h-4 w-4\" />
                <span className=\"text-sm\">{property.bathrooms}</span>
              </div>
              <div className=\"flex items-center space-x-1\">
                <Square className=\"h-4 w-4\" />
                <span className=\"text-sm\">{property.area}m²</span>
              </div>
            </div>
            
            <div className=\"text-right\">
              <div className=\"text-amber-400 font-bold text-xl\">
                {formatPrice(property.priceUSD)}
              </div>
              <div className=\"flex items-center text-green-400 text-sm\">
                <TrendingUp className=\"h-3 w-3 mr-1\" />
                <span>+{property.roi}% ROI</span>
              </div>
            </div>
          </div>

          <p className=\"text-gray-300 text-sm\">{property.descriptionES}</p>

          {/* Tags */}
          <div className=\"flex flex-wrap gap-2\">
            {property.tags.map((tag, index) => (
              <span
                key={index}
                className=\"bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full\"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className=\"absolute top-16 right-4 bg-black/40 backdrop-blur-md rounded-xl p-2 z-20\">
        <div className=\"flex items-center space-x-2 text-white text-xs\">
          <Eye className=\"h-3 w-3\" />
          <CountUp end={property.stats.views} duration={2} />
        </div>
      </div>
    </div>
  )
}

export function PropertySwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [properties, setProperties] = useState(SAMPLE_PROPERTIES)
  const { likeProperty, shareProperty, viewProperty } = useGamification()
  const y = useMotionValue(0)
  const opacity = useTransform(y, [-200, 0, 200], [0.5, 1, 0.5])
  const scale = useTransform(y, [-200, 0, 200], [0.9, 1, 0.9])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    
    if (info.offset.y < -threshold) {
      // Swipe up - next property
      nextProperty()
    } else if (info.offset.y > threshold) {
      // Swipe down - previous property
      previousProperty()
    }
    
    y.set(0)
  }

  const nextProperty = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length)
    viewProperty()
  }

  const previousProperty = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length)
  }

  const swipeHandlers = useSwipeable({
    onSwipedUp: nextProperty,
    onSwipedDown: previousProperty,
    preventScrollOnSwipe: true,
    trackMouse: true
  })

  const handleLike = () => {
    likeProperty()
  }

  const handleShare = () => {
    shareProperty()
  }

  const handleSave = () => {
    // Add save logic
  }

  const handleContact = () => {
    // Add contact logic
  }

  return (
    <div className=\"h-screen w-full overflow-hidden bg-black\" {...swipeHandlers}>
      <motion.div
        drag=\"y\"
        dragConstraints={{ top: -100, bottom: 100 }}
        onDragEnd={handleDragEnd}
        style={{ y, opacity, scale }}
        className=\"h-full w-full\"
      >
        <PropertyCard
          property={properties[currentIndex]}
          isActive={true}
          onLike={handleLike}
          onShare={handleShare}
          onSave={handleSave}
          onContact={handleContact}
        />
      </motion.div>

      {/* Navigation Dots */}
      <div className=\"absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-30\">
        {properties.map((_, index) => (
          <motion.div
            key={index}
            className={`w-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white h-8' : 'bg-white/40 h-4'
            }`}
            animate={{
              height: index === currentIndex ? 32 : 16
            }}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className=\"absolute bottom-32 left-1/2 transform -translate-x-1/2 text-white text-center z-30\"
      >
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className=\"text-sm mb-2\">Desliza para ver más propiedades</div>
          <div className=\"text-2xl\">↕️</div>
        </motion.div>
      </motion.div>
    </div>
  )
}