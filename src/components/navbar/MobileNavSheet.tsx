"use client";

import useMobileNavSheet from "@/hook/use-mobile-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { Heart, Search, User } from "lucide-react";

function MobileNavSheet() {
  const { isOpen, onClose, onOpen } = useMobileNavSheet();

  const menuCategories = [
    {
      title: "Men",
      href: "/collection/men",
      items: [
        { name: "New Arrivals", href: "/men/new-arrivals" },
        { name: "Collaborations", href: "/men/collaborations" },
        { name: "Outfits", href: "/men/outfits" },
        { name: "Casual Wear", href: "/men/casual" },
        { name: "Formal Wear", href: "/men/formal" },
      ],
    },
    {
      title: "Women",
      href: "/collection/women",
      items: [
        { name: "New Arrivals", href: "/women/new-arrivals" },
        { name: "Dresses", href: "/women/dresses" },
        { name: "Collaborations", href: "/women/collaborations" },
        { name: "Accessories", href: "/women/accessories" },
        { name: "Sustainable", href: "/women/sustainable" },
      ],
    },
    {
      title: "Accessories",
      href: "/collection/accessories",
      items: [
        { name: "Bags & Purses", href: "/accessories/bags" },
        { name: "Jewelry", href: "/accessories/jewelry" },
        { name: "Watches", href: "/accessories/watches" },
        { name: "Footwear", href: "/accessories/shoes" },
      ],
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <SheetContent className="w-[300px] sm:w-[350px] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-4">
            <Link
              href={"/user"}
              className="text-sm hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href={"/favorites"}
              className="text-sm hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link
              href={"/search"}
              className="text-sm hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="flex flex-col space-y-6 px-4">
          {menuCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <Link href={category.href} onClick={onClose} className="block">
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  {category.title}
                </h3>
              </Link>
              <div className="space-y-2 pl-4">
                {category.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t pt-6 space-y-3">
            <Link href="/search" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Search
              </Button>
            </Link>
            <Link href="/cart" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Cart
              </Button>
            </Link>
            <Link href="/account" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Account
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavSheet;
