"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  RotateCcw,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// Mock product data - in a real app this would come from an API
const productData = {
  id: "1",
  name: "Unisex Sponge Fleece Pullover Hoodie",
  brand: "Nextgen",
  price: 49.99,
  originalPrice: 64.99,
  rating: 4.7,
  reviewCount: 127,
  images: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  description:
    "Our go-to Unisex Sponge Fleece Pullover Hoodie is remarkably soft, with a comfortable, loose fit that's versatile and ideal for daily wear. Spun from a plush sponge fleece fabric made of Airlume combed and ring-spun cotton and polyester fibers, this hoodie features a contemporary fit, a warm hood with matching drawcords, and a roomy kangaroo pocket. Perfect for layering or wearing on its own.",
  material: "52% Airlume combed and ring-spun cotton, 48% polyester fleece",
  weight: "8.0 oz/yd² (271 gsm)",
  fit: "Unisex sizing with a relaxed, comfortable fit",
  care: "Machine wash cold, tumble dry low, do not iron decoration",
  features: [
    "Free Shipping on orders over $50",
    "Express Delivery Available",
    "2-4 Business Days",
    "Estimated delivery: Dec 18-22, 2024",
  ],
  reviews: [
    {
      id: 2,
      author: "Mike Rodriguez",
      rating: 4,
      date: "8 Dec 2024",
      comment:
        "Great hoodie for the price. Very comfortable and warm. The kangaroo pocket is spacious and the hood fits well. Only minor complaint is that it's slightly longer than expected, but overall very satisfied.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
  ],
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
    console.log("Added to cart:", {
      productId: params.id,
      size: selectedSize,
      quantity,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Product details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={productData.images[selectedImage]}
                alt={productData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {productData.brand}
              </p>
              <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold">${productData.price}</span>
                {productData.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${productData.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {renderStars(productData.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {productData.rating}/5 ({productData.reviewCount} New Reviews)
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Select Size
              </label>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorited(!isFavorited)}
                className="px-3"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4">
              {/* Description */}
              <div className="border-b border-border pb-4">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="flex items-center justify-between w-full text-left font-medium"
                >
                  <span>Description & Fit</span>
                  {isDescriptionOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {isDescriptionOpen && (
                  <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>{productData.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-border">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Material
                        </h4>
                        <p>{productData.material}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Weight
                        </h4>
                        <p>{productData.weight}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Fit
                        </h4>
                        <p>{productData.fit}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Care Instructions
                        </h4>
                        <p>{productData.care}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div className="border-b border-border pb-4">
                <button
                  onClick={() => setIsShippingOpen(!isShippingOpen)}
                  className="flex items-center justify-between w-full text-left font-medium"
                >
                  <span>Shipping</span>
                  {isShippingOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {isShippingOpen && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Free Shipping</p>
                        <p className="text-xs text-muted-foreground">
                          Regular Package
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <RotateCcw className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">3-5 Working Days</p>
                        <p className="text-xs text-muted-foreground">
                          10-15 October 2024
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Rating & Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">
                  {productData.rating}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(productData.rating)}
                </div>
                <p className="text-sm text-muted-foreground">
                  ({productData.reviewCount} New Reviews)
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {productData.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <Image
                          src={review.avatar}
                          alt={review.author}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.author}</h4>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex mb-3">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
