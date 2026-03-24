/**
 * Gem Pack Data Provider
 * 
 * Priority:
 * 1. Fetch from local Python API (mercari_monitor.py)
 * 2. Fall back to mock data
 * 
 * To enable real data, run the monitor script and expose it via API.
 */

export const JPY_TO_CNY = 0.04334

export interface GemPackData {
  id: string
  nameJP: string
  nameCN: string
  nameEN: string
  vol: string
  code: string
  priceJPY: number
  priceCNY: number
  onSaleCount: number
  medianPriceJPY: number
  lowestPriceJPY: number
  priceChange24h: number
  soldCount7d: number
  isSealed: boolean
  isHot: boolean
  isBelowMedian: boolean
  imageUrl: string
  mercariUrl: string
  yahooUrl: string
  descriptionJP: string
  descriptionCN: string
  tags: string[]
  lastUpdated?: string
}

// Mock data - will be replaced by real API data
const MOCK_DATA: GemPackData[] = [
  {
    id: 'gem-pack-vol1',
    nameJP: 'ジェムパック Vol.1',
    nameCN: 'ジェムパック 第1弾',
    nameEN: 'Gem Pack VOL.1',
    vol: 'VOL.1',
    code: 'SV3a',
    priceJPY: 7500,
    priceCNY: Math.round(7500 * JPY_TO_CNY * 100) / 100,
    onSaleCount: 3,
    medianPriceJPY: 7500,
    lowestPriceJPY: 7500,
    priceChange24h: -2.5,
    soldCount7d: 45,
    isSealed: true,
    isHot: true,
    isBelowMedian: true,
    imageUrl: '/images/vol1-wiki-poster.webp',
    mercariUrl: 'https://jp.mercari.com/search?keyword=ジェムパック+vol.1+ポケモン',
    yahooUrl: 'https://auctions.yahoo.co.jp/search?query=ジェムパックvol1',
    descriptionJP: 'パルデア地方の御三家ニャオハ・ホゲータ・クワッスが登場。全カードがキラカード仕様。キャプテンピカチュウ収録。2025年1月17日発売。',
    descriptionCN: '帕底亚御三家新叶喵、呆火鳄、润水鸭登场。全卡闪卡。收录船长皮卡丘。',
    tags: ['vol1', 'cbb1c', '未開封', 'BOX'],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'gem-pack-vol2',
    nameJP: 'ジェムパック Vol.2',
    nameCN: 'ジェムパック 第2弾',
    nameEN: 'Gem Pack VOL.2',
    vol: 'VOL.2',
    code: 'SV3b',
    priceJPY: 9580,
    priceCNY: Math.round(9580 * JPY_TO_CNY * 100) / 100,
    onSaleCount: 3,
    medianPriceJPY: 9580,
    lowestPriceJPY: 9580,
    priceChange24h: 1.2,
    soldCount7d: 34,
    isSealed: true,
    isHot: true,
    isBelowMedian: true,
    imageUrl: '/images/gem-pack-vol2.png',
    mercariUrl: 'https://jp.mercari.com/search?keyword=ジェムパック+vol.2+ポケモン',
    yahooUrl: 'https://auctions.yahoo.co.jp/search?query=ジェムパックvol2',
    descriptionJP: 'イーブイと全進化形態が集結。ニンフィア表紙。4枚つなぎイラストカード収録。ポケモンV・VMAXカード搭載。2025年5月16日発売。',
    descriptionCN: '伊布全进化形态集结。仙子伊布封面。收录4张拼接插画卡。含V/VMAX卡。',
    tags: ['vol2', 'cbb2c', '未開封', 'イーブイ'],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'gem-pack-vol3',
    nameJP: 'ジェムパック Vol.3',
    nameCN: 'ジェムパック 第3弾',
    nameEN: 'Gem Pack VOL.3',
    vol: 'VOL.3',
    code: 'SV3c',
    priceJPY: 7400,
    priceCNY: Math.round(7400 * JPY_TO_CNY * 100) / 100,
    onSaleCount: 10,
    medianPriceJPY: 7400,
    lowestPriceJPY: 5280,
    priceChange24h: -1.8,
    soldCount7d: 65,
    isSealed: true,
    isHot: false,
    isBelowMedian: true,
    imageUrl: '/images/vol3-wiki-poster.png',
    mercariUrl: 'https://jp.mercari.com/search?keyword=ジェムパック+vol.3+ポケモン',
    yahooUrl: 'https://auctions.yahoo.co.jp/search?query=ジェムパックvol3',
    descriptionJP: '夜行性ポケモンをテーマにゲンガーが表紙。ポケモンexキラカード、9種のアートイラストキラカード収録。マスターボール柄カードも。2025年9月26日発売。',
    descriptionCN: '夜行寶可夢テーマ、耿鬼表紙。exホロ、万が国 예술 ilustores カード収録。大師球パターソカード含む。',
    tags: ['vol3', 'cbb3c', '未開封', 'ゲンガー'],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'gem-pack-vol4',
    nameJP: 'ジェムパック Vol.4',
    nameCN: 'ジェムパック 第4弾',
    nameEN: 'Gem Pack VOL.4',
    vol: 'VOL.4',
    code: 'SV3d',
    priceJPY: 6730,
    priceCNY: Math.round(6730 * JPY_TO_CNY * 100) / 100,
    onSaleCount: 2,
    medianPriceJPY: 6730,
    lowestPriceJPY: 5480,
    priceChange24h: 3.2,
    soldCount7d: 5,
    isSealed: false,
    isHot: false,
    isBelowMedian: true,
    imageUrl: '/images/vol4-wiki-poster.png',
    mercariUrl: 'https://jp.mercari.com/search?keyword=ジェムパック+vol.4+ポケモン',
    yahooUrl: 'https://auctions.yahoo.co.jp/search?query=ジェムパックvol4',
    descriptionJP: 'ポニータ＆ギャロップが表紙の最新弾。新春テーマ。属性シンボル・マスターボール柄・金箔押しカード収録。アートイラストカードも充実。2026年2月6日発売。',
    descriptionCN: '小火马与烈焰马封面的最新弹。新春主题。收录属性符号、大师球花纹、烫金卡。',
    tags: ['vol4', 'cbb4c', '新発売', 'ポニータ'],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'gem-pack-vol5',
    nameJP: 'ジェムパック Vol.5',
    nameCN: 'ジェムパック 第5弾',
    nameEN: 'Gem Pack VOL.5',
    vol: 'VOL.5',
    code: 'SV3e',
    priceJPY: 0,
    priceCNY: 0,
    onSaleCount: 0,
    medianPriceJPY: 0,
    lowestPriceJPY: 0,
    priceChange24h: 0,
    soldCount7d: 0,
    isSealed: true,
    isHot: false,
    isBelowMedian: false,
    imageUrl: '/images/vol5-cover.png',
    mercariUrl: 'https://jp.mercari.com/search?keyword=ジェムパック+vol.5+ポケモン',
    yahooUrl: 'https://auctions.yahoo.co.jp/search?query=ジェムパックvol5',
    descriptionJP: '地平線の冒険をテーマにした最新弾。蒂蕾喵・炙烫鳄・涌跃鸭が登場。キャプテンピカチュウとフリードの冒険を描いたアートカード収録。2026年4月24日発売予定。',
    descriptionCN: '以地平线冒险为主题的最新弹。蒂蕾喵、炙烫鳄、涌跃鸭登场。收录船长皮卡丘与弗里德冒险主题艺术卡。2026年4月24日发售。',
    tags: ['vol5', 'cbb5c', '予約受付中', '新発売'],
    lastUpdated: new Date().toISOString(),
  },
]

// Export mock data for now
export const GEM_PACKS: GemPackData[] = MOCK_DATA

export function getGemPackById(id: string): GemPackData | undefined {
  return GEM_PACKS.find(p => p.id === id)
}

export function getHotGemPacks(): GemPackData[] {
  return GEM_PACKS.filter(p => p.isHot)
}

export function getNewGemPacks(): GemPackData[] {
  return [...GEM_PACKS].sort((a, b) => b.priceChange24h - a.priceChange24h)
}

// Get real-time data from API
export async function fetchGemPacksRealTime(): Promise<GemPackData[]> {
  try {
    const res = await fetch('/api/gempacks', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      return data.gemPacks || GEM_PACKS
    }
  } catch (e) {
    console.warn('Failed to fetch real-time data, using mock data')
  }
  return GEM_PACKS
}
