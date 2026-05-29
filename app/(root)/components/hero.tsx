import Image from 'next/image'
import HeroImage from "@/public/hero-image.jpg"
import { antagon, billSmith, texgyreheros } from '@/components/ui/fonts'

const Hero = () => {
  return (
    <div className='bg-black min-h-screen flex flex-col justify-between py-8 px-12'>
        <header className="w-full flex justify-end">
        <nav className="flex items-center gap-8 md:gap-12">
          <a href="#home" className={`${antagon.className} text-4xl text-[#0000ff] hover:opacity-80`}>
            Home
          </a>
          <a href="#about" className={`${antagon.className} text-4xl text-white hover:opacity-80`}>
            About
          </a>
          <a href="#skills" className={`${antagon.className} text-4xl text-white hover:opacity-80`}>
            Skills
          </a>
          <a href="#projects" className={`${antagon.className} text-4xl text-white hover:opacity-80`}>
            Projects
          </a>
          <a href="#hire" className={`${antagon.className} text-4xl text-white hover:opacity-80`}>
            Hire me
          </a>
        </nav>
      </header>
      <main className='grid place-content-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-8 relative border-b pb-4 pr-4'>
            <div className='text-white relative px-4'>
                <div className="absolute -top-10 right-0 left-0 h-4 border-t border-l border-r " />
                <p className={`${texgyreheros.className} text-8xl font-extrabold `}>PORT <br /> FOLIO.</p>
            </div>
            <div>
                <Image src={HeroImage} alt='Hero image' className='w-full h-full object-contain' />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className={`${billSmith.className} text-[#0000FF] text-7xl mt-10 -ml-4`}>
                Portfolio
              </span>
            </div>
             <div className="absolute bottom-0 right-0 left-0 h-4 border-l border-r" />
        </div>
      </main>
      <footer className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <h1 className="text-2xl md:text-4xl font-light text-neutral-400">
          David Eshiwani
        </h1>
        <p className="text-2xl md:text-4xl font-light text-neutral-400">
          UI/UX Designer
        </p>
      </footer>
    </div>
  )
}

export default Hero