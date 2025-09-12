import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { ContactMap } from "@/components/contact-map"

export const metadata = {
  title: "Contato - Loja Moderna",
  description: "Entre em contato conosco. Estamos aqui para ajudar com suas dúvidas e sugestões.",
}

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Entre em Contato</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo ou visite nossa loja física.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa Localização</h2>
              <p className="text-muted-foreground text-lg">
                Visite nossa loja física e conheça nossos produtos de perto
              </p>
            </div>
            <ContactMap />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
              <p className="text-muted-foreground text-lg">Encontre respostas para as dúvidas mais comuns</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Qual o prazo de entrega?</h3>
                <p className="text-muted-foreground">
                  O prazo de entrega varia de acordo com sua localização. Para a região metropolitana, entregamos em até
                  2 dias úteis. Para outras regiões, o prazo pode ser de 3 a 7 dias úteis.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Como posso trocar um produto?</h3>
                <p className="text-muted-foreground">
                  Você tem até 30 dias para solicitar a troca de produtos. O item deve estar em perfeitas condições, na
                  embalagem original. Entre em contato conosco para iniciar o processo.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Vocês têm loja física?</h3>
                <p className="text-muted-foreground">
                  Sim! Nossa loja física está localizada no endereço indicado no mapa acima. Funcionamos de segunda a
                  sábado, das 9h às 18h.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Quais formas de pagamento vocês aceitam?</h3>
                <p className="text-muted-foreground">
                  Aceitamos cartões de crédito e débito (Visa, Mastercard, Elo), PIX, boleto bancário e parcelamento em
                  até 12x sem juros para compras acima de R$ 200.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
