"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProductCardProps } from "../types/product"

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group py-0 relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="relative overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.discount && <Badge variant="destructive">-{product.discount}%</Badge>}
        </div>
        {/* Wishlist Button (still shows on hover) */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm "
        >
          <Heart className="h-4 w-4" />
        </Button>
        {/* Product Image */}
        <div className="aspect-square rounded-md overflow-hidden bg-gray-100 relative">
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
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
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {/* Always visible Add to Cart Button */}
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </CardContent>
    </div>
  )
}
