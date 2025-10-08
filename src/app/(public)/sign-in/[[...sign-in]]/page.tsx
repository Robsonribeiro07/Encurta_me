'use client'
import { SignIn } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/components/loading-spinner'
import LinkAnimation from '@/components/dashboard/link-animation'

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [fistLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (!fistLoad) return
    setFirstLoad(false)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex-1 flex justify-center items-center relative z-10 overflow-hidden">
      <div className="z-10 w-full max-w-md md:px-6 pl-2 mr-auto">
        <SignIn routing="path" path="/sign-in" />
      </div>

      <LinkAnimation />
    </div>
  )
}
