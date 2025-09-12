import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingBag, MessageCircle, Truck, Shield, CreditCard, Headphones } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Frete grátis para todo o Brasil em compras acima de R$ 199",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Seus dados protegidos com certificado SSL e criptografia",
  },
  {
    icon: CreditCard,
    title: "Pagamento Fácil",
    description: "Parcele em até 12x sem juros no cartão de crédito",
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Atendimento especializado todos os dias da semana",
  },
]

export function CTASection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">Pronto para Começar suas Compras?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Explore nossa loja completa com milhares de produtos ou entre em contato conosco para tirar suas dúvidas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/loja">
              <Button size="lg" className="text-lg px-8 py-3 min-w-[200px]">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Explorar Loja
              </Button>
            </Link>

            <Link href="/contato">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 min-w-[200px] bg-transparent">
                <MessageCircle className="h-5 w-5 mr-2" />
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Receba Ofertas Exclusivas</h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Cadastre-se em nossa newsletter e seja o primeiro a saber sobre promoções, lançamentos e ofertas
                especiais.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Endereço de e-mail para newsletter"
                />
                <Button type="submit" className="px-6">
                  Cadastrar
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Ao se cadastrar, você concorda com nossa política de privacidade.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
