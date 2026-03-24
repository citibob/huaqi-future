import type { PokemonCard, UserPreferences, RecommendedCard, PokemonType } from './types'
import { POKEMON_CARDS } from './pokemon-data'

// ─── Local Storage Keys ──────────────────────────────────────────────────────
const PREFS_KEY = 'huaqi_user_prefs'
const VIEW_KEY = 'huaqi_view_history'

// ─── Preference Persistence ──────────────────────────────────────────────────
export function loadPreferences(): UserPreferences {
  if (typeof window === 'undefined') return defaultPreferences()
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    return raw ? { ...defaultPreferences(), ...JSON.parse(raw) } : defaultPreferences()
  } catch {
    return defaultPreferences()
  }
}

export function savePreferences(prefs: Partial<UserPreferences>): void {
  if (typeof window === 'undefined') return
  const current = loadPreferences()
  localStorage.setItem(PREFS_KEY, JSON.stringify({ ...current, ...prefs }))
}

export function recordView(cardId: string): void {
  if (typeof window === 'undefined') return
  const prefs = loadPreferences()
  const views = [cardId, ...prefs.viewedCards.filter(id => id !== cardId)].slice(0, 50)
  savePreferences({ viewedCards: views })
}

function defaultPreferences(): UserPreferences {
  return {
    viewedCards: [],
    favoriteTypes: [],
    priceRange: { min: 0, max: 100000 },
    preferredCondition: 'all',
    preferredSeries: [],
    language: 'cn',
  }
}

// ─── Scoring Engine ──────────────────────────────────────────────────────────

/**
 * Multi-signal recommendation scoring:
 *
 * 1. Type affinity    — user's viewed cards imply type preferences
 * 2. Series affinity  — same series as recently viewed
 * 3. Price opportunity— cards below median price get a boost
 * 4. Trending boost   — high recent sold count + positive price change
 * 5. Relationship     — explicit relatedIds from data
 * 6. Novelty penalty  — already-viewed cards score lower
 */
export function getRecommendations(
  prefs: UserPreferences,
  exclude: string[] = [],
  limit = 8
): RecommendedCard[] {
  const viewedSet = new Set(prefs.viewedCards)
  const excludeSet = new Set(exclude)

  // Infer type affinity from viewed cards
  const typeScores: Partial<Record<PokemonType, number>> = {}
  for (const id of prefs.viewedCards.slice(0, 10)) {
    const card = POKEMON_CARDS.find(c => c.id === id)
    if (!card) continue
    for (const t of card.types) {
      typeScores[t] = (typeScores[t] ?? 0) + 1
    }
  }

  // Infer series affinity
  const seriesScores: Record<string, number> = {}
  for (const id of prefs.viewedCards.slice(0, 10)) {
    const card = POKEMON_CARDS.find(c => c.id === id)
    if (!card) continue
    seriesScores[card.series] = (seriesScores[card.series] ?? 0) + 1
  }

  // Related card boost
  const relatedBoost: Record<string, number> = {}
  for (const id of prefs.viewedCards.slice(0, 5)) {
    const card = POKEMON_CARDS.find(c => c.id === id)
    if (!card) continue
    for (const rel of card.relatedIds) {
      relatedBoost[rel] = (relatedBoost[rel] ?? 0) + 20
    }
  }

  const candidates = POKEMON_CARDS.filter(c => !excludeSet.has(c.id))

  const scored: RecommendedCard[] = candidates.map(card => {
    let score = 0
    const reasons: string[] = []

    // 1. Type affinity
    let typeScore = 0
    for (const t of card.types) {
      typeScore += (typeScores[t] ?? 0) * 15
    }
    if (typeScore > 0) {
      score += Math.min(typeScore, 45)
      reasons.push('符合你的类型偏好')
    }

    // 2. Series affinity
    const seriesScore = (seriesScores[card.series] ?? 0) * 10
    if (seriesScore > 0) {
      score += Math.min(seriesScore, 30)
      reasons.push('来自你感兴趣的系列')
    }

    // 3. Price opportunity
    if (card.isBelowMedian) {
      const discount = 1 - card.priceJPY / card.medianPriceJPY
      const priceBoost = Math.round(discount * 100)
      score += priceBoost
      reasons.push(`低于市场均价 ${Math.round(discount * 100)}%`)
    }

    // 4. Trending
    if (card.priceChange24h > 3) {
      score += 15
      reasons.push('价格快速上涨中')
    }
    if (card.soldCount7d > 40) {
      score += 10
      reasons.push('近期热销')
    }

    // 5. Related card boost
    score += relatedBoost[card.id] ?? 0
    if (relatedBoost[card.id]) {
      reasons.push('与你浏览的卡牌相关')
    }

    // 6. Novelty
    if (card.isNewListing) {
      score += 8
      reasons.push('新上架')
    }

    // 7. Penalty for already viewed
    if (viewedSet.has(card.id)) {
      score *= 0.3
    }

    // 8. Price range filter
    const withinRange =
      card.priceJPY >= prefs.priceRange.min && card.priceJPY <= prefs.priceRange.max
    if (!withinRange) score *= 0.1

    // Base score so all cards have at least something
    score += card.isHot ? 5 : 0

    return {
      card,
      score: Math.round(score),
      reasons: reasons.slice(0, 2),
    }
  })

  return scored
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Cold-start recommendations for new users (no history)
 */
export function getColdStartRecommendations(limit = 8): RecommendedCard[] {
  const topCards = POKEMON_CARDS
    .filter(c => c.isHot)
    .sort((a, b) => b.soldCount7d - a.soldCount7d)
    .slice(0, limit)

  return topCards.map(card => ({
    card,
    score: card.soldCount7d,
    reasons: ['本周热门', card.isBelowMedian ? '当前低于均价' : '高人气卡牌'],
  }))
}

/**
 * "Similar cards" for detail pages
 */
export function getSimilarCards(cardId: string, limit = 6): PokemonCard[] {
  const source = POKEMON_CARDS.find(c => c.id === cardId)
  if (!source) return []

  const relatedSet = new Set(source.relatedIds)

  return POKEMON_CARDS
    .filter(c => c.id !== cardId)
    .map(c => {
      let score = 0
      if (relatedSet.has(c.id)) score += 50
      if (c.series === source.series) score += 20
      const typeOverlap = c.types.filter(t => source.types.includes(t)).length
      score += typeOverlap * 15
      if (c.rarity === source.rarity) score += 10
      return { card: c, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.card)
}
