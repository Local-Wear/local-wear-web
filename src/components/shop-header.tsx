import { SocialLinks } from "./social-links"
import { Plus } from "lucide-react"
import Image from "next/image"
import { Shop } from "../types/shop"

interface ShopHeaderProps {
  shop: Shop
}

export function ShopHeader({ shop }: ShopHeaderProps) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden mb-6 sm:mb-8 shadow-md bg-white">
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-gray-200 relative">
        <Image
          src={shop.banner}
          alt={`${shop.name} banner`}
          width={1200}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative ml-0 sm:ml-14 md:ml-24 bg-white">
        {/* Profile Picture - Overlapping the banner */}
        <div className="absolute -top-12 mt-0 md:mt-[105px] sm:mt-[105px] sm:-top-16 md:-top-20 left-1/2 transform -translate-x-1/2 sm:left-4 md:left-6 lg:left-8 sm:transform-none">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
            <Image
              src={shop.logo}
              alt={`${shop.name}`}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Shop Info Container */}
        <div className="pt-0 md:pt-8 sm:pt-12 pb-4 px-4 sm:px-6">
          {/* Mobile Layout - Centered */}
          <div className="sm:hidden text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h1>
            <p className="text-sm text-gray-600 mb-4 px-2">{shop.description}</p>
            <div className="flex justify-center mb-4">
              <SocialLinks socialLinks={shop.socialLinks} />
            </div>
            {/* Mobile Add Product Button */}
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex items-end justify-between">
              <div className="flex-1 pl-28 md:pl-24 lg:pl-32">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{shop.name}</h1>
                <p className="text-base md:text-lg text-gray-600 mb-4 max-w-2xl">{shop.description}</p>
              </div>
              <div className="flex flex-col items-end gap-3 pr-4 md:pr-6">
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>
            </div>
            {/* Social Links Row */}
            <div className="mt-4 pl-28 md:pl-24 lg:pl-32">
              <SocialLinks socialLinks={shop.socialLinks} />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>
      </div>
    </div>
  )
}