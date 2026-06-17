'use client';
import Image from 'next/image'
import HeroImage from "@/public/hero-image.jpg"
import { antagon, billSmith, texgyreheros } from '@/components/ui/fonts'
import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

const navLinks = [
  {
    title: 'Home',
    href:"#home"
  },
  {
    title: 'About',
    href:"#about"
  },
  {
    title: 'Skills',
    href:"#skills"
  },
  {
    title: 'Projects',
    href:"#projects"
  },
  {
    title: 'Hire me',
    href:"#hire"
  },
]

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className='bg-black min-h-screen flex flex-col justify-between md:py-8 md:px-12'>
      <header className="relative w-full flex justify-end py-4 pr-2 md:py-0 md:pr-0">
        <nav className="hidden md:flex items-center gap-8 md:gap-12">
          {navLinks.map((link)=>(
                 <a key={link.href} href={link.href} 
                  className={`${antagon.className} text-white hover:text-[#0000ff] text-4xl hover:opacity-80`}>
                  {link.title}
                </a>
              ))}
        </nav>
        <button className='text-white md:hidden' onClick={()=>setMenuOpen(prev=>!prev)}>
          {menuOpen ? 
          <XIcon/>
          :
          <MenuIcon/>  
        }
        </button>
        {menuOpen && (
          <div className='absolute top-0 left-0 bg-black w-3/4 border-r border-r-gray-50/20 h-screen z-50'>
            <nav className="flex flex-col py-4 pl-8 gap-8">
              {navLinks.map((link)=>(
                 <a key={link.href} href={link.href} 
                 onClick={()=>{
                    setMenuOpen(false)
                  }
                } 
                  className={`${antagon.className} text-white hover:text-[#0000ff] text-4xl hover:opacity-80`}>
                  {link.title}
                </a>
              ))}
        </nav>
          </div>
        )}
      </header>
      <main className='grid place-content-center px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-8 relative border-b pb-4 pr-4 pl-4 md:pl-0'>
            <div className='text-white relative px-4'>
                <div className="absolute -top-10 right-0 left-0 h-4 border-t border-l border-r " />
                <p className={`${texgyreheros.className} text-7xl md:text-8xl font-extrabold `}>PORT <br /> FOLIO.</p>
            </div>
            <div>
                <Image src={HeroImage} alt='Hero image' className='w-full h-full object-contain' />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className={`${billSmith.className} text-[#0000FF] text-6xl md:text-7xl mt-10 -ml-4`}>
                Portfolio
              </span>
            </div>
             <div className="absolute bottom-0 right-0 left-0 h-4 border-l border-r" />
        </div>
      </main>
      <footer className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4 px-4">
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