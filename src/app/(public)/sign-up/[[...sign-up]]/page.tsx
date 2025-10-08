'use client'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex-1 flex justify-center items-center relative z-10">
      <div className="z-10 w-full max-w-md md:px-6 pl-2 m-auto">
        <SignUp routing="path" path="/sign-up" />
      </div>

      <video
        src={'/video(1).webm'}
        autoPlay
        muted
        className="w-screen h-screen absolute inset z-1 object-cover max-sm:object-left"
      />
    </div>
  )
}
