import { getTranslations } from 'next-intl/server'
import React from 'react'

export const Stats = async () => {

  const t = await getTranslations("Home.stats")
  
    const stats = [
        { value: '300+', label: t("properties_in_stock") },
        { value: '10+', label: t("years_of_experience") },
        { value: '500+', label: t("satisfied_customers") },
        { value: '800+', label: t("successful_transactions") },
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
