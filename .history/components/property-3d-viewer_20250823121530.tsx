"use client"

import React, { Suspense, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Text3D, 
  Box, 
  Sphere, 
  Plane,
  Html,
  useGLTF,
  PerspectiveCamera,
  ContactShadows
} from '@react-three/drei'
import { 
  Camera, 
  Maximize2, 
  RotateCcw, 
  Eye, 
  Navigation, 
  Layers, 
  Sun, 
  Moon,
  Home,
  MapPin,
  Ruler,
  DollarSign,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Smartphone,
  Share2,
  Heart,
  Bookmark,
  Info,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { toast } from 'react-hot-toast'
import * as THREE from 'three'

interface Property3DViewerProps {
  property: {
    id: string
    title: string
    type: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    area: number
    description: string
    images: string[]
    virtualTour?: string
    floorPlan?: string
    coordinates?: [number, number]
  }
  isOpen: boolean
  onClose: () => void
}

interface ViewMode {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

interface TourPoint {
  id: string
  name: string
  position: [number, number, number]
  description: string
  image?: string
}

const VIEW_MODES: ViewMode[] = [
  {
    id: 'exterior',
    name: 'Vista Exterior',
    icon: <Home className="h-4 w-4" />,
    description: 'Vista completa de la fachada'
  },
  {
    id: 'interior',
    name: 'Recorrido Interior',
    icon: <Eye className="h-4 w-4" />,
    description: 'Tour virtual por todas las habitaciones'
  },
  {
    id: 'floorplan',
    name: 'Planos',
    icon: <Layers className="h-4 w-4" />,
    description: 'Planos arquitectónicos 3D'
  },
  {
    id: 'neighborhood',
    name: 'Vecindario',
    icon: <MapPin className="h-4 w-4" />,
    description: 'Vista del área circundante'
  }
]

const TOUR_POINTS: TourPoint[] = [
  {
    id: 'entrance',
    name: 'Entrada Principal',
    position: [0, 0, 5],
    description: 'Impresionante entrada con doble altura'
  },
  {
    id: 'living',
    name: 'Sala de Estar',
    position: [3, 0, 0],
    description: 'Amplia sala con vista al mar'
  },
  {
    id: 'kitchen',
    name: 'Cocina',
    position: [-3, 0, 0],
    description: 'Cocina moderna con isla central'
  },
  {
    id: 'bedroom',
    name: 'Dormitorio Principal',
    position: [0, 2, -3],
    description: 'Suite principal con balcón privado'
  },
  {
    id: 'terrace',
    name: 'Terraza',
    position: [0, 0, -5],
    description: 'Terraza con vista panorámica'
  }
]

// 3D House Model Component
function HouseModel({ position = [0, 0, 0] as [number, number, number], scale = 1, rotation = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position} scale={scale} rotation={rotation}>
        {/* House Base */}
        <Box
          ref={meshRef}
          args={[4, 3, 4]}
          position={[0, 0, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial 
            color={hovered ? "#fbbf24" : "#f3f4f6"} 
            transparent
            opacity={0.9}
          />
        </Box>
        
        {/* Roof */}
        <Box args={[5, 0.5, 5]} position={[0, 2, 0]}>
          <meshStandardMaterial color="#dc2626" />
        </Box>
        
        {/* Windows */}
        <Box args={[0.8, 1, 0.1]} position={[-1.5, 0.5, 2.05]}>
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
        </Box>
        <Box args={[0.8, 1, 0.1]} position={[1.5, 0.5, 2.05]}>
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
        </Box>
        
        {/* Door */}
        <Box args={[0.6, 1.8, 0.1]} position={[0, 0.1, 2.05]}>
          <meshStandardMaterial color="#8b4513" />
        </Box>
        
        {/* Property Label */}
        <Html position={[0, 3.5, 0]} center>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <p className="text-sm font-semibold text-slate-900">Villa Moderna</p>
            <p className="text-xs text-slate-600">Cap Cana, DR</p>
          </div>
        </Html>
      </group>
    </Float>
  )
}

// Tour Point Marker Component
function TourPointMarker({ point, isActive, onClick }: { 
  point: TourPoint
  isActive: boolean
  onClick: () => void 
}) {
  const markerRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (markerRef.current && isActive) {
      markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  return (
    <Sphere
      ref={markerRef}
      args={[0.2]}
      position={point.position}
      onClick={onClick}
    >
      <meshStandardMaterial 
        color={isActive ? "#f59e0b" : "#ef4444"} 
        emissive={isActive ? "#f59e0b" : "#ef4444"}
        emissiveIntensity={0.3}
      />
    </Sphere>
  )
}

// 3D Scene Component
function Scene({ 
  viewMode, 
  currentTourPoint, 
  onTourPointClick 
}: { 
  viewMode: string
  currentTourPoint: number
  onTourPointClick: (index: number) => void 
}) {
  const { camera } = useThree()
  
  useEffect(() => {
    if (viewMode === 'exterior') {
      camera.position.set(8, 4, 8)
    } else if (viewMode === 'interior') {
      const point = TOUR_POINTS[currentTourPoint]
      camera.position.set(point.position[0] + 2, point.position[1] + 1, point.position[2] + 2)
    }
  }, [viewMode, currentTourPoint, camera])

  return (
    <>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <PerspectiveCamera makeDefault position={[8, 4, 8]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Environment */}
      <Environment preset="sunset" />
      
      {/* Ground */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#10b981" />
      </Plane>
      
      {/* House Model */}
      <HouseModel />
      
      {/* Tour Points */}
      {viewMode === 'interior' && TOUR_POINTS.map((point, index) => (
        <TourPointMarker
          key={point.id}
          point={point}
          isActive={currentTourPoint === index}
          onClick={() => onTourPointClick(index)}
        />
      ))}
      
      {/* Contact Shadows */}
      <ContactShadows 
        position={[0, -1.4, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2.5} 
      />
    </>
  )
}

export function Property3DViewer({ property, isOpen, onClose }: Property3DViewerProps) {
  const [viewMode, setViewMode] = useState('exterior')
  const [currentTourPoint, setCurrentTourPoint] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [loading, setLoading] = useState(true)
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play tour
  useEffect(() => {
    if (isPlaying && viewMode === 'interior') {
      const interval = setInterval(() => {
        setCurrentTourPoint(prev => 
          prev < TOUR_POINTS.length - 1 ? prev + 1 : 0
        )
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, viewMode])

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleTourPointClick = (index: number) => {
    setCurrentTourPoint(index)
    toast(`Navegando a: ${TOUR_POINTS[index].name}`, { icon: '🎯' })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Mira esta increíble propiedad en 3D: ${property.title}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast('Enlace copiado al portapapeles', { icon: '🔗' })
    }
  }

  const currentPoint = TOUR_POINTS[currentTourPoint]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex flex-col"
        >
          {/* Header */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: showControls ? 0 : -100 }}
            className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-white font-bold text-lg">{property.title}</h2>
                  <p className="text-white/70 text-sm">{property.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 3D Canvas */}
          <div className="flex-1 relative">
            <Suspense 
              fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-lg">Cargando experiencia 3D...</p>
                  </div>
                </div>
              }
            >
              <Canvas
                shadows
                gl={{ antialias: true, alpha: false }}
                onCreated={() => setLoading(false)}
              >
                <Scene 
                  viewMode={viewMode}
                  currentTourPoint={currentTourPoint}
                  onTourPointClick={handleTourPointClick}
                />
              </Canvas>
            </Suspense>

            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
                  <p className="text-lg">Inicializando vista 3D...</p>
                </div>
              </div>
            )}
          </div>

          {/* View Mode Selector */}
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: showControls ? 0 : -100 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
          >
            <Card className="bg-black/80 border-white/20 p-2">
              <div className="space-y-2">
                {VIEW_MODES.map((mode) => (
                  <Button
                    key={mode.id}
                    variant={viewMode === mode.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode.id)}
                    className={`w-full justify-start text-left ${
                      viewMode === mode.id 
                        ? "bg-amber-600 text-white" 
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    {mode.icon}
                    <span className="ml-2 text-xs">{mode.name}</span>
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Tour Controls */}
          {viewMode === 'interior' && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: showControls ? 0 : 100 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
            >
              <Card className="bg-black/80 border-white/20 p-4 min-w-[400px]">
                <div className="text-center mb-4">
                  <h3 className="text-white font-semibold">{currentPoint.name}</h3>
                  <p className="text-white/70 text-sm">{currentPoint.description}</p>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentTourPoint(Math.max(0, currentTourPoint - 1))}
                    disabled={currentTourPoint === 0}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentTourPoint(Math.min(TOUR_POINTS.length - 1, currentTourPoint + 1))}
                    disabled={currentTourPoint === TOUR_POINTS.length - 1}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">Punto:</span>
                  <div className="flex space-x-1">
                    {TOUR_POINTS.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleTourPointClick(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentTourPoint === index ? 'bg-amber-500' : 'bg-white/30'
                        }`}
                        aria-label={`Ir al punto de recorrido ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Property Info Panel */}
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: showControls ? 0 : 100 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
          >
            <Card className="bg-black/80 border-white/20 p-4 w-64">
              <div className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-amber-600 text-white mb-2">
                    ${property.price.toLocaleString()}
                  </Badge>
                  <p className="text-white/70 text-sm">{property.type}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center">
                    <p className="text-white/70">Habitaciones</p>
                    <p className="text-white font-semibold">{property.bedrooms}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70">Baños</p>
                    <p className="text-white font-semibold">{property.bathrooms}</p>
                  </div>
                  <div className="text-center col-span-2">
                    <p className="text-white/70">Área</p>
                    <p className="text-white font-semibold">{property.area} m²</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                    Solicitar Información
                  </Button>
                  <Button size="sm" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-black">
                    Agendar Visita
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Controls Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowControls(!showControls)}
            className="absolute bottom-4 right-4 z-10 text-white hover:bg-white/20"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}