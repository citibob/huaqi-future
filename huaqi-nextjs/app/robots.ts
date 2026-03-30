import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.huaqi.jp/sitemap.xml',
    host: 'https://www.huaqi.jp',
  }
}
