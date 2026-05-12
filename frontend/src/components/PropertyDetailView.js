'use client'
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Car,
  Flame,
  Building,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export function PropertyDetailView() {
  return (
    <div className="bg-background">
      {/* Image Gallery */}
      <div className="container mx-auto px-4 mb-8 w-full">
        <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4">
         <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 w-full h-100 bg-[rgba(0,0,0,0.8)] overflow-hidden"
      >
        <SwiperSlide className="">
          <div className="h-full flex items-center justify-center">
            <img className="max-h-full max-w-full mx-auto" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
            <img className="max-h-full max-w-full mx-auto" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <img className="max-h-full max-w-full mx-auto" src="https://img.halooglasi.com/slike/oglasi/Thumbs/250413/m/ub---centar---prelep-stan-na-prodaju-5425645442271-71811384181.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <img className="max-h-full max-w-full mx-auto"    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <img className="max-h-full max-w-full mx-auto" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <img className="max-h-full max-w-full mx-auto" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <img className="max-h-full max-w-full mx-auto" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex items-center justify-center">
          <img className="max-h-full max-w-full mx-auto" src="https://thumbs.dreamstime.com/b/modern-house-interior-exterior-design-46517595.jpg" />
          </div>
        </SwiperSlide>
      </Swiper>

            {/* Status Badge */}
            <div className="absolute top-4 left-4 z-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold bg-[#c9a962] text-white`}
                //  property.status === 'sale'
                //   ? 'bg-[#c9a962] text-white'
                //   : 'bg-[#1a2744] text-white'
              >
                Prodaja
              </span>
            </div>
          </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Price */}
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <span className="bg-[#1a2744]/10 text-[#1a2744] px-3 py-1 rounded-full text-sm font-medium">
                  Stan
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Stari aerodrom, Podgorica
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
                Luksuzan stan sa panoramskim pogledom
              </h1>
              <p className="text-3xl font-bold text-[#c9a962]">250,000€</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Maximize className="h-6 w-6 mx-auto mb-2 text-[#c9a962]" />
                <p className="text-2xl font-bold text-[#1a2744]">120</p>
                <p className="text-sm text-muted-foreground">m²</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Bed className="h-6 w-6 mx-auto mb-2 text-[#c9a962]" />
                <p className="text-2xl font-bold text-[#1a2744]">3</p>
                <p className="text-sm text-muted-foreground">Sobe</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-[#c9a962]" />
                <p className="text-2xl font-bold text-[#1a2744]">2</p>
                <p className="text-sm text-muted-foreground">Kupatila</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Building className="h-6 w-6 mx-auto mb-2 text-[#c9a962]" />
                <p className="text-2xl font-bold text-[#1a2744]">3/5</p>
                <p className="text-sm text-muted-foreground">Sprat</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-4">
                Opis nekretnine
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                Luksuzan stan smješten u srcu Starog aerodroma, sa
                spektakularnim panoramskim pogledom na grad. Ovaj prostrani stan
                od 120m² nudi savršen spoj modernog dizajna i udobnosti. Sastoji
                se od tri spavaće sobe, dvije elegantno uređene kupaonice,
                prostranog dnevnog boravka i potpuno opremljene kuhinje. Veliki
                prozori obasjavaju prostor prirodnim svjetlom, stvarajući toplu
                i ugodnu atmosferu. Idealna nekretnina za one koji traže
                luksuzan životni stil u blizini svih sadržaja koje Stari
                aerodrom nudi.
              </p>
            </div>

            {/* Details */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-4">
                Detalji
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <Maximize className="h-5 w-5 text-[#c9a962]" />
                  <div>
                    <p className="text-sm text-muted-foreground">Površina</p>
                    <p className="font-semibold text-[#1a2744]">120 m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <Calendar className="h-5 w-5 text-[#c9a962]" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Godina izgradnje
                    </p>
                    <p className="font-semibold text-[#1a2744]">2021</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <Car className="h-5 w-5 text-[#c9a962]" />
                  <div>
                    <p className="text-sm text-muted-foreground">Parking</p>
                    <p className="font-semibold text-[#1a2744]">da</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                  <Flame className="h-5 w-5 text-[#c9a962]" />
                  <div>
                    <p className="text-sm text-muted-foreground">Grijanje</p>
                    <p className="font-semibold text-[#1a2744]">da</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border p-6 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#1a2744] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">E&B</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1a2744]">
                  Ej&Be Real Estate
                </h3>
                <p className="text-muted-foreground text-sm">
                  Profesionalna agencija za nekretnine
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:+38269123456"
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                >
                  <Phone className="h-5 w-5 text-[#c9a962]" />
                  <span className="font-medium text-[#1a2744]">
                    +382 69 123 456
                  </span>
                </a>
                <a
                  href="mailto:info@ejbirealestate.me"
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                >
                  <Mail className="h-5 w-5 text-[#c9a962]" />
                  <span className="font-medium text-[#1a2744]">
                    info@ejbirealestate.me
                  </span>
                </a>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                  <Clock className="h-5 w-5 text-[#c9a962]" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Radno vrijeme
                    </p>
                    <p className="font-medium text-[#1a2744]">09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
