import React from 'react'
import { Shape } from './Shape'
import { Button } from './Button'
import { Search } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop)",
            }}
          >
            <div className="absolute inset-0 bg-[#1a2744]/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              {/* Decorative element */}
              <div className="flex justify-center mb-6">
                <Shape />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
                Pronađite svoj dom iz snova
              </h1>

              <p className="text-md md:text-lg text-white/80 mb-10 max-w-2xl mx-auto text-pretty">
                Profesionalna usluga posredovanja u prometu nekretnina u Crnoj
                Gori
              </p>

              <Button link="/properties">
                <p className='px-8 py-4 flex items-center gap-2'>
                  <Search className="h-5 w-5" />
                  Pretraži nekretnine
                </p>
              </Button>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                d="M0 100V60C240 100 480 20 720 40C960 60 1200 100 1440 60V100H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>
  )
}
