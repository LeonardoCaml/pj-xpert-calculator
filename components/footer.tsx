import { Shield, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                PJ
              </div>
              <span className="text-lg font-bold text-foreground">
                Xpert
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Calculadora inteligente para freelancers e profissionais PJ. 
              Descubra quanto cobrar pela sua hora de forma precisa e profissional.
            </p>
          </div>

          {/* Privacy */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <Shield className="h-4 w-4 text-primary" />
              Como tratamos seus dados
            </h3>
            <p className="text-sm text-muted-foreground">
              Todos os cálculos são feitos localmente no seu navegador. 
              Nenhum dado pessoal ou financeiro é enviado para servidores externos. 
              Utilizamos apenas cookies de desempenho para melhorar sua experiência.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#calculator" className="hover:text-foreground transition-colors">
                  Calculadora PJ
                </a>
              </li>
              <li>
                <a href="#content" className="hover:text-foreground transition-colors">
                  Como calcular sua hora
                </a>
              </li>
              <li>
                <a href="#content" className="hover:text-foreground transition-colors">
                  MEI vs Simples Nacional
                </a>
              </li>
              <li>
                <a href="#content" className="hover:text-foreground transition-colors">
                  O que é Fator R
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PJ Xpert. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Feito com <Heart className="h-4 w-4 text-accent" /> para freelancers
          </p>
        </div>
      </div>
    </footer>
  )
}
