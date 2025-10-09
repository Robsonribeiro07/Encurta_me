'use client'
import { useEffect, useState } from 'react'
import { CardContents } from '@/components/dashboard/card-information/card-contents'
import LinkAnimation from '@/components/dashboard/link-animation'
import { CreateNewLink } from '@/components/dashboard/links/create-new-link'
import { RecentsContentCard } from '@/components/dashboard/Recents-links/recents-content'
import { useGetSearchParams } from '@/hooks/links/use-get-search-params'
import { motion, AnimatePresence } from 'framer-motion'

// Força renderização dinâmica
export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Renderiza loading enquanto não estiver no cliente
  if (!isClient) {
    return (
      <div className="flex flex-1 flex-col p-8 z-10">
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return <DashboardContent />
}

function DashboardContent() {
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
            <CreateNewLink />
            <CardContents />
          </motion.div>
        )}
      </AnimatePresence>

      <RecentsContentCard />

      <LinkAnimation url="https://prod.spline.design/wv0sXCxwKzzbLGgJ/scene.splinecode" />
    </div>
  )
}
