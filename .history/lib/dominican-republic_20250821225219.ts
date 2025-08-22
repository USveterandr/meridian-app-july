/**
 * Dominican Republic Specific Features
 * Currency, locations, legal documents, tax incentives
 */

export interface DominicanLocation {
  id: string
  name: string
  nameES: string
  province: string
  provinceES: string
  municipality: string
  municipalityES: string
  region: 'Norte' | 'Sur' | 'Este' | 'Oeste' | 'Central' | 'Suroeste'
  isPopular: boolean
  isTouristZone: boolean
  hasAirport: boolean
  hasPort: boolean
  coordinates: {
    lat: number
    lng: number
  }
  averagePrice: {
    dop: number
    usd: number
  }
  marketTrend: 'rising' | 'stable' | 'declining'
  popularAmenities: string[]
}

export interface TaxIncentive {
  id: string
  name: string
  nameES: string
  description: string
  descriptionES: string
  category: 'tourism' | 'investment' | 'residence' | 'business'
  benefitPercentage: number
  requirements: string[]
  requirementsES: string[]
  duration: string
  durationES: string
  law: string
  isActive: boolean
}

export interface LegalDocument {
  id: string
  name: string
  nameES: string
  description: string
  descriptionES: string
  category: 'ownership' | 'identity' | 'financial' | 'legal' | 'tax'
  isRequired: boolean
  issuingEntity: string
  issuingEntityES: string
  validity: string
  validityES: string
  cost?: {
    dop: number
    usd: number
  }
}

// Dominican Republic Locations
export const DR_LOCATIONS: DominicanLocation[] = [
  {
    id: 'punta-cana',
    name: 'Punta Cana',
    nameES: 'Punta Cana',
    province: 'La Altagracia',
    provinceES: 'La Altagracia',
    municipality: 'Higüey',
    municipalityES: 'Higüey',
    region: 'Este',
    isPopular: true,
    isTouristZone: true,
    hasAirport: true,
    hasPort: false,
    coordinates: { lat: 18.5601, lng: -68.3725 },
    averagePrice: { dop: 95000000, usd: 1700000 },
    marketTrend: 'rising',
    popularAmenities: ['Beach Access', 'Golf Course', 'Marina', 'Spa', 'Restaurants']
  },
  {
    id: 'cap-cana',
    name: 'Cap Cana',
    nameES: 'Cap Cana',
    province: 'La Altagracia',
    provinceES: 'La Altagracia',
    municipality: 'Higüey',
    municipalityES: 'Higüey',
    region: 'Este',
    isPopular: true,
    isTouristZone: true,
    hasAirport: true,
    hasPort: true,
    coordinates: { lat: 18.4742, lng: -68.3278 },
    averagePrice: { dop: 140000000, usd: 2500000 },
    marketTrend: 'rising',
    popularAmenities: ['Private Beach', 'Golf Course', 'Marina', 'Luxury Shopping', 'Fine Dining']
  },
  {
    id: 'santo-domingo',
    name: 'Santo Domingo',
    nameES: 'Santo Domingo',
    province: 'Distrito Nacional',
    provinceES: 'Distrito Nacional',
    municipality: 'Santo Domingo',
    municipalityES: 'Santo Domingo',
    region: 'Central',
    isPopular: true,
    isTouristZone: false,
    hasAirport: true,
    hasPort: true,
    coordinates: { lat: 18.4861, lng: -69.9312 },
    averagePrice: { dop: 42000000, usd: 750000 },
    marketTrend: 'stable',
    popularAmenities: ['City Center', 'Business District', 'Healthcare', 'Education', 'Culture']
  },
  {
    id: 'puerto-plata',
    name: 'Puerto Plata',
    nameES: 'Puerto Plata',
    province: 'Puerto Plata',
    provinceES: 'Puerto Plata',
    municipality: 'San Felipe de Puerto Plata',
    municipalityES: 'San Felipe de Puerto Plata',
    region: 'Norte',
    isPopular: true,
    isTouristZone: true,
    hasAirport: true,
    hasPort: true,
    coordinates: { lat: 19.7933, lng: -70.6861 },
    averagePrice: { dop: 28000000, usd: 500000 },
    marketTrend: 'rising',
    popularAmenities: ['Beach Access', 'Cable Car', 'Historic Center', 'Water Sports']
  },
  {
    id: 'la-romana',
    name: 'La Romana',
    nameES: 'La Romana',
    province: 'La Romana',
    provinceES: 'La Romana',
    municipality: 'La Romana',
    municipalityES: 'La Romana',
    region: 'Este',
    isPopular: true,
    isTouristZone: true,
    hasAirport: true,
    hasPort: true,
    coordinates: { lat: 18.4273, lng: -68.9728 },
    averagePrice: { dop: 56000000, usd: 1000000 },
    marketTrend: 'stable',
    popularAmenities: ['Golf Resort', 'Private Island', 'Marina', 'Shopping']
  },
  {
    id: 'samana',
    name: 'Samaná',
    nameES: 'Samaná',
    province: 'Samaná',
    provinceES: 'Samaná',
    municipality: 'Santa Bárbara de Samaná',
    municipalityES: 'Santa Bárbara de Samaná',
    region: 'Norte',
    isPopular: true,
    isTouristZone: true,
    hasAirport: false,
    hasPort: true,
    coordinates: { lat: 19.2044, lng: -69.3365 },
    averagePrice: { dop: 39200000, usd: 700000 },
    marketTrend: 'rising',
    popularAmenities: ['Whale Watching', 'Pristine Beaches', 'Eco-Tourism', 'Waterfalls']
  }
]

// Tax Incentives
export const TAX_INCENTIVES: TaxIncentive[] = [
  {
    id: 'confotur',
    name: 'CONFOTUR Law',
    nameES: 'Ley CONFOTUR',
    description: 'Tourism development incentives for hotel and tourism projects',
    descriptionES: 'Incentivos para el desarrollo turístico en proyectos hoteleros y turísticos',
    category: 'tourism',
    benefitPercentage: 100,
    requirements: [
      'Minimum investment of $3M USD',
      'Located in designated tourism zones',
      'Comply with environmental standards',
      'Create minimum number of jobs'
    ],
    requirementsES: [
      'Inversión mínima de $3M USD',
      'Ubicado en zonas turísticas designadas',
      'Cumplir con estándares ambientales',
      'Crear número mínimo de empleos'
    ],
    duration: '15 years',
    durationES: '15 años',
    law: 'Law 158-01',
    isActive: true
  },
  {
    id: 'rental-income-exemption',
    name: 'Rental Income Tax Exemption',
    nameES: 'Exención de Impuesto sobre Ingresos de Alquiler',
    description: 'Tax exemption on rental income for tourism properties',
    descriptionES: 'Exención de impuestos sobre ingresos de alquiler para propiedades turísticas',
    category: 'investment',
    benefitPercentage: 100,
    requirements: [
      'Property used for short-term tourism rental',
      'Registered with Ministry of Tourism',
      'Comply with tourism standards'
    ],
    requirementsES: [
      'Propiedad usada para alquiler turístico de corta duración',
      'Registrada con el Ministerio de Turismo',
      'Cumplir con estándares turísticos'
    ],
    duration: 'Indefinite',
    durationES: 'Indefinida',
    law: 'Law 158-01',
    isActive: true
  },
  {
    id: 'resident-investment',
    name: 'Resident Investor Benefits',
    nameES: 'Beneficios para Inversionistas Residentes',
    description: 'Tax benefits for foreign investors obtaining residency',
    descriptionES: 'Beneficios fiscales para inversionistas extranjeros que obtengan residencia',
    category: 'residence',
    benefitPercentage: 50,
    requirements: [
      'Investment of minimum $200K USD in real estate',
      'Obtain Dominican residency',
      'Maintain investment for minimum 3 years'
    ],
    requirementsES: [
      'Inversión mínima de $200K USD en bienes raíces',
      'Obtener residencia dominicana',
      'Mantener inversión por mínimo 3 años'
    ],
    duration: '5 years renewable',
    durationES: '5 años renovable',
    law: 'Law 171-07',
    isActive: true
  }
]

// Legal Documents
export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'cedula',
    name: 'Dominican Identification Card',
    nameES: 'Cédula de Identidad y Electoral',
    description: 'Official Dominican Republic identification document',
    descriptionES: 'Documento oficial de identificación de República Dominicana',
    category: 'identity',
    isRequired: true,
    issuingEntity: 'Central Electoral Board (JCE)',
    issuingEntityES: 'Junta Central Electoral (JCE)',
    validity: 'Valid until expiration date',
    validityES: 'Válida hasta fecha de vencimiento',
    cost: { dop: 500, usd: 9 }
  },
  {
    id: 'passport',
    name: 'Dominican Passport',
    nameES: 'Pasaporte Dominicano',
    description: 'Official travel document for international travel',
    descriptionES: 'Documento oficial de viaje para viajes internacionales',
    category: 'identity',
    isRequired: false,
    issuingEntity: 'Ministry of Interior and Police',
    issuingEntityES: 'Ministerio de Interior y Policía',
    validity: '10 years for adults',
    validityES: '10 años para adultos',
    cost: { dop: 2500, usd: 45 }
  },
  {
    id: 'titulo-property',
    name: 'Property Title',
    nameES: 'Título de Propiedad',
    description: 'Legal document proving property ownership',
    descriptionES: 'Documento legal que prueba la propiedad del inmueble',
    category: 'ownership',
    isRequired: true,
    issuingEntity: 'Title Registry Office',
    issuingEntityES: 'Registro de Títulos',
    validity: 'Permanent',
    validityES: 'Permanente',
    cost: { dop: 5000, usd: 89 }
  },
  {
    id: 'certificado-no-gravamen',
    name: 'Certificate of No Liens',
    nameES: 'Certificado de No Gravamen',
    description: 'Certificate confirming property has no liens or encumbrances',
    descriptionES: 'Certificado que confirma que la propiedad no tiene gravámenes',
    category: 'legal',
    isRequired: true,
    issuingEntity: 'Title Registry Office',
    issuingEntityES: 'Registro de Títulos',
    validity: '30 days',
    validityES: '30 días',
    cost: { dop: 1000, usd: 18 }
  },
  {
    id: 'paz-y-salvo',
    name: 'Tax Clearance Certificate',
    nameES: 'Certificado de Paz y Salvo',
    description: 'Certificate confirming all taxes have been paid',
    descriptionES: 'Certificado que confirma que todos los impuestos han sido pagados',
    category: 'tax',
    isRequired: true,
    issuingEntity: 'Internal Revenue Service (DGII)',
    issuingEntityES: 'Dirección General de Impuestos Internos (DGII)',
    validity: '30 days',
    validityES: '30 días',
    cost: { dop: 500, usd: 9 }
  },
  {
    id: 'avaluo',
    name: 'Property Appraisal',
    nameES: 'Avalúo de la Propiedad',
    description: 'Official property valuation for legal and financial purposes',
    descriptionES: 'Valuación oficial de la propiedad para fines legales y financieros',
    category: 'financial',
    isRequired: true,
    issuingEntity: 'Certified Appraiser',
    issuingEntityES: 'Tasador Certificado',
    validity: '6 months',
    validityES: '6 meses',
    cost: { dop: 15000, usd: 268 }
  }
]

// Currency utilities
export const EXCHANGE_RATE_DOP_USD = 56.0 // This should be fetched from API in real implementation

export function convertDopToUsd(dop: number): number {
  return dop / EXCHANGE_RATE_DOP_USD
}

export function convertUsdToDop(usd: number): number {
  return usd * EXCHANGE_RATE_DOP_USD
}

export function formatDominicanCurrency(amount: number, currency: 'DOP' | 'USD' = 'DOP'): string {
  if (currency === 'DOP') {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(amount)
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }
}

// Utility functions
export function getLocationById(id: string): DominicanLocation | undefined {
  return DR_LOCATIONS.find(location => location.id === id)
}

export function getLocationsByRegion(region: string): DominicanLocation[] {
  return DR_LOCATIONS.filter(location => location.region === region)
}

export function getPopularLocations(): DominicanLocation[] {
  return DR_LOCATIONS.filter(location => location.isPopular)
}

export function getTouristZones(): DominicanLocation[] {
  return DR_LOCATIONS.filter(location => location.isTouristZone)
}

export function getActiveTaxIncentives(): TaxIncentive[] {
  return TAX_INCENTIVES.filter(incentive => incentive.isActive)
}

export function getTaxIncentivesByCategory(category: string): TaxIncentive[] {
  return TAX_INCENTIVES.filter(incentive => incentive.category === category && incentive.isActive)
}

export function getRequiredDocuments(): LegalDocument[] {
  return LEGAL_DOCUMENTS.filter(doc => doc.isRequired)
}

export function getDocumentsByCategory(category: string): LegalDocument[] {
  return LEGAL_DOCUMENTS.filter(doc => doc.category === category)
}

// Calculate total document costs
export function calculateDocumentCosts(documents: LegalDocument[], currency: 'DOP' | 'USD' = 'USD'): number {
  return documents.reduce((total, doc) => {
    if (doc.cost) {
      return total + (currency === 'DOP' ? doc.cost.dop : doc.cost.usd)
    }
    return total
  }, 0)
}

// Property investment calculator specific to Dominican Republic
export function calculateDominicanROI({
  propertyPrice,
  monthlyRental,
  currency = 'USD',
  includeAppreciation = true,
  appreciationRate = 0.05,
  expenses = {
    management: 0.1,
    maintenance: 0.02,
    taxes: 0.01,
    insurance: 0.005
  }
}: {
  propertyPrice: number
  monthlyRental: number
  currency?: 'DOP' | 'USD'
  includeAppreciation?: boolean
  appreciationRate?: number
  expenses?: {
    management: number
    maintenance: number
    taxes: number
    insurance: number
  }
}) {
  // Convert to USD if needed
  const priceUSD = currency === 'DOP' ? convertDopToUsd(propertyPrice) : propertyPrice
  const rentalUSD = currency === 'DOP' ? convertDopToUsd(monthlyRental) : monthlyRental
  
  const annualRental = rentalUSD * 12
  const totalExpenseRate = Object.values(expenses).reduce((sum, rate) => sum + rate, 0)
  const annualExpenses = priceUSD * totalExpenseRate
  const netAnnualIncome = annualRental - annualExpenses
  
  const cashOnCashReturn = (netAnnualIncome / priceUSD) * 100
  
  let totalReturn = cashOnCashReturn
  if (includeAppreciation) {
    totalReturn += (appreciationRate * 100)
  }
  
  return {
    cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    annualRental: Math.round(annualRental),
    annualExpenses: Math.round(annualExpenses),
    netAnnualIncome: Math.round(netAnnualIncome),
    breakEvenMonths: Math.round((priceUSD / (netAnnualIncome / 12)) * 100) / 100
  }
}