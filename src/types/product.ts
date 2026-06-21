export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: ProductCategory
  tags: string[]
  specs: ProductSpec[]
  inStock: boolean
  featured: boolean
  badge?: string
}

export interface ProductSpec {
  label: string
  value: string
}

export type ProductCategory =
  | "ventanas-aluminio"
  | "ventanas-pvc"
  | "dvh"
  | "vidrios-templados"
  | "cerramientos"
  | "mamparas"
  | "frentes-vidriados"
  | "espejos"
  | "vidrios-laminados"
  | "a-medida"

export interface CartItem {
  product: Product
  quantity: number
  notes?: string
}

export interface CategoryInfo {
  slug: ProductCategory
  name: string
  description: string
  count: number
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc"
