import { Facebook, Instagram, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

interface SocialLinksProps {
  socialLinks: {
    facebook?: string
    tiktok?: string
    instagram?: string
    telegram?: string
  }
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  const socialButtons = [
    {
      name: "Facebook",
      icon: Facebook,
      url: socialLinks.facebook,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      url: socialLinks.tiktok,
      color: "bg-black hover:bg-gray-800",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: socialLinks.instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    },
    {
      name: "Telegram",
      icon: Send,
      url: socialLinks.telegram,
      color: "bg-blue-500 hover:bg-blue-600",
    },
  ]

  return (
    <div className="flex gap-4 flex-wrap">
      {socialButtons.map((social) => {
        const IconComponent = social.icon
        return social.url ? (
          <Button
            key={social.name}
            asChild
            className={`${social.color} text-white border-0 px-6 py-3 rounded-lg transition-all duration-200`}
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <IconComponent />
              <span className="hidden sm:inline">{social.name}</span>
            </a>
          </Button>
        ) : null
      })}
    </div>
  )
}
