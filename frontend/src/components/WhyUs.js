import { Award, Headphones, Shield, Users } from 'lucide-react'
import React from 'react'
import { Shape } from './Shape'
import { getTranslations } from 'next-intl/server'

export const WhyUs = async () => {

  const t = await getTranslations("Home.whyus")

    const features = [
    {
      icon: Award,
      title: t("experience.title"),
      description: t("experience.description"),
    },
    {
      icon: Shield,
      title: t("trust_and_security.title"),
      description: t("trust_and_security.description"),
    },
    {
      icon: Users,
      title: t("individual_approach.title"),
      description: t("individual_approach.description"),
    },
    {
      icon: Headphones,
      title: t("support.title"),
      description: t("support.description"),
    },
  ]

  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shape />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a962]/10 text-[#c9a962] mb-5">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg text-[#1a2744] mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
