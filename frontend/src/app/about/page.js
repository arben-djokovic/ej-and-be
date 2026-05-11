import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { PageHeader } from "@/components/PageHeader";
import { Stats } from "@/components/Stats";
import { WhyUs } from "@/components/WhyUs";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <>
      <Header />
      <div>
        <PageHeader
          title="O nama"
          subtitle="Saznajte više o našoj priči i misiji"
        />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <div className="flex mb-4">
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
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a2744] mb-6">
                  Ej&Be Real Estate
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Dobrodošli u Ej&Be Real Estate, vašeg pouzdanog partnera za
                    nekretnine u Crnoj Gori. Sa više od decenije iskustva u
                    industriji nekretnina, posvećeni smo pružanju izuzetne
                    usluge našim klijentima.
                  </p>
                  <p>
                    Naš tim stručnjaka razumije da je kupovina, prodaja ili
                    iznajmljivanje nekretnine jedna od najvažnijih odluka u
                    životu. Zato vam pružamo personalizovanu podršku kroz svaki
                    korak procesa.
                  </p>
                  <p>
                    Bilo da tražite savršen dom za svoju porodicu, investicionu
                    nekretninu ili poslovni prostor, ovdje smo da vam pomognemo
                    da pronađete idealnu nekretninu koja odgovara vašim
                    potrebama i budžetu.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-4/3 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                    alt="Ej&Be Real Estate Office"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#c9a962] text-white p-4 md:p-5 rounded-xl">
                  <div className="text-2xl md:text-3xl font-bold">10+</div>
                  <div className="text-sm">Godina iskustva</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Stats />
        <WhyUs />
      </div>
      <Footer />
    </>
  );
}
