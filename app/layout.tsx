import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { instrumentSerif, inter, jetbrainsMono } from '@/styles/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rohith Sai — Software Engineer',
  description:
    'Software engineer building quiet, durable tools for the web. Selected projects, essays, and a private workspace.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--paper)] text-[var(--ink)]">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--paper)',
              color: 'var(--ink)',
              border: '1px solid var(--rule)',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
            },
          }}
        />
      </body>
    </html>
  )
}
