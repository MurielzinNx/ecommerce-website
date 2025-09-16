import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product-gallery"
import { ProductFilters } from "@/components/product-filters"
import { Suspense } from "react"

export const metadata = {
  title: "Loja - Loja Moderna",
  description: "Explore nossa coleção completa de produtos com os melhores preços e qualidade.",
}

export default function LojaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Nossa Loja</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Descubra milhares de produtos com qualidade garantida e os melhores preços do mercado.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                <ProductFilters />
              </Suspense>
            </aside>

            {/* Product Gallery */}
            <div className="flex-1">
              <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
                <ProductGallery />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
