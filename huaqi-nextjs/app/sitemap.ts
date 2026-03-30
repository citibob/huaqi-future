import type { MetadataRoute } from 'next'
import { POKEMON_CARDS } from '@/lib/pokemon-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.huaqi.jp'
  const now = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/business`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/packs`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/packs/gem-pack-vol1`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/packs/gem-pack-vol2`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/packs/gem-pack-vol3`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/packs/gem-pack-vol4`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/packs/gem-pack-vol5`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/company`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/market`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/pokemon`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/culture`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/law`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Pokemon card detail pages (SEO: index all 20 card detail pages)
  const pokemonRoutes: MetadataRoute.Sitemap = POKEMON_CARDS.map((card) => ({
    url: `${baseUrl}/pokemon/${card.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...pokemonRoutes]
}
