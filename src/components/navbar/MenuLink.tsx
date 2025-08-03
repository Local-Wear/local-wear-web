"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { useRouter } from "next/navigation";
import { ListItem } from "./NavbarLink";

function MenuLink() {
  const router = useRouter();

  const menLinks = [
    {
      title: "New Arrivals",
      href: "/men/new-arrivals",
      description: "Latest fashion trends for men",
    },
    {
      title: "Collaborations",
      href: "/men/collaborations",
      description: "Exclusive designer partnerships",
    },
    {
      title: "Outfits",
      href: "/men/outfits",
      description: "Complete looks and styling guides",
    },
    {
      title: "Casual Wear",
      href: "/men/casual",
      description: "Everyday essentials and comfort",
    },
    {
      title: "Formal Wear",
      href: "/men/formal",
      description: "Professional and event attire",
    },
  ];

  const womenLinks = [
    {
      title: "New Arrivals",
      href: "/women/new-arrivals",
      description: "Latest trends and seasonal pieces",
    },
    {
      title: "Dresses",
      href: "/women/dresses",
      description: "From casual to formal occasions",
    },
    {
      title: "Collaborations",
      href: "/women/collaborations",
      description: "Exclusive designer collections",
    },
    {
      title: "Accessories",
      href: "/women/accessories",
      description: "Complete your perfect look",
    },
    {
      title: "Sustainable",
      href: "/women/sustainable",
      description: "Eco-friendly fashion choices",
    },
  ];

  const accessoryLinks = [
    {
      title: "Bags & Purses",
      href: "/accessories/bags",
      description: "Handbags, backpacks, and more",
    },
    {
      title: "Jewelry",
      href: "/accessories/jewelry",
      description: "Rings, necklaces, and earrings",
    },
    {
      title: "Watches",
      href: "/accessories/watches",
      description: "Timepieces for every style",
    },
    {
      title: "Footwear",
      href: "/accessories/shoes",
      description: "Shoes, sneakers, and boots",
    },
  ];

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList className="space-x-2">
        {/* Men's Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
          
            onClick={() => router.push("/collection/men")}
            className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
          >
            Men
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2md:w-[500px] grid-cols-1 lg:w-[600px] lg:grid-cols-2">
              {menLinks.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  className="hover:bg-gray-50"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Women's Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => router.push("/collection/women")}
            className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
          >
            Women
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] grid-cols-1 lg:w-[600px] lg:grid-cols-2">
              {womenLinks.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  className="hover:bg-gray-50"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Accessories Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => router.push("/collection/accessories")}
            className="bg-transparent text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
          >
            Accessories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] grid-cols-1 lg:w-[600px] lg:grid-cols-2">
              {accessoryLinks.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  className="hover:bg-gray-50"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default MenuLink;
