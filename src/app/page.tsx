import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";

function Home() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="w-full h-[60vh] relative">
        <Image
          src={"/billbord.avif"}
          alt="Billboard"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Local Fashion, Global Style
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              Discover unique pieces from local designers and sustainable
              fashion brands
            </p>
            <div className="space-x-4 absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <Button
                asChild
                size="lg"
                className="bg-foreground rounded-lg text-white hover:bg-foreground/80 transition-colors"
              >
                <Link href="/shop">
                  Shop Now
                  <IoArrowForward />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
