import { GlassCard } from './glass-card'
import { Calculator, Scale, FileText, HelpCircle } from 'lucide-react'

export function EducationalContent() {
  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Entenda seus números
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Informações essenciais para freelancers e profissionais PJ
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Como calcular sua hora */}
        <GlassCard hover className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calculator className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Como calcular sua hora?
            </h3>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>
              O cálculo do valor hora considera não apenas o salário desejado, mas também 
              todos os custos invisíveis de ser PJ: impostos, férias sem remuneração, 
              períodos sem projeto e custos operacionais.
            </p>
            <p>
              Nossa fórmula usa o conceito de <strong className="text-foreground">faturamento bruto necessário</strong>:
            </p>
            <div className="rounded-lg bg-secondary/50 p-4 font-mono text-sm">
              Faturamento = (Custos + Salário) / (1 - Impostos - Reserva)
            </div>
            <p>
              O valor hora é então o faturamento dividido pelas horas trabalhadas no mês, 
              considerando férias e dias de descanso.
            </p>
          </div>
        </GlassCard>

        {/* O que é Fator R */}
        <GlassCard hover className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              O que é o Fator R?
            </h3>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>
              O <strong className="text-foreground">Fator R</strong> é a proporção entre a folha de pagamento 
              (incluindo Pró-labore) e o faturamento bruto da empresa nos últimos 12 meses.
            </p>
            <div className="rounded-lg bg-secondary/50 p-4 font-mono text-sm">
              Fator R = Folha de Pagamento / Receita Bruta
            </div>
            <p>
              Se o Fator R for igual ou superior a <strong className="text-foreground">28%</strong>, 
              sua empresa pode ser tributada pelo <strong className="text-foreground">Anexo III</strong> (6%) 
              ao invés do Anexo V (15,5%).
            </p>
            <p>
              Isso significa uma economia significativa de impostos para prestadores de serviços 
              intelectuais como desenvolvedores, designers e consultores.
            </p>
          </div>
        </GlassCard>

        {/* MEI ou Simples */}
        <GlassCard hover className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              MEI ou Simples Nacional?
            </h3>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong className="text-foreground">MEI</strong> é ideal para quem está começando e fatura 
              até R$ 81.000/ano (cerca de R$ 6.750/mês). O imposto é fixo: aproximadamente R$ 82/mês.
            </p>
            <p>
              <strong className="text-foreground">Simples Nacional (ME)</strong> é para faturamentos maiores. 
              A alíquota começa em 6% (com Fator R) ou 15,5% (sem Fator R), mas pode ser 
              mais vantajoso para quem tem custos operacionais altos.
            </p>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm">
                <strong className="text-foreground">Dica:</strong> Se você fatura mais de R$ 6.750/mês, 
                considere migrar para ME. A diferença de imposto pode valer a pena pelo 
                profissionalismo e capacidade de emitir notas maiores.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Nota Fiscal */}
        <GlassCard hover className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Como emitir nota fiscal PJ?
            </h3>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Para emitir nota fiscal de serviços (NFS-e), você precisa se cadastrar no 
              portal da prefeitura da sua cidade. Cada município tem seu próprio sistema.
            </p>
            <p>
              <strong className="text-foreground">Passos básicos:</strong>
            </p>
            <ol className="list-inside list-decimal space-y-1 pl-2">
              <li>Cadastre-se no portal de NFS-e da sua cidade</li>
              <li>Obtenha o certificado digital (opcional em algumas cidades)</li>
              <li>Configure suas atividades (CNAEs)</li>
              <li>Emita a nota informando os dados do cliente</li>
            </ol>
            <p>
              <strong className="text-foreground">MEI</strong> pode emitir nota pelo App MEI ou 
              pelo portal da prefeitura, dependendo do município.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
