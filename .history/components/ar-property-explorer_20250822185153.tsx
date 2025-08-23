"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  X, 
  Crosshair, 
  Layers, 
  MapPin, 
  Home, 
  Ruler, 
  DollarSign,
  Info,
  Share2,
  Bookmark,
  Navigation,
  Smartphone,
  Scan,
  Target,
  Eye,
  Settings,
  Compass,
  Heart // ✅ Fixed for Cloudflare deployment - ensuring latest commit is used
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'

interface ARProperty {
  id: string
  title: string
  price: number
  type: string
  distance: number // meters
  coordinates: {
    lat: number
    lng: number
  }
  position: {
    x: number // screen position
    y: number
  }
  bedrooms: number
  bathrooms: number
  area: number
  status: 'available' | 'sold' | 'reserved'
  images: string[]
}

interface ARPropertyExplorerProps {
  isOpen: boolean
  onClose: () => void
  userLocation?: {
    lat: number
    lng: number
  }
}

const MOCK_AR_PROPERTIES: ARProperty[] = [
  {
    id: '1',
    title: 'Villa Moderna Cap Cana',
    price: 850000,
    type: 'Villa',
    distance: 150,
    coordinates: { lat: 18.5601, lng: -68.3725 },
    position: { x: 30, y: 40 },
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    status: 'available',
    images: ['/property1.jpg']
  },
  {
    id: '2',
    title: 'Apartamento Bavaro Beach',
    price: 320000,
    type: 'Apartamento',
    distance: 280,
    coordinates: { lat: 18.5601, lng: -68.3825 },
    position: { x: 70, y: 25 },
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    status: 'available',
    images: ['/property2.jpg']
  },
  {
    id: '3',
    title: 'Penthouse Punta Cana',
    price: 1200000,
    type: 'Penthouse',
    distance: 450,
    coordinates: { lat: 18.5701, lng: -68.3625 },
    position: { x: 50, y: 60 },
    bedrooms: 5,
    bathrooms: 4,
    area: 500,
    status: 'reserved',
    images: ['/property3.jpg']
  }
]

// AR Property Marker Component
function ARPropertyMarker({ 
  property, 
  onClick, 
  isSelected 
}: { 
  property: ARProperty
  onClick: () => void
  isSelected: boolean 
}) {
  const getStatusColor = () => {
    switch (property.status) {
      case 'available': return 'bg-green-500'
      case 'reserved': return 'bg-yellow-500' 
      case 'sold': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${property.position.x}%`,
        top: `${property.position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isSelected ? 20 : 10
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.2 : 1, 
        opacity: 1 
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Distance Indicator Line */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
        <div className={`h-16 w-0.5 ${getStatusColor()} opacity-50`} />
      </div>

      {/* Property Marker */}
      <div className={`${getStatusColor()} rounded-full p-3 shadow-lg border-2 border-white`}>
        <Home className="h-4 w-4 text-white" />
      </div>

      {/* Property Info Popup */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64"
          >
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-sm">{property.title}</h3>
                    <p className="text-slate-600 text-xs">{property.type}</p>
                  </div>
                  <Badge className={`text-xs ${getStatusColor()} text-white`}>
                    {property.distance}m
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-600">
                  <span>{property.bedrooms} hab</span>
                  <span>{property.bathrooms} baños</span>
                  <span>{property.area} m²</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-600">
                    ${property.price.toLocaleString()}
                  </span>
                  <div className="flex space-x-1">
                    <Button size="sm" className="h-6 px-2 text-xs">
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pointer */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/95" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Animation for Available Properties */}
      {property.status === 'available' && !isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  )
}

// AR Compass Component
function ARCompass({ heading }: { heading: number }) {
  return (
    <div className="absolute top-4 right-4 bg-black/50 rounded-full p-3">
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 border-2 border-white/50 rounded-full"
          animate={{ rotate: -heading }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-red-500" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
            N
          </div>
        </motion.div>
        <Compass className="absolute inset-2 text-white" />
      </div>
    </div>
  )
}

export function ARPropertyExplorer({ isOpen, onClose, userLocation }: ARPropertyExplorerProps) {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [heading, setHeading] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    maxDistance: 1000,
    minPrice: 0,
    maxPrice: 2000000,
    propertyTypes: ['Villa', 'Apartamento', 'Penthouse']
  })
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Initialize camera
  useEffect(() => {
    if (isOpen) {
      initializeCamera()
      initializeCompass()
    }

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [isOpen])

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      setCameraStream(stream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      
      toast.success('Cámara AR inicializada', { icon: '📱' })
    } catch (error) {
      console.error('Error accessing camera:', error)
      toast.error('No se pudo acceder a la cámara')
    }
  }

  const initializeCompass = () => {
    if ('DeviceOrientationEvent' in window) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setHeading(event.alpha)
        }
      }

      window.addEventListener('deviceorientation', handleOrientation)
      return () => window.removeEventListener('deviceorientation', handleOrientation)
    }
  }

  const handleScan = () => {
    setIsScanning(true)
    
    // Simulate property detection
    setTimeout(() => {
      setIsScanning(false)
      toast.success('¡3 propiedades detectadas!', { icon: '🏠' })
    }, 2000)
  }

  const handlePropertySelect = (propertyId: string) => {
    setSelectedProperty(selectedProperty === propertyId ? null : propertyId)
  }

  const filteredProperties = MOCK_AR_PROPERTIES.filter(property => {
    return (
      property.distance <= filters.maxDistance &&
      property.price >= filters.minPrice &&
      property.price <= filters.maxPrice &&
      filters.propertyTypes.includes(property.type)
    )
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50"
        >
          {/* Camera View */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            
            {/* AR Overlay Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>

          {/* AR Property Markers */}
          <div className="absolute inset-0 pointer-events-none">
            {filteredProperties.map(property => (
              <div key={property.id} className="pointer-events-auto">
                <ARPropertyMarker
                  property={property}
                  isSelected={selectedProperty === property.id}
                  onClick={() => handlePropertySelect(property.id)}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="text-center">
                <h2 className="text-white font-bold">Exploración AR</h2>
                <p className="text-white/70 text-sm">
                  {filteredProperties.length} propiedades detectadas
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* AR Compass */}
          <ARCompass heading={heading} />

          {/* Crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <Crosshair className="h-8 w-8 text-white/70" />
              <motion.div
                className="absolute inset-0 border-2 border-amber-500 rounded-full"
                animate={{
                  scale: isScanning ? [1, 1.5, 1] : 1,
                  opacity: isScanning ? [1, 0.5, 1] : 0.7
                }}
                transition={{
                  duration: 1,
                  repeat: isScanning ? Infinity : 0
                }}
              />
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <MapPin className="h-5 w-5" />
              </Button>
              
              <Button
                onClick={handleScan}
                disabled={isScanning}
                className={`px-8 py-3 rounded-full ${
                  isScanning 
                    ? 'bg-amber-600 animate-pulse' 
                    : 'bg-amber-600 hover:bg-amber-700'
                } text-white`}
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Escaneando...
                  </>
                ) : (
                  <>
                    <Scan className="h-5 w-5 mr-2" />
                    Escanear Área
                  </>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                aria-label="Compartir vista AR"
              >
            </div>

            {/* Property Counter */}
            <div className="text-center mt-2">
              <Badge className="bg-black/50 text-white border-white/20">
                {filteredProperties.length} propiedades en rango
              </Badge>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="absolute top-0 right-0 bottom-0 w-80 bg-black/90 backdrop-blur-md z-40 p-4"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold">Filtros AR</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Distance Filter */}
                  <div>
                    <label className="text-white text-sm font-medium block mb-2">
                      Distancia máxima: {filters.maxDistance}m
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      value={filters.maxDistance}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        maxDistance: parseInt(e.target.value)
                      }))}
                      className="w-full"
                      aria-label="Distancia máxima en metros"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-white text-sm font-medium block mb-2">
                      Rango de precio
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="2000000"
                        step="50000"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          minPrice: parseInt(e.target.value)
                        }))}
                        className="w-full"
                        aria-label="Precio mínimo"
                      />
                      <div className="flex justify-between text-white text-xs">
                        <span>${filters.minPrice.toLocaleString()}</span>
                        <span>${filters.maxPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Types */}
                  <div>
                    <label className="text-white text-sm font-medium block mb-2">
                      Tipos de propiedad
                    </label>
                    <div className="space-y-2">
                      {['Villa', 'Apartamento', 'Penthouse', 'Casa'].map(type => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.propertyTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters(prev => ({
                                  ...prev,
                                  propertyTypes: [...prev.propertyTypes, type]
                                }))
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  propertyTypes: prev.propertyTypes.filter(t => t !== type)
                                }))
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-white text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanning Overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-black/30 z-25">
              <div className="absolute inset-4 border-2 border-amber-500 rounded-lg">
                <motion.div
                  className="absolute inset-0 border-2 border-amber-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <Target className="h-16 w-16 text-amber-500 mx-auto mb-2 animate-pulse" />
                  <p className="text-white font-medium">Detectando propiedades...</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}