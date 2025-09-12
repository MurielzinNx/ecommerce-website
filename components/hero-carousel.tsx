"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Coleção Verão 2024",
    subtitle: "Descubra as últimas tendências",
    description: "Produtos exclusivos com até 50% de desconto. Aproveite nossa promoção especial de lançamento.",
    image: "/modern-summer-fashion-collection-colorful-clothing.jpg",
    cta: "Ver Coleção",
    ctaLink: "/loja?categoria=verao",
  },
  {
    id: 2,
    title: "Tecnologia Inovadora",
    subtitle: "O futuro chegou",
    description: "Gadgets e eletrônicos de última geração para facilitar seu dia a dia.",
    image: "/modern-technology-gadgets-smartphones-laptops.jpg",
    cta: "Explorar Tech",
    ctaLink: "/loja?categoria=tecnologia",
  },
  {
    id: 3,
    title: "Casa & Decoração",
    subtitle: "Transforme seu lar",
    description: "Móveis e acessórios modernos para criar o ambiente dos seus sonhos.",
    image: "/modern-home-decor-furniture-living-room.jpg",
    cta: "Ver Produtos",
    ctaLink: "/loja?categoria=casa",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide()
      } else if (event.key === "ArrowRight") {
        nextSlide()
      } else if (event.key === " ") {
        event.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, isPlaying])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="relative h-[70vh] bg-muted animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">Carregando...</div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative h-[70vh] overflow-hidden" role="region" aria-label="Carrossel de destaques">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="relative h-full">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl text-white">
                    <p className="text-sm sm:text-base font-medium mb-2 text-white/95 drop-shadow-lg">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 text-balance text-white drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 text-white/95 text-pretty leading-relaxed drop-shadow-md">
                      {slide.description}
                    </p>
                    <Link href={slide.ctaLink}>
                      <Button size="lg" className="text-lg px-8 py-3">
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={prevSlide}
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={nextSlide}
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Play/Pause Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={isPlaying ? "Pausar carrossel" : "Reproduzir carrossel"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} de {slides.length}: {slides[currentSlide].title}
      </div>
    </section>
  )
}
