import { Product } from './product'
export interface Shop {
    id: number
    name: string
    description: string
    logo: string
    banner: string
    socialLinks: {
      facebook?: string
      tiktok?: string
      instagram?: string
      telegram?: string
    }
  }
  
  export interface ShopDetailProps {
    shop: Shop
    products: Product[]
  }
  

  