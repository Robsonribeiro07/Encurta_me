import '../../styles/global.css'
import { NavContent } from '@/components/sidebar/nav-content'
import { Header } from '@/components/header/header'

export const metadata = {
  title: 'Dashboard - Encurta.me',
  description: 'Área protegida do Encurta.me',
}

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-background flex flex-col m-0 px-0">
      <Header />

      <div className="flex-1 flex min-h-screen h-screen">
        <NavContent />
        <main className="flex-1 overflow-auto  ">{children}</main>
      </div>
    </div>
  )
}
