import ImageLogo from '#/favicon2.ico'
import Image from 'next/image'
import { OptionsContent } from './options-content'
export function Header() {
  return (
    <div className="w-full h-16 px-4 flex flex-row items-center bg-card border-b border-border">
      <div className="w-[15rem] flex items-center">
        <Image src={ImageLogo} alt="Logo" width={50} />
        <h1 className="bg-gradient-to-r from-[#8b5cf6] via-[#a78bfa] to-[#c4b5fd] bg-clip-text text-transparent">
          Encurta-me
        </h1>
      </div>

      <h1 className="flex-1 text-xl font-semibold ">Dashboard</h1>

      <OptionsContent />
    </div>
  )
}
