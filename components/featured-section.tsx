import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Star, Heart, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Smartphone Pro Max",
    price: "R$ 2.999,00",
    originalPrice: "R$ 3.499,00",
    image: "/modern-smartphone-black-premium.jpg",
    rating: 4.8,
    reviews: 124,
    badge: "Mais Vendido",
    category: "Tecnologia",
  },
  {
    id: 2,
    name: "Tênis Esportivo Premium",
    price: "R$ 299,00",
    originalPrice: "R$ 399,00",
    image: "/premium-white-sneakers-athletic-shoes.jpg",
    rating: 4.6,
    reviews: 89,
    badge: "Oferta",
    category: "Moda",
  },
  {
    id: 3,
    name: "Fone Bluetooth Wireless",
    price: "R$ 199,00",
    originalPrice: "R$ 249,00",
    image: "/wireless-bluetooth-headphones-black-modern.jpg",
    rating: 4.7,
    reviews: 156,
    badge: "Novo",
    category: "Tecnologia",
  },
  {
    id: 4,
    name: "Relógio Inteligente",
    price: "R$ 899,00",
    originalPrice: "R$ 1.199,00",
    image: "/smartwatch-black-modern-fitness-tracker.jpg",
    rating: 4.9,
    reviews: 203,
    badge: "Destaque",
    category: "Tecnologia",
  },
]

export function FeaturedSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Produtos em Destaque</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubra nossa seleção especial dos produtos mais populares e bem avaliados pelos nossos clientes.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <Badge
                  className="absolute top-3 left-3"
                  variant={product.badge === "Oferta" ? "destructive" : "default"}
                >
                  {product.badge}
                </Badge>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Adicionar aos favoritos</span>
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground">{product.category}</p>
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
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/loja">
            <Button variant="outline" size="lg">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
