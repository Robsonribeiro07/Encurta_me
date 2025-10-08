import { Header } from './header'
import { TableContentLinks } from './table-content-links'

export function RecentsContentCard() {
  return (
    <main className="w-full h-[40rem] bg-card mt-10 rounded-lg p-4">
      <Header />

      <TableContentLinks />
    </main>
  )
}
