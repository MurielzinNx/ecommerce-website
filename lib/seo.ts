import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "product"
}

export function generateSEO({
  title = "Loja Moderna - E-commerce Brasileiro",
  description = "Sua loja online moderna com os melhores produtos e experiência de compra",
  keywords = ["e-commerce", "loja online", "produtos", "brasil"],
  image = "/og-image.jpg",
  url = "https://lojamoderna.com.br",
  type = "website",
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Loja Moderna" }],
    creator: "Loja Moderna",
    publisher: "Loja Moderna",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Loja Moderna",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "pt_BR",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@lojamoderna",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export function generateProductSEO(product: {
  name: string
  description: string
  price: number
  image: string
  category: string
}) {
  return generateSEO({
    title: `${product.name} - Loja Moderna`,
    description: product.description,
    keywords: [product.name, product.category, "comprar", "preço", "oferta"],
    image: product.image,
    type: "product",
  })
}
