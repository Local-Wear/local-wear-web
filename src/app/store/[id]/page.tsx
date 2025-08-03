"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
  Star,
  Users,
  Verified,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock store data - in a real app this would come from an API
const storeData = {
  id: "1",
  name: "Max Fashion",
  description:
    "Your premier destination for contemporary fashion and lifestyle products. We curate the finest selection of clothing, accessories, and lifestyle items from both emerging and established brands.",
  banner:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
  logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
  rating: 4.8,
  reviewCount: 2847,
  location: "Downtown Fashion District, New York",
  phone: "+1 (555) 123-4567",
  email: "hello@maxfashion.com",
  website: "www.maxfashion.com",
  hours: "Mon-Sat: 9AM-9PM, Sun: 11AM-7PM",
  isVerified: true,
  totalCustomers: "50K+",
  yearsInBusiness: 8,
  responseTime: "Usually responds within 2 hours",
  categories: [
    { id: "1", name: "Hoodies & Sweatshirts", count: 45 },
    { id: "2", name: "T-Shirts & Tops", count: 78 },
    { id: "3", name: "Jeans & Pants", count: 32 },
    { id: "4", name: "Dresses", count: 56 },
    { id: "5", name: "Accessories", count: 89 },
    { id: "6", name: "Shoes", count: 67 },
  ],
  featuredProducts: [
    {
      id: "1",
      name: "Loose Fit Hoodie",
      price: 24.99,
      originalPrice: 29.99,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
      category: "Hoodies & Sweatshirts",
    },
    {
      id: "2",
      name: "Polo with Contrast Trims",
      price: 212,
      originalPrice: 250,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=400&fit=crop",
      category: "T-Shirts & Tops",
    },
    {
      id: "3",
      name: "Gradient Graphic T-shirt",
      price: 145,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      category: "T-Shirts & Tops",
    },
  ],
};

export default function StoreDetailPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  const filteredProducts = selectedCategory
    ? storeData.featuredProducts.filter(
        (product) => product.category === selectedCategory
      )
    : storeData.featuredProducts;

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
      {/* Enhanced Navigation breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav aria-label="Breadcrumb" className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-foreground transition-colors duration-200 flex items-center gap-1"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-foreground font-medium">Store Details</span>
          </div>
        </nav>

        {/* Enhanced Store Banner */}
        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 group">
          <Image
            src={storeData.banner}
            alt={`${storeData.name} banner`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Banner Content */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-3">
              {storeData.isVerified && (
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <Verified className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm font-medium">
                    Verified Store
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">
                  {storeData.yearsInBusiness} Years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Store Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Store Info */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Store Logo */}
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-white shadow-xl flex-shrink-0 ring-4 ring-white">
                  <Image
                    src={storeData.logo}
                    alt={`${storeData.name} logo`}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Store Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <div className="mb-4 sm:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-bold">{storeData.name}</h1>
                        {storeData.isVerified && (
                          <Verified className="w-6 h-6 text-blue-500" />
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1">
                          {renderStars(storeData.rating)}
                          <span className="ml-2 font-semibold text-lg">
                            {storeData.rating}
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          ({storeData.reviewCount.toLocaleString()} reviews)
                        </span>
                      </div>

                      {/* Trust Indicators */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                          <Users className="w-4 h-4" />
                          <span>{storeData.totalCustomers} customers</span>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                          <MessageCircle className="w-4 h-4" />
                          <span>{storeData.responseTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsFavorited(!isFavorited)}
                        className="transition-all duration-200 hover:scale-105"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isFavorited ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span className="sr-only">Add to favorites</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="transition-all duration-200 hover:scale-105"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="sr-only">Share store</span>
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                    {storeData.description}
                  </p>

                  {/* Enhanced Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-full bg-primary/10">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">
                          Location
                        </p>
                        <p className="text-sm">{storeData.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">
                          Hours
                        </p>
                        <p className="text-sm">{storeData.hours}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">
                          Phone
                        </p>
                        <p className="text-sm">{storeData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">
                          Email
                        </p>
                        <p className="text-sm">{storeData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors md:col-span-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">
                          Website
                        </p>
                        <p className="text-sm">{storeData.website}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Store Actions */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full h-12 text-base font-medium transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Store
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-medium transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Visit Website
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-medium transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>

                {/* Store Stats */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4 text-center">
                    Store Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Total Products
                      </span>
                      <span className="font-semibold">
                        {storeData.categories.reduce(
                          (sum, cat) => sum + cat.count,
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Categories
                      </span>
                      <span className="font-semibold">
                        {storeData.categories.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Avg. Rating
                      </span>
                      <span className="font-semibold">
                        {storeData.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Categories Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Product Categories</h2>
            <p className="text-muted-foreground text-lg">
              Explore our curated collection across different categories
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full h-12 px-6 text-base font-medium transition-all duration-200 hover:scale-105"
            >
              All Products
              <Badge variant="secondary" className="ml-2">
                {storeData.categories.reduce((sum, cat) => sum + cat.count, 0)}
              </Badge>
            </Button>
            {storeData.categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.name)}
                className="rounded-full h-12 px-6 text-base font-medium transition-all duration-200 hover:scale-105"
              >
                {category.name}
                <Badge
                  variant={
                    selectedCategory === category.name ? "outline" : "secondary"
                  }
                  className="ml-2"
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Featured Products */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory ? `${selectedCategory}` : "Featured Products"}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}{" "}
                available
              </p>
            </div>
            <Button
              variant="outline"
              asChild
              className="transition-all duration-200 hover:scale-105"
            >
              <Link href="/products" className="flex items-center gap-2">
                View All Products
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Link href={`/product/${product.id}`}>
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 backdrop-blur-sm text-black border-0 shadow-lg"
                        >
                          {product.category}
                        </Badge>
                      </div>

                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 text-white border-0 shadow-lg">
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % OFF
                          </Badge>
                        </div>
                      )}

                      {/* Quick Action Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <span className="text-sm font-medium text-black">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold mb-3 text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-xl text-primary">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ChevronRight className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-4xl">🛍️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try selecting a different category or check back later.
              </p>
              <Button
                onClick={() => setSelectedCategory(null)}
                variant="outline"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
