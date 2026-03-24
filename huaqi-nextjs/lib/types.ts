export type PokemonType =
  | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ghost'
  | 'dragon' | 'dark' | 'fairy' | 'normal' | 'ice' | 'fighting'

export type CardCondition = 'raw' | 'psa10' | 'bgs10' | 'cgc10'
export type CardRarity = 'AR' | 'SAR' | 'SR' | 'UR' | 'RR' | 'MUR' | 'MA' | 'SIR'
export type Series = 'SV3a' | 'SV4a' | 'SV5a' | 'SV6a' | 'SV8a' | 'SV8pt5' | 'SV151' | 'ME01' | 'ME02' | 'SV12a'
export type Market = 'mercari' | 'ebay' | 'aliexpress' | 'yahoo'

export interface PokemonCard {
  id: string
  nameJP: string
  nameCN: string
  nameEN: string
  series: Series
  cardNumber: string
  rarity: CardRarity
  types: PokemonType[]
  imageUrl: string
  // Pricing
  priceJPY: number
  priceCNY: number
  medianPriceJPY: number
  lowestPriceJPY: number
  priceChange24h: number // percentage
  // Market data
  availableOn: Market[]
  onSaleCount: number
  soldCount7d: number
  // Metadata
  isHot: boolean
  isBelowMedian: boolean
  isNewListing: boolean
  gradedAvailable: boolean
  gradedPriceJPY?: number
  // Recommendation data
  tags: string[]
  relatedIds: string[]
}

export interface GemPack {
  id: string
  volume: 1 | 2 | 3 | 4
  nameJP: string
  nameCN: string
  priceJPY: number
  priceCNY: number
  medianPriceJPY: number
  onSaleCount: number
  isSealed: boolean
  imageUrl: string
}

export interface MarketListing {
  id: string
  cardId: string
  market: Market
  priceJPY: number
  priceCNY: number
  condition: CardCondition
  listingUrl: string
  listedAt: Date
  isBelowMedian: boolean
  arbitrageOpportunity?: {
    buyMarket: Market
    sellMarket: Market
    potentialProfit: number
  }
}

export interface UserPreferences {
  viewedCards: string[]
  favoriteTypes: PokemonType[]
  priceRange: { min: number; max: number }
  preferredCondition: 'raw' | 'graded' | 'all'
  preferredSeries: Series[]
  language: 'jp' | 'cn' | 'en'
}

export interface RecommendedCard {
  card: PokemonCard
  score: number
  reasons: string[]
}

export interface PricePoint {
  date: string
  priceJPY: number
  priceCNY: number
  market: Market
}
