export interface Product {
    id: number
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    discount?: number
  }
  
  export interface ProductCardProps {
    product: Product
  }
  
  export interface ProductListProps {
    products: Product[]
    title?: string
    description?: string
  }
  