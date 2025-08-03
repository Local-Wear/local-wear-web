import { ProductCard } from "@/components/product-card";
import { ShopHeader } from "@/components/shop-header";
import { products } from "@/data/product";
import { shopData } from "@/data/shop";

export default function ShopDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Shop Header (Banner + Profile) */}
        <ShopHeader shop={shopData} />
        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Products</h2>
            <p className="text-gray-600">Discover our curated collection of premium products</p>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
