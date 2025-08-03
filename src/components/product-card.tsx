import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { ProductCardProps } from "../types/product"

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group py-0 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.discount && <Badge variant="destructive">-{product.discount}%</Badge>}
        </div>
        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform group-hover:translate-y-0">
          <Button className="w-full rounded-none" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight">{product.name}</h3>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : i < product.rating
                      ? "fill-yellow-400/50 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}