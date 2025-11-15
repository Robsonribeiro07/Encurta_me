'use client'
import Spline from '@splinetool/react-spline'

interface LinkAnimationProps {
  url?: string
}
export default function LinkAnimation({ url }: LinkAnimationProps) {
  return (
    <main className="w-full absolute h-screen ">
      <Spline scene={url || 'https://prod.spline.design/SY9mBWaZoxQ0zSr6/scene.splinecode'} />
    </main>
  )
}
