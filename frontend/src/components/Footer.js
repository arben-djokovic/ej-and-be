import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#1a2744] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Image
              src="/ej&be-logo.webp"
              alt="Ej&Be Real Estate"
              width={160}
              height={50}
              className="h-10 w-auto mb-5"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Vaš pouzdan partner za nekretnine u Crnoj Gori. Profesionalna usluga posredovanja u prometu nekretnina
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Brzi linkovi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Početna
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-white/70 hover:text-white transition-colors"
                >
                    Nekretnine
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition-colors"
                >
                    O nama
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white transition-colors"
                >
                    Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Tip nekretnine</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Stan
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=house"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Kuća
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=land"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Plac
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Poslovni prostor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Kontakt informacije
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#c9a962] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Rimski Trg b.b., Podgorica, Montenegro
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#c9a962] shrink-0" />
                <span className="text-white/70 text-sm">+382 68 27 910</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#c9a962] shrink-0" />
                <span className="text-white/70 text-sm">info@ejbiandco.me</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © 2026 Ej&Be Real Estate. Sva prava zadržana.
            </p>
            <p className="text-white/50 text-sm">
              Web development by{" "}
              <Link href="https://www.linkedin.com/in/arben-djokovic" className="text-[#c9a962]" target="_blank">
                Arben Djokovic
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
