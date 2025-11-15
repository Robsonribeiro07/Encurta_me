'use client'
import { CardContents } from '@/components/dashboard/card-information/card-contents'
import LinkAnimation from '@/components/dashboard/link-animation'
import { CreateNewLink } from '@/components/dashboard/links/create-new-link'
import { RecentsContentCard } from '@/components/dashboard/Recents-links/recents-content'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
import { motion, AnimatePresence } from 'framer-motion'

export const dynamic = 'force-dynamic'
export default function Dashboard() {
  const { filterInput } = useGetSearchParams()

  return (
    <div className="flex flex-1 flex-col p-8 z-10">
      <AnimatePresence>
        {!filterInput && (
          <motion.div
            key="topContent"
            className="z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <CreateNewLink />o
            <CardContents />
          </motion.div>
        )}
      </AnimatePresence>

      <RecentsContentCard />

      <LinkAnimation url="https://prod.spline.design/wv0sXCxwKzzbLGgJ/scene.splinecode" />
    </div>
  )
}
