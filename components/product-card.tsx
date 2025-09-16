"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
  onSale: boolean
  badge?: string | null
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                src={product.image || "/placeholder.svg?height=128&width=128"}
                alt={product.name}
                className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse rounded-md" />}

              {product.badge && (
                <Badge
                  className="absolute top-2 left-2 text-xs"
                  variant={product.badge === "Oferta" ? "destructive" : "default"}
                >
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                  <h3 className="font-semibold text-lg leading-tight truncate">{product.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-shrink-0"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating.toFixed(1)} ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        -{discountPercentage}%
                      </Badge>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" disabled={!product.inStock} className="min-w-[120px]">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Adicionar" : "Esgotado"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

        {product.badge && (
          <Badge className="absolute top-3 left-3" variant={product.badge === "Oferta" ? "destructive" : "default"}>
            {product.badge}
          </Badge>
        )}

        {discountPercentage > 0 && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            -{discountPercentage}%
          </Badge>
        )}

        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <Button className="w-full" size="sm" disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Adicionar ao Carrinho" : "Esgotado"}
        </Button>
      </CardContent>
    </Card>
  )
}
