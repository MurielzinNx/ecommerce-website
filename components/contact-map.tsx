"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, ExternalLink } from "lucide-react"

export function ContactMap() {
  const address = "Rua das Flores, 123, Centro, São Paulo - SP"
  const coordinates = { lat: -23.5505, lng: -46.6333 } // São Paulo coordinates

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(url, "_blank")
  }

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    window.open(url, "_blank")
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Map Placeholder */}
        <div className="relative h-96 bg-muted flex items-center justify-center">
          {/* This would be replaced with actual Google Maps integration */}
          <div className="text-center space-y-4">
            <MapPin className="h-16 w-16 text-primary mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Loja Moderna</h3>
              <p className="text-muted-foreground">{address}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={openInGoogleMaps} variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver no Google Maps
              </Button>
              <Button onClick={getDirections}>
                <Navigation className="h-4 w-4 mr-2" />
                Como Chegar
              </Button>
            </div>
          </div>

          {/* Overlay with store info */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Loja Moderna</h4>
                    <p className="text-sm text-muted-foreground">Centro, São Paulo</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">Aberto</p>
                    <p className="text-xs text-muted-foreground">Fecha às 18h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Actions */}
        <div className="p-6 bg-muted/30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-sm">Endereço</h4>
              <p className="text-xs text-muted-foreground">Rua das Flores, 123</p>
            </div>
            <div className="text-center">
              <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-sm">Distância</h4>
              <p className="text-xs text-muted-foreground">Centro da cidade</p>
            </div>
            <div className="text-center">
              <div className="h-8 w-8 mx-auto mb-2 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">P</span>
              </div>
              <h4 className="font-semibold text-sm">Estacionamento</h4>
              <p className="text-xs text-muted-foreground">Gratuito</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
