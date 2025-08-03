import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import MenuLink from "./MenuLink";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import MobileNavTrigger from "./MobileNavTrigger";
import MobileNavSheet from "./MobileNavSheet";

const navLinks = [
  {
    title: "Stationary",
    href: "/stationary",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Join Us",
    href: "/join-us",
  },
];
function Navbar() {
  return (
    <Card className="w-full h-14 rounded-none fixed top-0 z-50 flex justify-center md:px-6 px-2 bg-transparent border-transparent text-white">
      <div className=" flex justify-between items-center w-full">
        <div className="md:hidden flex">
          <MobileNavTrigger />
        </div>
        <nav className="hidden md:flex space-x-6">
          <MenuLink />
        </nav>
        <div>
          <Link className="md:text-2xl text-lg font-bold" href={"/"}>
            The Local Wear
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="md:text-sm sm:flex hidden text-xs hover:text-primary transition-colors"
            >
              {link.title}
            </Link>
          ))}
          <Link
            href={"/favorites"}
            className="text-sm sm:flex hidden hover:text-primary transition-colors"
          >
            <Heart className="md:h-5 md:w-5 w-4 h-4" />
          </Link>
          <Link
            href={"/search"}
            className="text-sm sm:flex hidden hover:text-primary transition-colors"
          >
            <Search className="md:h-5 md:w-5 w-4 h-4" />
          </Link>
          <Link
            href={"/user"}
            className="text-sm hover:text-primary transition-colors"
          >
            <User className="md:h-5 md:w-5 w-4 h-4" />
          </Link>
          <Link
            href={"/user"}
            className="text-sm hover:text-primary transition-colors"
          >
            <ShoppingBag className="md:h-5 md:w-5 w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="md:hidden flex ">
        <MobileNavSheet />
      </div>
    </Card>
  );
}

export default Navbar;
