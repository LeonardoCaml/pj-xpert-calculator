import { Calculator } from '@/components/calculator'
import { EducationalContent } from '@/components/educational-content'
import { Footer } from '@/components/footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { CookieConsent } from '@/components/cookie-consent'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
              PJ
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Xpert
              </span>
              <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
                Calculadora Freelancer
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-success/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Calculadora Freelancer PJ
                <span className="block text-primary">
                  Defina seu preço hora em 2026
                </span>
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
                Descubra quanto você precisa cobrar considerando impostos, férias, 
                custos operacionais e uma reserva de emergência. 
                Cálculo em tempo real, 100% privado.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Calculator />
          </div>
        </section>

        {/* Ad placeholder - safe spacing from CTA */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-surface/20 p-8">
            <p className="text-sm text-muted-foreground">
              Espaço reservado para anúncios
            </p>
          </div>
        </div>

        {/* Educational Content Section */}
        <section id="content" className="border-t border-border/50 bg-surface/20 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <EducationalContent />
          </div>
        </section>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  )
}
