'use client'
interface LinkAnimationProps {
  url?: string
}
import Spline from '@splinetool/react-spline'

export default function LinkAnimation({ url }: LinkAnimationProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640

  if (isMobile) return null

  return (
    <main className="w-full absolute h-screen">
      <Spline scene={url || 'https://prod.spline.design/SY9mBWaZoxQ0zSr6/scene.splinecode'} />
    </main>
  )
}
