import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PokemonType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatJPY(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`
}

export function formatCNY(amount: number): string {
  return `¥${amount.toFixed(2)}`
}

export function formatPriceChange(pct: number): string {
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

/** Mercari JP 已成交页面（按成交价从高到低） */
export function mercariSoldUrl(nameJP: string, rarity: string): string {
  const keyword = `${nameJP} ${rarity}`
  return `https://jp.mercari.com/search?keyword=${encodeURIComponent(keyword)}&status=sold_out&sort=price&order=desc`
}

export const TYPE_COLORS: Record<PokemonType, string> = {
  fire:     'from-orange-500 to-red-600',
  water:    'from-blue-400 to-blue-600',
  grass:    'from-green-400 to-emerald-600',
  electric: 'from-yellow-300 to-amber-500',
  psychic:  'from-pink-400 to-purple-500',
  ghost:    'from-purple-600 to-indigo-800',
  dragon:   'from-indigo-500 to-blue-800',
  dark:     'from-gray-700 to-gray-900',
  fairy:    'from-pink-300 to-pink-500',
  normal:   'from-gray-400 to-gray-600',
  ice:      'from-cyan-300 to-blue-400',
  fighting: 'from-orange-600 to-red-700',
}

export const TYPE_BADGE_COLORS: Record<PokemonType, string> = {
  fire:     'bg-orange-500/20 text-orange-300 border-orange-500/30',
  water:    'bg-blue-500/20 text-blue-300 border-blue-500/30',
  grass:    'bg-green-500/20 text-green-300 border-green-500/30',
  electric: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  psychic:  'bg-pink-500/20 text-pink-300 border-pink-500/30',
  ghost:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
  dragon:   'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  dark:     'bg-gray-500/20 text-gray-300 border-gray-500/30',
  fairy:    'bg-pink-400/20 text-pink-200 border-pink-400/30',
  normal:   'bg-gray-400/20 text-gray-300 border-gray-400/30',
  ice:      'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  fighting: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export const TYPE_NAMES_CN: Record<PokemonType, string> = {
  fire: '火', water: '水', grass: '草', electric: '电',
  psychic: '超能', ghost: '幽灵', dragon: '龙', dark: '恶',
  fairy: '妖精', normal: '一般', ice: '冰', fighting: '格斗',
}

export const SERIES_LABELS: Record<string, string> = {
  SV3a: '宝石之力',
  SV4a: '超越天空之梦',
  SV5a: '扩展包 SV5a',
  SV6a: '双璧之斗士',
  SV8a: 'テラスタルフェスex',
  SV8pt5: 'プリズマティックエボリューション',
  SV151: 'ポケモンカード151',
  ME01: '幻炎の闘撃',
  ME02: 'MEGAドリームex',
  SV12a: '扩展包 SV12a',
}

export const RARITY_COLORS: Record<string, string> = {
  AR:  'text-blue-400',
  SAR: 'text-purple-400',
  SR:  'text-yellow-400',
  UR:  'text-orange-400',
  RR:  'text-green-400',
  MUR: 'text-pink-400',
  MA:  'text-red-400',
  SIR: 'text-amber-400',
}
