'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('pj-xpert-cookie-consent')
    if (!consent) {
      // Small delay for better UX
      const timeout = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timeout)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('pj-xpert-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('pj-xpert-cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl">
          <button
            onClick={handleDecline}
            className="absolute right-3 top-3 rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Privacidade e Cookies
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Utilizamos cookies de desempenho e publicidade para melhorar sua experiência. 
              Seus dados de cálculo são armazenados apenas no seu navegador e nunca são enviados para servidores externos.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={handleAccept} className="rounded-xl">
                Aceitar Cookies
              </Button>
              <Button variant="outline" onClick={handleDecline} className="rounded-xl">
                Apenas Essenciais
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Ao continuar navegando, você concorda com nossa política de privacidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
