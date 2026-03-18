import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PJ Xpert - Calculadora Freelancer PJ | Defina seu preço hora em 2026',
  description:
    'Calcule o valor da sua hora como freelancer ou PJ. Considere impostos (MEI, Simples Nacional), custos operacionais, férias e reserva de emergência. 100% gratuito e privado.',
  keywords: [
    'calculadora pj',
    'valor hora freelancer',
    'calculadora freelancer',
    'quanto cobrar hora',
    'MEI ou Simples Nacional',
    'Fator R',
    'imposto PJ',
    'calculadora autônomo',
    'preço hora desenvolvedor',
    'preço hora designer',
  ],
  authors: [{ name: 'PJ Xpert' }],
  creator: 'PJ Xpert',
  publisher: 'PJ Xpert',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://pjxpert.com',
    title: 'PJ Xpert - Calculadora Freelancer PJ',
    description:
      'Descubra quanto cobrar pela sua hora considerando impostos, férias e custos. Cálculo em tempo real, 100% privado.',
    siteName: 'PJ Xpert',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PJ Xpert - Calculadora Freelancer PJ',
    description:
      'Descubra quanto cobrar pela sua hora considerando impostos, férias e custos.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PJ Xpert - Calculadora Freelancer PJ',
  description:
    'Calculadora inteligente para freelancers e profissionais PJ definirem o valor da hora.',
  url: 'https://pjxpert.com',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
  },
  featureList: [
    'Cálculo de valor hora',
    'Simulação de impostos MEI e Simples Nacional',
    'Cálculo de Fator R',
    'Reserva de férias e emergência',
    'Comparativo CLT',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased scrollbar-thin">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
