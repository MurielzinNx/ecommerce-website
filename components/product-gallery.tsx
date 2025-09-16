"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { Search, Grid3X3, List, ChevronLeft, ChevronRight } from "lucide-react"

// Mock product data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 8999.0,
    originalPrice: 9999.0,
    image: "/iphone-15-pro-max-titanium.jpg",
    rating: 4.9,
    reviews: 342,
    category: "tecnologia",
    brand: "apple",
    inStock: true,
    onSale: true,
    badge: "Mais Vendido",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 7499.0,
    originalPrice: null,
    image: "/samsung-galaxy-s24-ultra-black.jpg",
    rating: 4.8,
    reviews: 256,
    category: "tecnologia",
    brand: "samsung",
    inStock: true,
    onSale: false,
    badge: "Novo",
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 599.0,
    originalPrice: 799.0,
    image: "/nike-air-max-270-white-blue.jpg",
    rating: 4.7,
    reviews: 189,
    category: "esportes",
    brand: "nike",
    inStock: true,
    onSale: true,
    badge: "Oferta",
  },
  {
    id: 4,
    name: "MacBook Pro M3",
    price: 12999.0,
    originalPrice: null,
    image: "/macbook-pro-m3-space-gray.jpg",
    rating: 4.9,
    reviews: 145,
    category: "tecnologia",
    brand: "apple",
    inStock: false,
    onSale: false,
    badge: "Esgotado",
  },
  {
    id: 5,
    name: "Adidas Ultraboost 22",
    price: 899.0,
    originalPrice: 1199.0,
    image: "/adidas-ultraboost-22-black.jpg",
    rating: 4.6,
    reviews: 203,
    category: "esportes",
    brand: "adidas",
    inStock: true,
    onSale: true,
    badge: "Destaque",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    price: 1899.0,
    originalPrice: 2299.0,
    image: "/sony-wh1000xm5-headphones-black.jpg",
    rating: 4.8,
    reviews: 167,
    category: "tecnologia",
    brand: "sony",
    inStock: true,
    onSale: true,
    badge: "Oferta",
  },
  // Add more products to demonstrate pagination
  ...Array.from({ length: 18 }, (_, i) => ({
    id: i + 7,
    name: `Produto ${i + 7}`,
    price: Math.floor(Math.random() * 2000) + 100,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 2500) + 200 : null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 300) + 50,
    category: ["tecnologia", "moda", "casa", "esportes"][Math.floor(Math.random() * 4)],
    brand: ["apple", "samsung", "nike", "adidas", "sony"][Math.floor(Math.random() * 5)],
    inStock: Math.random() > 0.1,
    onSale: Math.random() > 0.6,
    badge: ["Novo", "Oferta", "Destaque", null][Math.floor(Math.random() * 4)],
  })),
]

export function ProductGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Keep original order for relevance
        break
    }

    return filtered
  }, [searchTerm, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevância</SelectItem>
              <SelectItem value="popular">Mais Populares</SelectItem>
              <SelectItem value="newest">Mais Recentes</SelectItem>
              <SelectItem value="price-low">Menor Preço</SelectItem>
              <SelectItem value="price-high">Maior Preço</SelectItem>
              <SelectItem value="rating">Melhor Avaliação</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Mostrando {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredAndSortedProducts.length)} de{" "}
          {filteredAndSortedProducts.length} produtos
        </span>
      </div>

      {/* Products Grid/List */}
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
        }
      >
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Nenhum produto encontrado</p>
            <p className="text-sm">Tente ajustar seus filtros ou termo de busca</p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}
