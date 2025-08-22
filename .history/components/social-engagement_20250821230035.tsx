"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  MessageCircle, 
  Send,
  Users,
  Trophy,
  Gift,
  Coins,
  Star,
  TrendingUp,
  Copy,
  Facebook,
  Instagram,
  Twitter,
  MessageSquare,
  Link2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'
import CountUp from 'react-countup'

interface SocialEngagementProps {
  propertyId: string
  initialLikes: number
  initialShares: number
  initialComments: number
  className?: string
}

interface Comment {
  id: string
  user: string
  avatar: string
  text: string
  timestamp: Date
  likes: number
}

interface ReferralReward {
  type: 'points' | 'badge' | 'discount'
  value: number | string
  description: string
}

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: '1',
    user: 'Maria Rodriguez',
    avatar: '/placeholder.svg?height=40&width=40',
    text: '¡Increíble vista al mar! 😍 Esta propiedad es perfecta para inversión',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 24
  },
  {
    id: '2',
    user: 'Carlos Mendez',
    avatar: '/placeholder.svg?height=40&width=40', 
    text: 'ROI de 18%+ 🚀 Me interesa esta oportunidad',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 15
  },
  {
    id: '3',
    user: 'Ana Jimenez',
    avatar: '/placeholder.svg?height=40&width=40',
    text: 'Cap Cana siempre es una excelente inversión 💎',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    likes: 8
  }
]

const REFERRAL_REWARDS: ReferralReward[] = [
  { type: 'points', value: 500, description: 'Por cada amigo que se registre' },
  { type: 'points', value: 2000, description: 'Cuando tu referido hace su primera inversión' },
  { type: 'discount', value: '0.5%', description: 'Descuento en comisión por cada 5 referidos' },
  { type: 'badge', value: 'Embajador VIP', description: 'Estado especial con 10+ referidos' }
]

export function SocialEngagement({ 
  propertyId, 
  initialLikes, 
  initialShares, 
  initialComments,
  className = ''
}: SocialEngagementProps) {
  const { completeExploration, shareProperty, state } = useGamification()
  
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [shares, setShares] = useState(initialShares)
  const [comments, setComments] = useState(SAMPLE_COMMENTS)
  const [showComments, setShowComments] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    setLiked(!liked)
    setLikes(prev => liked ? prev - 1 : prev + 1)
    
    if (!liked) {
      completeExploration()
      toast('¡+10 puntos por dar like! ❤️', {
        icon: '🎯',
        style: {
          background: '#f59e0b',
          color: 'white'
        }
      })
    }
  }

  const handleShare = (platform?: string) => {
    const url = `https://meridian-rd.com/property/${propertyId}`
    const text = 'Mira esta increíble oportunidad de inversión inmobiliaria en República Dominicana'
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`)
    } else if (platform === 'facebook') {
      window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url)
      toast('¡Enlace copiado! 📋', { icon: '✨' })
    } else {
      if (navigator.share) {
        navigator.share({
          title: 'Meridian República Dominicana',
          text: text,
          url: url
        })
      } else {
        navigator.clipboard.writeText(url)
        toast('¡Enlace copiado! 📋', { icon: '✨' })
      }
    }
    
    setShares(prev => prev + 1)
    shareProperty()
    setShowShareMenu(false)
    
    toast('¡+25 puntos por compartir! 🚀', {
      icon: '🎁',
      style: {
        background: '#8b5cf6',
        color: 'white'
      }
    })
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'Tú',
        avatar: '/placeholder.svg?height=40&width=40',
        text: newComment,
        timestamp: new Date(),
        likes: 0
      }
      
      setComments(prev => [comment, ...prev])
      setNewComment('')
      completeExploration()
      
      toast('¡+15 puntos por comentar! 💬', {
        icon: '🎯',
        style: {
          background: '#10b981',
          color: 'white'
        }
      })
    }
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'hace un momento'
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`
    return `hace ${Math.floor(seconds / 86400)}d`
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Engagement Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex flex-col items-center space-y-1 group"
          >
            <motion.div
              animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
              className={`p-3 rounded-full transition-all ${
                liked 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
                  : 'bg-white/20 text-white hover:bg-red-500/20'
              }`}
            >
              <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
            </motion.div>
            <span className="text-xs text-white/80 font-medium">
              <CountUp end={likes} duration={0.5} />
            </span>
          </motion.button>

          {/* Comments */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center space-y-1 group"
          >
            <div className="p-3 rounded-full bg-white/20 text-white hover:bg-blue-500/20 transition-all">
              <MessageCircle className="h-6 w-6" />
            </div>
            <span className="text-xs text-white/80 font-medium">
              {comments.length}
            </span>
          </motion.button>

          {/* Share */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex flex-col items-center space-y-1 group"
          >
            <div className="p-3 rounded-full bg-white/20 text-white hover:bg-green-500/20 transition-all">
              <Share2 className="h-6 w-6" />
            </div>
            <span className="text-xs text-white/80 font-medium">
              <CountUp end={shares} duration={0.5} />
            </span>
          </motion.button>
        </div>

        {/* Current Points Display */}
        <div className="flex items-center space-x-2 bg-amber-500/20 backdrop-blur-sm rounded-full px-4 py-2">
          <Coins className="h-4 w-4 text-amber-400" />
          <span className="text-amber-400 font-bold text-sm">
            <CountUp end={state.totalPoints} duration={1} />
          </span>
        </div>
      </div>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-black/90 backdrop-blur-sm rounded-2xl p-4"
          >
            <div className="grid grid-cols-4 gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('whatsapp')}
                className="flex flex-col items-center space-y-2 p-4 h-auto text-white hover:bg-green-500/20"
              >
                <Whatsapp className="h-6 w-6 text-green-400" />
                <span className="text-xs">WhatsApp</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center space-y-2 p-4 h-auto text-white hover:bg-blue-500/20"
              >
                <Facebook className="h-6 w-6 text-blue-400" />
                <span className="text-xs">Facebook</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center space-y-2 p-4 h-auto text-white hover:bg-sky-500/20"
              >
                <Twitter className="h-6 w-6 text-sky-400" />
                <span className="text-xs">Twitter</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('copy')}
                className="flex flex-col items-center space-y-2 p-4 h-auto text-white hover:bg-slate-500/20"
              >
                <Copy className="h-6 w-6 text-slate-400" />
                <span className="text-xs">Copiar</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/90 backdrop-blur-sm rounded-2xl p-4 max-h-80 overflow-y-auto space-y-4"
          >
            {/* Comment Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-amber-500"
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              />
              <Button
                onClick={handleComment}
                size="sm"
                className="rounded-full bg-amber-500 hover:bg-amber-600"
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start space-x-3"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium text-sm">{comment.user}</span>
                      <span className="text-white/50 text-xs">{formatTimeAgo(comment.timestamp)}</span>
                    </div>
                    <p className="text-white/80 text-sm mt-1">{comment.text}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-white/50 hover:text-red-400 text-xs flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Referral Rewards Section */}
      <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Gift className="h-5 w-5 text-purple-400" />
          <h3 className="text-white font-bold">Programa de Referidos</h3>
          <Badge className="bg-purple-500">¡Activo!</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {REFERRAL_REWARDS.map((reward, index) => (
            <div key={index} className="text-center p-2 bg-black/30 rounded-lg">
              <div className="text-purple-400 font-bold text-sm">
                {reward.type === 'points' ? `+${reward.value}` : reward.value}
                {reward.type === 'points' && <Coins className="inline h-3 w-3 ml-1" />}
              </div>
              <div className="text-white/70 text-xs">{reward.description}</div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={() => toast('¡Función próximamente! 🚀', { icon: '✨' })}
        >
          <Users className="h-4 w-4 mr-2" />
          Invitar Amigos
        </Button>
      </Card>
    </div>
  )
}