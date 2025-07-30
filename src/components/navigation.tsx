"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Nextgen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                FAQs
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Men
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Women
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Children
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Brands
              </Link>
            </div>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10 w-64"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 sm:hidden" />
                <User className="h-5 w-5 hidden sm:block" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                FAQs
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Men
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Women
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Children
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Brands
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}