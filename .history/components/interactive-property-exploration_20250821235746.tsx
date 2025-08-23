"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Camera, 
  Layers, 
  Play, 
  MapPin, 
  Home, 
  Smartphone,
  Monitor,
  Glasses,
  Maximize2,
  Share2,
  Heart,
  BookOpen,
  Navigation,
  Settings,
  Info,
  Star,
  Filter,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Property3DViewer } from './property-3d-viewer'
import { ARPropertyExplorer } from './ar-property-explorer'
import { toast } from 'react-hot-toast'

interface Property {
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
  rating: number
  reviews: number
  status: 'available' | 'sold' | 'reserved'
  featured: boolean
  tags: string[]
}

interface ExplorationMode {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  comingSoon?: boolean
}

const EXPLORATION_MODES: ExplorationMode[] = [
  {
    id: '3d',
    name: '3D Virtual Tour',
    icon: <Monitor className="h-6 w-6" />,
    description: 'Explora propiedades en 3D con controles inmersivos'
  },
  {
    id: 'ar',
    name: 'Realidad Aumentada',
    icon: <Camera className="h-6 w-6" />,
    description: 'Ve propiedades en tu entorno usando AR'
  },
  {
    id: 'vr',
    name: 'Realidad Virtual',
    icon: <VrIcon className="h-6 w-6" />,
    description: 'Experiencia inmersiva completa en VR',
    comingSoon: true
  },
  {
    id: 'street',
    name: 'Street View',
    icon: <Navigation className="h-6 w-6" />,
    description: 'Recorre las calles alrededor de la propiedad',
    comingSoon: true
  }
]

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Villa Moderna de Lujo en Cap Cana',
    type: 'Villa',
    price: 850000,
    location: 'Cap Cana, Punta Cana',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    description: 'Espectacular villa moderna con vista al mar, piscina privada y acabados de lujo.',
    images: ['/property1.jpg', '/property1-2.jpg', '/property1-3.jpg'],
    virtualTour: 'https://example.com/tour1',
    floorPlan: '/floorplan1.pdf',
    coordinates: [18.5601, -68.3725],
    rating: 4.8,
    reviews: 24,
    status: 'available',
    featured: true,
    tags: ['Piscina', 'Vista al Mar', 'Moderno', 'Lujo']
  },
  {
    id: '2',
    title: 'Apartamento Frente al Mar Bavaro',
    type: 'Apartamento',
    price: 320000,
    location: 'Playa Bavaro, Punta Cana',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    description: 'Hermoso apartamento con balcón frente al mar y acceso directo a la playa.',
    images: ['/property2.jpg', '/property2-2.jpg'],
    virtualTour: 'https://example.com/tour2',
    coordinates: [18.5681, -68.4037],
    rating: 4.6,
    reviews: 18,
    status: 'available',
    featured: false,
    tags: ['Playa', 'Balcón', 'Acceso Directo']
  },
  {
    id: '3',
    title: 'Penthouse Exclusivo con Terraza',
    type: 'Penthouse',
    price: 1200000,
    location: 'Cocotal, Bavaro',
    bedrooms: 5,
    bathrooms: 4,
    area: 500,
    description: 'Penthouse de lujo con amplia terraza, jacuzzi privado y vistas panorámicas.',
    images: ['/property3.jpg', '/property3-2.jpg', '/property3-3.jpg'],
    virtualTour: 'https://example.com/tour3',
    floorPlan: '/floorplan3.pdf',
    coordinates: [18.5501, -68.3625],
    rating: 4.9,
    reviews: 31,
    status: 'reserved',
    featured: true,
    tags: ['Terraza', 'Jacuzzi', 'Panorámico', 'Exclusivo']
  }
]

interface InteractivePropertyExplorationProps {
  isOpen: boolean
  onClose: () => void
}

export function InteractivePropertyExploration({ isOpen, onClose }: InteractivePropertyExplorationProps) {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [show3DViewer, setShow3DViewer] = useState(false)
  const [showARExplorer, setShowARExplorer] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 2000000],
    location: 'all',
    status: 'available'
  })
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Default to Punta Cana coordinates
          setUserLocation({ lat: 18.5601, lng: -68.3725 })
        }
      )
    }
  }, [])

  const handleModeSelect = (modeId: string) => {
    const mode = EXPLORATION_MODES.find(m => m.id === modeId)
    
    if (mode?.comingSoon) {
      toast('Esta función estará disponible pronto! 🚀', { icon: '⏳' })
      return
    }

    setSelectedMode(modeId)
    
    if (modeId === 'ar') {
      // Check camera permission
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        setShowARExplorer(true)
      } else {
        toast.error('Tu dispositivo no soporta AR')
      }
    }
  }

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    
    if (selectedMode === '3d') {
      setShow3DViewer(true)
    } else if (selectedMode === 'ar') {
      toast(`Propiedad seleccionada: ${property.title}`, { icon: '🏠' })
    }
  }

  const filteredProperties = MOCK_PROPERTIES.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filters.type === 'all' || property.type === filters.type
    const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    const matchesStatus = filters.status === 'all' || property.status === filters.status

    return matchesSearch && matchesType && matchesPrice && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100'
      case 'reserved': return 'text-yellow-600 bg-yellow-100'
      case 'sold': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible'
      case 'reserved': return 'Reservada'
      case 'sold': return 'Vendida'
      default: return 'Desconocido'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 overflow-y-auto"
        >
          <div className="min-h-screen p-4">
            {/* Header */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Exploración Interactiva
                </h1>
                <p className="text-slate-300">
                  Descubre propiedades con tecnología inmersiva
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </motion.div>

            {!selectedMode ? (
              /* Mode Selection */
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Elige tu modo de exploración
                  </h2>
                  <p className="text-slate-400 max-w-2xl mx-auto">
                    Utiliza las últimas tecnologías para explorar propiedades como nunca antes
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {EXPLORATION_MODES.map((mode) => (
                    <motion.div
                      key={mode.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`p-6 cursor-pointer transition-all border-2 ${
                          mode.comingSoon 
                            ? 'bg-slate-800/50 border-slate-700 cursor-not-allowed' 
                            : 'bg-slate-800/80 border-slate-600 hover:border-amber-500 hover:bg-slate-700/80'
                        }`}
                        onClick={() => handleModeSelect(mode.id)}
                      >
                        <div className="text-center space-y-4">
                          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                            mode.comingSoon 
                              ? 'bg-slate-700 text-slate-400' 
                              : 'bg-gradient-to-br from-amber-500 to-amber-600 text-white'
                          }`}>
                            {mode.icon}
                          </div>
                          
                          <div>
                            <h3 className={`text-xl font-bold mb-2 ${
                              mode.comingSoon ? 'text-slate-400' : 'text-white'
                            }`}>
                              {mode.name}
                              {mode.comingSoon && (
                                <Badge className="ml-2 bg-slate-600 text-slate-300">
                                  Próximamente
                                </Badge>
                              )}
                            </h3>
                            <p className={`text-sm ${
                              mode.comingSoon ? 'text-slate-500' : 'text-slate-300'
                            }`}>
                              {mode.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Features Preview */}
                <div className="bg-slate-800/50 rounded-xl p-6 max-w-4xl mx-auto">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    Características Innovadoras
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center space-y-2">
                      <Eye className="h-8 w-8 text-amber-500 mx-auto" />
                      <h4 className="text-white font-semibold">Visualización Inmersiva</h4>
                      <p className="text-slate-400 text-sm">
                        Recorridos 360° y vistas detalladas
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <Smartphone className="h-8 w-8 text-amber-500 mx-auto" />
                      <h4 className="text-white font-semibold">Tecnología AR/VR</h4>
                      <p className="text-slate-400 text-sm">
                        Realidad aumentada y virtual integrada
                      </p>
                    </div>
                    <div className="text-center space-y-2">
                      <Share2 className="h-8 w-8 text-amber-500 mx-auto" />
                      <h4 className="text-white font-semibold">Experiencia Social</h4>
                      <p className="text-slate-400 text-sm">
                        Comparte y explora con otros usuarios
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Property Selection */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedMode(null)}
                    className="text-white hover:bg-white/20"
                  >
                    ← Cambiar modo
                  </Button>
                  <Badge className="bg-amber-600 text-white">
                    {EXPLORATION_MODES.find(m => m.id === selectedMode)?.name}
                  </Badge>
                </div>

                {/* Search and Filters */}
                <div className="bg-slate-800/50 rounded-xl p-4 space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Buscar propiedades..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      />
                    </div>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select 
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white rounded px-3 py-1 text-sm"
                    >
                      <option value="all">Todos los tipos</option>
                      <option value="Villa">Villa</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>

                    <select 
                      value={filters.status}
                      onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white rounded px-3 py-1 text-sm"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="available">Disponible</option>
                      <option value="reserved">Reservada</option>
                    </select>
                  </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="bg-slate-800/80 border-slate-600 hover:border-amber-500 transition-all cursor-pointer overflow-hidden"
                        onClick={() => handlePropertySelect(property)}
                      >
                        {/* Image */}
                        <div className="relative h-48 bg-slate-700">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-2 left-2 flex space-x-2">
                            {property.featured && (
                              <Badge className="bg-amber-600 text-white">
                                Destacada
                              </Badge>
                            )}
                            <Badge className={`${getStatusColor(property.status)}`}>
                              {getStatusText(property.status)}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-black/70 text-white">
                              <Eye className="h-3 w-3 mr-1" />
                              Ver en {selectedMode?.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="text-white font-bold text-lg line-clamp-2">
                              {property.title}
                            </h3>
                            <div className="flex items-center space-x-2 text-slate-400 text-sm">
                              <MapPin className="h-3 w-3" />
                              <span>{property.location}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-slate-300 text-sm">
                            <span>{property.bedrooms} hab</span>
                            <span>{property.bathrooms} baños</span>
                            <span>{property.area} m²</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(property.rating) 
                                      ? 'text-yellow-500 fill-current' 
                                      : 'text-slate-400'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-slate-400 text-xs">
                              ({property.reviews} reseñas)
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-amber-500">
                              ${property.price.toLocaleString()}
                            </span>
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                              Explorar
                            </Button>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {property.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredProperties.length === 0 && (
                  <div className="text-center py-12">
                    <Home className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">
                      No se encontraron propiedades
                    </h3>
                    <p className="text-slate-400">
                      Intenta ajustar los filtros de búsqueda
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3D Viewer Modal */}
          {selectedProperty && (
            <Property3DViewer
              property={selectedProperty}
              isOpen={show3DViewer}
              onClose={() => {
                setShow3DViewer(false)
                setSelectedProperty(null)
              }}
            />
          )}

          {/* AR Explorer Modal */}
          <ARPropertyExplorer
            isOpen={showARExplorer}
            onClose={() => setShowARExplorer(false)}
            userLocation={userLocation || undefined}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}