'use client'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
// import pathname 
import { usePathname } from 'next/navigation'
import { SelectLanguage } from './SelectLanguage'

export const Header = () => {
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMobileOpen(false)
    }, [pathname])
  return (<>
    <div className='h-21 bg-primary text-white py-4 flex items-center justify-around relative z-10'>
        <Link href="/">
            <Image src="/ej&be-logo.webp" alt="Logo" height={170} width={170} />
        </Link>

        <ul className={`absolute md:border-0 border border-r-0 border-l-0 border-b-0 border-t-blue-900 ${isMobileOpen ? 'flex' : 'hidden md:flex'} top-21 w-full md:w-auto md:static bg-primary left-0 p-4 flex flex-col md:flex-row gap-4 md:gap-8 `}>
            <li className=''><Link href="/">Pocetna</Link></li>
            <li><Link href="/properties">Nekretnine</Link></li>
            <li><Link href="/about">O nama</Link></li>
            <li><Link href="/contact">Kontakt</Link></li>
        </ul>

        <div className='flex items-center gap-4 text-right'>
            <SelectLanguage />
            <div>
                {isMobileOpen ? <X onClick={()=>{setIsMobileOpen(false)}} className='md:hidden' size={24} /> :
                <Menu onClick={()=>{setIsMobileOpen(true)}} className='md:hidden' size={24} />}
            </div>
        </div>

    </div>
    {isMobileOpen ? <div onClick={()=>{setIsMobileOpen(false)}} className='bg-red w-full h-full absolute top-0 left-0 z-2'></div> : null}
  </>)
}
