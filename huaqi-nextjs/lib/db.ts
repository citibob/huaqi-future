export const getDB = () => {
  // In Cloudflare Pages, the D1 binding is injected into the environment
  // For local development with wrangler, it's also available
  const db = (process.env as any).DB
  if (!db) {
    console.warn('D1 Database binding (DB) not found in environment')
  }
  return db
}

export interface Product {
  id: string
  name_jp: string
  name_cn: string
  name_en: string
  vol: string
  code: string
  price_jpy: number
  is_sealed: number // SQLite uses 0/1 for boolean
  is_hot: number
  image_url: string
  description_jp: string
  description_cn: string
  stock_count: number
}
