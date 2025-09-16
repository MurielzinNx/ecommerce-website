"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

const categories = [
  { id: "tecnologia", name: "Tecnologia", count: 156 },
  { id: "moda", name: "Moda", count: 234 },
  { id: "casa", name: "Casa & Decoração", count: 189 },
  { id: "esportes", name: "Esportes", count: 98 },
  { id: "beleza", name: "Beleza", count: 145 },
  { id: "livros", name: "Livros", count: 67 },
]

const brands = [
  { id: "apple", name: "Apple", count: 45 },
  { id: "samsung", name: "Samsung", count: 38 },
  { id: "nike", name: "Nike", count: 52 },
  { id: "adidas", name: "Adidas", count: 41 },
  { id: "sony", name: "Sony", count: 29 },
]

export function ProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyOnSale, setShowOnlyOnSale] = useState(false)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 5000])
    setShowOnlyInStock(false)
    setShowOnlyOnSale(false)
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (showOnlyInStock ? 1 : 0) +
    (showOnlyOnSale ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filtros</h2>
          {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Faixa de Preço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={5000} min={0} step={50} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>R$ {priceRange[0]}</span>
            <span>R$ {priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label
                htmlFor={category.id}
                className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">({category.count})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Marcas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.id}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
              />
              <Label
                htmlFor={brand.id}
                className="flex-1 text-sm font-normal cursor-pointer flex items-center justify-between"
              >
                <span>{brand.name}</span>
                <span className="text-muted-foreground">({brand.count})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Disponibilidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" checked={showOnlyInStock} onCheckedChange={setShowOnlyInStock} />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              Apenas em estoque
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" checked={showOnlyOnSale} onCheckedChange={setShowOnlyOnSale} />
            <Label htmlFor="on-sale" className="text-sm font-normal cursor-pointer">
              Apenas em promoção
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
