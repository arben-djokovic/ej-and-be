import React from 'react'

export const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="bg-[#1a2744] py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <svg
              width="60"
              height="30"
              viewBox="0 0 60 30"
              fill="none"
              className="text-[#c9a962]"
            >
              <path
                d="M5 25C15 15 25 20 30 10C35 20 45 15 55 25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>
  )
}
