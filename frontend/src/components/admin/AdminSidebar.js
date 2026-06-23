'use client'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Building2, 
  Plus, 
  LogOut,
  Home,
  User,
  Menu,
  X,
  ArrowLeftCircle
} from 'lucide-react'
import { useState } from 'react'


const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/properties', label: 'Nekretnine', icon: Building2 },
  { href: '/admin/properties/new', label: 'Dodaj Nekretninu', icon: Plus },
]

export function AdminSidebar({ user }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
  }

  return (<>
    {/* Mobile Menu Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-white bg-[#1a2744]/80 hover:bg-[#1a2744] transition-colors"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
    <aside className={`${isOpen ? 'block' : 'hidden md:block'} fixed left-0 top-0 min-h-screen h-full w-64 bg-[#1a2744] text-white flex flex-col`}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin">
          <Image
            src="/ej&be-logo.webp"
            alt="Ej&Be Real Estate"
            width={180}
            height={50}
            className="h-10 w-auto"
          />
        </Link>
        <p className="text-white/50 text-xs mt-2">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">  
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href) && !pathname.endsWith('/new'))    
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[#c9a962] text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Actions */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Nazad na sajt</span>
        </Link>

        <div className="flex items-center gap-3 px-4 py-2 text-white/50 text-sm">
          <User className="h-4 w-4" />
          <span className="truncate">beni@gmail.com</span>
        </div>

        <button
          onClick={handleLogout}
          variant="ghost"
          className="flex items-center w-full justify-start gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Odjavi se</span>
        </button>
      </div>
    </aside>
    </>)
}
