'use client'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
import { Header } from './header'
import { TableContentLinks } from './table-content-links'
import { motion } from 'framer-motion'

export function RecentsContentCard() {
  const { filterInput } = useGetSearchParams()

  return (
    <div className="w-full mt-10 flex flex-col justify-end z-10">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: filterInput ? 'auto' : 'auto', origin: 'bottom' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-card rounded-lg overflow-hidden flex flex-col origin-bottom"
      >
        <div className="p-4">
          <Header />
          <TableContentLinks />
        </div>
      </motion.div>
    </div>
  )
}
