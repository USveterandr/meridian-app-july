"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Home, 
  Calendar,
  Target,
  Trophy,
  Zap,
  Star,
  Coins,
  PiggyBank,
  BarChart3,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import CountUp from 'react-countup'
import { useGamification } from '@/lib/gamification-context'
import { 
  calculateDominicanROI, 
  formatDominicanCurrency, 
  convertDopToUsd,
  convertUsdToDop,
  DR_LOCATIONS,
  TAX_INCENTIVES
} from '@/lib/dominican-republic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@radix-ui/react-switch'
import { Badge } from '@/components/ui/badge'

interface CalculationResult {
  cashOnCashReturn: number
  totalReturn: number
  annualRental: number
  annualExpenses: number
  netAnnualIncome: number
  breakEvenMonths: number
  roi5Years: number
  totalProfit5Years: number
  monthlyProfit: number
}

interface GameState {
  level: number
  experience: number
  calculationsCount: number
  bestROI: number
  achievements: string[]
}

const ACHIEVEMENT_THRESHOLDS = {
  first_calculation: 1,
  roi_hunter: 15, // 15% ROI
  roi_master: 25, // 25% ROI
  calculation_streak: 10,
  high_roller: 1000000, // $1M property
  optimizer: 5 // 5 calculations
}

const ACHIEVEMENTS = {
  first_calculation: {
    title: 'Primer Cálculo',
    description: 'Calculaste tu primera inversión',
    icon: '🎯',
    points: 50
  },
  roi_hunter: {
    title: 'Cazador de ROI',
    description: 'Encontraste una inversión con 15%+ ROI',
    icon: '🏹',
    points: 100
  },
  roi_master: {
    title: 'Maestro del ROI',
    description: 'Encontraste una inversión con 25%+ ROI',
    icon: '👑',
    points: 250
  },
  calculation_streak: {
    title: 'Calculadora en Fuego',
    description: 'Hiciste 10 cálculos seguidos',
    icon: '🔥',
    points: 150
  },
  high_roller: {
    title: 'Gran Inversionista',
    description: 'Calculaste una propiedad de $1M+',
    icon: '💎',
    points: 300
  },
  optimizer: {
    title: 'Optimizador',
    description: 'Comparaste 5 escenarios diferentes',
    icon: '⚡',
    points: 75
  }
}

export function InvestmentCalculatorGameified() {
  const { completeLearningModule, state: userState } = useGamification()
  
  // Calculator inputs
  const [propertyPrice, setPropertyPrice] = useState(500000)
  const [monthlyRent, setMonthlyRent] = useState(3500)
  const [currency, setCurrency] = useState<'USD' | 'DOP'>('USD')
  const [location, setLocation] = useState('')
  const [includeAppreciation, setIncludeAppreciation] = useState(true)
  const [appreciationRate, setAppreciationRate] = useState(0.05)
  const [downPayment, setDownPayment] = useState(0.25)
  const [loanRate, setLoanRate] = useState(0.065)
  const [loanTerm, setLoanTerm] = useState(30)
  
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    experience: 0,
    calculationsCount: 0,
    bestROI: 0,
    achievements: []
  })
  
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [newAchievements, setNewAchievements] = useState<string[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  const checkAchievements = (newResult: CalculationResult) => {
    const newAchs: string[] = []
    
    // First calculation
    if (gameState.calculationsCount === 0 && !gameState.achievements.includes('first_calculation')) {
      newAchs.push('first_calculation')
    }
    
    // ROI achievements
    if (newResult.totalReturn >= 15 && !gameState.achievements.includes('roi_hunter')) {
      newAchs.push('roi_hunter')
    }
    
    if (newResult.totalReturn >= 25 && !gameState.achievements.includes('roi_master')) {
      newAchs.push('roi_master')
    }
    
    // High roller
    if (propertyPrice >= 1000000 && !gameState.achievements.includes('high_roller')) {
      newAchs.push('high_roller')
    }
    
    // Calculation streak
    if (gameState.calculationsCount >= 9 && !gameState.achievements.includes('calculation_streak')) {
      newAchs.push('calculation_streak')
    }
    
    // Optimizer
    if (gameState.calculationsCount >= 4 && !gameState.achievements.includes('optimizer')) {
      newAchs.push('optimizer')
    }
    
    if (newAchs.length > 0) {
      setNewAchievements(newAchs)
      setGameState(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchs]
      }))
      
      // Award points for achievements
      const totalPoints = newAchs.reduce((sum, ach) => sum + ACHIEVEMENTS[ach as keyof typeof ACHIEVEMENTS].points, 0)
      completeLearningModule(`calculator-achievement-${Date.now()}`)
    }
  }

  const calculateInvestment = () => {
    setIsCalculating(true)
    
    setTimeout(() => {
      const baseResult = calculateDominicanROI({
        propertyPrice: currency === 'DOP' ? convertDopToUsd(propertyPrice) : propertyPrice,
        monthlyRental: currency === 'DOP' ? convertDopToUsd(monthlyRent) : monthlyRent,
        currency: 'USD',
        includeAppreciation,
        appreciationRate
      })
      
      // Enhanced calculations for 5-year projection
      const monthlyProfit = baseResult.netAnnualIncome / 12
      const roi5Years = baseResult.totalReturn * 5
      const totalProfit5Years = baseResult.netAnnualIncome * 5
      
      const enhancedResult: CalculationResult = {
        ...baseResult,
        roi5Years,
        totalProfit5Years,
        monthlyProfit
      }
      
      setResult(enhancedResult)
      setShowResult(true)
      setIsCalculating(false)
      
      // Update game state
      setGameState(prev => ({
        ...prev,
        calculationsCount: prev.calculationsCount + 1,
        bestROI: Math.max(prev.bestROI, enhancedResult.totalReturn),
        experience: prev.experience + 10,
        level: Math.floor((prev.experience + 10) / 100) + 1
      }))
      
      // Check for new achievements
      checkAchievements(enhancedResult)
    }, 2000)
  }

  const getROIColor = (roi: number) => {
    if (roi >= 25) return 'text-green-500'
    if (roi >= 15) return 'text-blue-500' 
    if (roi >= 10) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getROIGrade = (roi: number) => {
    if (roi >= 25) return 'A+'
    if (roi >= 20) return 'A'
    if (roi >= 15) return 'B+'
    if (roi >= 10) return 'B'
    if (roi >= 5) return 'C'
    return 'D'
  }

  const formatCurrency = (amount: number) => {
    return currency === 'DOP' ? 
      formatDominicanCurrency(convertUsdToDop(amount), 'DOP') :
      formatDominicanCurrency(amount, 'USD')
  }

  return (
    <div className=\"max-w-6xl mx-auto p-6 space-y-6\">
      {/* Header with gamification */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className=\"text-center mb-8\"
      >
        <div className=\"flex items-center justify-center space-x-4 mb-4\">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: \"linear\" }}
            className=\"w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center\"
          >
            <Calculator className=\"h-6 w-6 text-white\" />
          </motion.div>
          <div>
            <h1 className=\"text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent\">
              Calculadora de Inversión Gamificada
            </h1>
            <p className=\"text-gray-600\">Calcula tu ROI y gana logros</p>
          </div>
        </div>
        
        {/* Game stats */}
        <div className=\"flex items-center justify-center space-x-6 text-sm\">
          <div className=\"flex items-center space-x-1\">
            <Trophy className=\"h-4 w-4 text-yellow-500\" />
            <span>Nivel {gameState.level}</span>
          </div>
          <div className=\"flex items-center space-x-1\">
            <Star className=\"h-4 w-4 text-blue-500\" />
            <span>{gameState.experience} XP</span>
          </div>
          <div className=\"flex items-center space-x-1\">
            <Calculator className=\"h-4 w-4 text-green-500\" />
            <span>{gameState.calculationsCount} cálculos</span>
          </div>
          <div className=\"flex items-center space-x-1\">
            <TrendingUp className=\"h-4 w-4 text-purple-500\" />
            <span>Mejor ROI: {gameState.bestROI.toFixed(1)}%</span>
          </div>
        </div>
      </motion.div>

      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-8\">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className=\"p-6 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200\">
            <h2 className=\"text-2xl font-bold mb-6 flex items-center\">
              <Home className=\"h-6 w-6 mr-2 text-blue-500\" />
              Detalles de la Inversión
            </h2>
            
            <div className=\"space-y-6\">
              {/* Currency Toggle */}
              <div className=\"flex items-center justify-between\">
                <label className=\"font-semibold\">Moneda:</label>
                <div className=\"flex items-center space-x-2\">
                  <span className={currency === 'USD' ? 'text-blue-600 font-bold' : 'text-gray-500'}>USD</span>
                  <Switch 
                    checked={currency === 'DOP'}
                    onCheckedChange={(checked) => setCurrency(checked ? 'DOP' : 'USD')}
                  />
                  <span className={currency === 'DOP' ? 'text-blue-600 font-bold' : 'text-gray-500'}>DOP</span>
                </div>
              </div>

              {/* Property Price */}
              <div>
                <div className=\"flex items-center justify-between mb-2\">
                  <label className=\"font-semibold flex items-center\">
                    <DollarSign className=\"h-4 w-4 mr-1\" />
                    Precio de la Propiedad
                  </label>
                  <span className=\"text-lg font-bold text-blue-600\">
                    {formatCurrency(propertyPrice)}
                  </span>
                </div>
                <Slider
                  value={[propertyPrice]}
                  onValueChange={(value) => setPropertyPrice(value[0])}
                  max={currency === 'USD' ? 5000000 : 280000000}
                  min={currency === 'USD' ? 50000 : 2800000}
                  step={currency === 'USD' ? 10000 : 560000}
                  className=\"w-full\"
                />
              </div>

              {/* Monthly Rent */}
              <div>
                <div className=\"flex items-center justify-between mb-2\">
                  <label className=\"font-semibold flex items-center\">
                    <Home className=\"h-4 w-4 mr-1\" />
                    Alquiler Mensual
                  </label>
                  <span className=\"text-lg font-bold text-green-600\">
                    {formatCurrency(monthlyRent)}
                  </span>
                </div>
                <Slider
                  value={[monthlyRent]}
                  onValueChange={(value) => setMonthlyRent(value[0])}
                  max={currency === 'USD' ? 20000 : 1120000}
                  min={currency === 'USD' ? 500 : 28000}
                  step={currency === 'USD' ? 100 : 5600}
                  className=\"w-full\"
                />
              </div>

              {/* Location */}
              <div>
                <label className=\"font-semibold mb-2 block\">Ubicación:</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder=\"Selecciona una ubicación\" />
                  </SelectTrigger>
                  <SelectContent>
                    {DR_LOCATIONS.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id}>
                        {loc.nameES}, {loc.provinceES}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Appreciation */}
              <div className=\"flex items-center justify-between\">
                <label className=\"font-semibold\">Incluir Apreciación:</label>
                <Switch 
                  checked={includeAppreciation}
                  onCheckedChange={setIncludeAppreciation}
                />
              </div>

              {includeAppreciation && (
                <div>
                  <div className=\"flex items-center justify-between mb-2\">
                    <label className=\"font-semibold\">Tasa de Apreciación Anual:</label>
                    <span className=\"font-bold text-purple-600\">
                      {(appreciationRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Slider
                    value={[appreciationRate * 100]}
                    onValueChange={(value) => setAppreciationRate(value[0] / 100)}
                    max={15}
                    min={1}
                    step={0.5}
                    className=\"w-full\"
                  />
                </div>
              )}

              {/* Calculate Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={calculateInvestment}
                  disabled={isCalculating}
                  className=\"w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 text-lg relative overflow-hidden\"
                >
                  {isCalculating ? (
                    <div className=\"flex items-center space-x-2\">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: \"linear\" }}
                      >
                        <Sparkles className=\"h-5 w-5\" />
                      </motion.div>
                      <span>Calculando...</span>
                    </div>
                  ) : (
                    <div className=\"flex items-center justify-center space-x-2\">
                      <Calculator className=\"h-5 w-5\" />
                      <span>Calcular ROI</span>
                    </div>
                  )}
                  
                  {isCalculating && (
                    <motion.div
                      className=\"absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent\"
                      animate={{ x: [-100, 300] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Results Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence>
            {showResult && result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className=\"space-y-4\"
              >
                {/* ROI Grade Card */}
                <Card className=\"p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200\">
                  <div className=\"text-center\">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: \"spring\", stiffness: 200 }}
                      className=\"text-6xl font-black mb-2\"
                    >
                      <span className={getROIColor(result.totalReturn)}>
                        {getROIGrade(result.totalReturn)}
                      </span>
                    </motion.div>
                    <h3 className=\"text-xl font-bold mb-2\">Calificación de Inversión</h3>
                    <div className=\"flex items-center justify-center space-x-4 text-2xl font-bold\">
                      <span className={getROIColor(result.totalReturn)}>
                        <CountUp end={result.totalReturn} decimals={1} duration={2} />%
                      </span>
                      <span className=\"text-gray-400\">ROI Total</span>
                    </div>
                  </div>
                </Card>

                {/* Key Metrics */}
                <div className=\"grid grid-cols-2 gap-4\">
                  <Card className=\"p-4 bg-gradient-to-br from-blue-50 to-indigo-50\">
                    <div className=\"flex items-center justify-between mb-2\">
                      <PiggyBank className=\"h-6 w-6 text-blue-500\" />
                      <Badge variant=\"secondary\">Mensual</Badge>
                    </div>
                    <div className=\"text-2xl font-bold text-blue-600\">
                      <CountUp end={result.monthlyProfit} duration={2} prefix={currency === 'USD' ? '$' : 'RD$'} />
                    </div>
                    <div className=\"text-sm text-gray-600\">Ganancia Mensual</div>
                  </Card>

                  <Card className=\"p-4 bg-gradient-to-br from-green-50 to-emerald-50\">
                    <div className=\"flex items-center justify-between mb-2\">
                      <TrendingUp className=\"h-6 w-6 text-green-500\" />
                      <Badge variant=\"secondary\">Anual</Badge>
                    </div>
                    <div className=\"text-2xl font-bold text-green-600\">
                      <CountUp end={result.netAnnualIncome} duration={2} prefix={currency === 'USD' ? '$' : 'RD$'} />
                    </div>
                    <div className=\"text-sm text-gray-600\">Ganancia Anual</div>
                  </Card>

                  <Card className=\"p-4 bg-gradient-to-br from-purple-50 to-pink-50\">
                    <div className=\"flex items-center justify-between mb-2\">
                      <Calendar className=\"h-6 w-6 text-purple-500\" />
                      <Badge variant=\"secondary\">5 Años</Badge>
                    </div>
                    <div className=\"text-2xl font-bold text-purple-600\">
                      <CountUp end={result.roi5Years} decimals={1} duration={2} />%
                    </div>
                    <div className=\"text-sm text-gray-600\">ROI 5 Años</div>
                  </Card>

                  <Card className=\"p-4 bg-gradient-to-br from-amber-50 to-orange-50\">
                    <div className=\"flex items-center justify-between mb-2\">
                      <Target className=\"h-6 w-6 text-amber-500\" />
                      <Badge variant=\"secondary\">Break Even</Badge>
                    </div>
                    <div className=\"text-2xl font-bold text-amber-600\">
                      <CountUp end={result.breakEvenMonths} decimals={1} duration={2} />
                    </div>
                    <div className=\"text-sm text-gray-600\">Meses</div>
                  </Card>
                </div>

                {/* Investment Advice */}
                <Card className=\"p-4\">
                  <h4 className=\"font-bold mb-3 flex items-center\">
                    <AlertCircle className=\"h-5 w-5 mr-2 text-blue-500\" />
                    Análisis de la Inversión
                  </h4>
                  <div className=\"space-y-2 text-sm\">
                    {result.totalReturn >= 20 && (
                      <div className=\"flex items-center space-x-2 text-green-600\">
                        <CheckCircle2 className=\"h-4 w-4\" />
                        <span>Excelente oportunidad de inversión</span>
                      </div>
                    )}
                    {result.totalReturn >= 15 && result.totalReturn < 20 && (
                      <div className=\"flex items-center space-x-2 text-blue-600\">
                        <CheckCircle2 className=\"h-4 w-4\" />
                        <span>Buena oportunidad de inversión</span>
                      </div>
                    )}
                    {result.totalReturn < 10 && (
                      <div className=\"flex items-center space-x-2 text-red-600\">
                        <AlertCircle className=\"h-4 w-4\" />
                        <span>Considera ajustar los parámetros</span>
                      </div>
                    )}
                    <div className=\"text-gray-600\">
                      Tiempo estimado de recuperación: {result.breakEvenMonths.toFixed(1)} meses
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Achievement Notifications */}
      <AnimatePresence>
        {newAchievements.map((achievement, index) => {
          const ach = ACHIEVEMENTS[achievement as keyof typeof ACHIEVEMENTS]
          return (
            <motion.div
              key={achievement}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ delay: index * 0.2 }}
              className=\"fixed top-20 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-2xl max-w-sm\"
            >
              <div className=\"flex items-center space-x-3\">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className=\"text-2xl\"
                >
                  {ach.icon}
                </motion.div>
                <div>
                  <div className=\"font-bold\">¡Logro Desbloqueado!</div>
                  <div className=\"text-sm\">{ach.title}</div>
                  <div className=\"text-xs opacity-90\">+{ach.points} puntos</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}