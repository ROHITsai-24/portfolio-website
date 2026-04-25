import { Nav } from '@/components/public/nav'
import { Footer } from '@/components/public/footer'
import { CustomCursor } from '@/components/public/custom-cursor'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
