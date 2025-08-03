import { ProductCard } from "@/components/product-card"
import { products } from "@/data/product"
import type { ProductListProps } from "@/types/product"


function ProductList({
  products,
  title = "Featured Products",
  description = "Discover our curated selection of premium products",
}: ProductListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default function ProductPage() {
  return (
    <ProductList
      products={products}
      title="Featured Products"
      description="Discover our curated selection of premium products"
    />
  )
}
