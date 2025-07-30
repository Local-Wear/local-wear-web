import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Local Wear</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover the latest fashion trends and styles
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
            <Link href="/product/1">
              <CardContent className="p-0">
                <div className="aspect-[4/5] relative overflow-hidden rounded-t-lg bg-gray-100">
                  <div className="w-full h-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Loose Fit Hoodie</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Loose Fit Hoodie</h3>
                  <p className="text-sm text-muted-foreground mb-2">Max Fashion</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">$24.99</span>
                    <span className="text-sm text-muted-foreground line-through">$29.99</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
            <Link href="/product/2">
              <CardContent className="p-0">
                <div className="aspect-[4/5] relative overflow-hidden rounded-t-lg bg-gray-100">
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">Polo Shirt</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Polo with Contrast Trims</h3>
                  <p className="text-sm text-muted-foreground mb-2">Max Fashion</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">$212</span>
                    <span className="text-sm text-muted-foreground line-through">$250</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          
          <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
            <Link href="/product/3">
              <CardContent className="p-0">
                <div className="aspect-[4/5] relative overflow-hidden rounded-t-lg bg-gray-100">
                  <div className="w-full h-full bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">T-Shirt</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Gradient Graphic T-shirt</h3>
                  <p className="text-sm text-muted-foreground mb-2">Max Fashion</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">$145</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
        
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/product/1">View Product Detail Page</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
