'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-[#1a2744] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/ej&be-logo.webp"
              alt="Ej&Be Real Estate"
              width={200}
              height={60}
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <p className="text-white/60 mt-4">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="font-serif text-2xl font-bold text-[#1a2744] text-center mb-6">
            Prijava
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1a2744]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-lg pl-10 h-10 border border-gray-300 focus:border-[#c9a962] focus:ring-[#c9a962]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#1a2744]">
                Lozinka
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border rounded-lg pl-10 pr-10 h-10 border-gray-300 focus:border-[#c9a962] focus:ring-[#c9a962]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg cursor-pointer bg-[#c9a962] hover:bg-[#b8944f] text-white font-semibold"
            >
              {loading ? 'Prijava...' : 'Prijavi se'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-[#c9a962] transition-colors"
            >
              Nazad na pocetnu
            </Link>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          Ej&Be Real Estate Admin Panel
        </p>
      </div>
    </div>
  )
}
