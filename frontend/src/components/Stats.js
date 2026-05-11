import React from 'react'

export const Stats = () => {

    const stats = [
        { value: '300+', label: "Nekretnina u ponudi" },
        { value: '10+', label: "Godina iskustva" },
        { value: '500+', label: "Zadovoljnih klijenata" },
        { value: '800+', label: "Uspješnih transakcija" },
    ]
  return (    
    <section className="py-16 bg-gray-50 border-y border-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#1a2744] mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
