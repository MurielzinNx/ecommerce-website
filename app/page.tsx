import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedSection } from "@/components/featured-section"
import { CTASection } from "@/components/cta-section"
import { PWAInstaller } from "@/components/pwa-installer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Featured Products Section */}
        <FeaturedSection />

        {/* Call to Action Section */}
        <CTASection />
      </main>

      <Footer />
      <PWAInstaller />
    </div>
  )
}
