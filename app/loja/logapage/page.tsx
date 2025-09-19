"use client"; // necessário para usar useState e useEffect

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGallery } from "@/components/product-gallery";
import { ProductFilters } from "@/components/product-filters";
import { useEffect, useState } from "react";
import { apiFetch, getToken } from "@/components/api";


export default function LojaPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await apiFetch("/api/products");
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  async function addToCart(product: any) {
    try {
      const token = getToken();
      if (!token) {
        alert("Você precisa estar logado para adicionar produtos ao carrinho.");
        return;
      }

      const current = await apiFetch("/api/cart", { token });
      const items = current.items || [];
      const idx = items.findIndex((i: any) => i.productId === product.id);
      if (idx > -1) items[idx].qty += 1;
      else items.push({ productId: product.id, qty: 1, price: product.price });

      await apiFetch("/api/cart/add", {
        method: "POST",
        token,
        body: { items },
      });

      alert("Adicionado ao carrinho");
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  }

  if (loading) return <p className="text-center mt-10">Carregando produtos...</p>;

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
              <ProductFilters />
            </aside>

            {/* Product Gallery */}
            <div className="flex-1">
              {/* Garantir que ProductGallery sempre receba um array */}
              <ProductGallery products={products || []} addToCart={addToCart} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

