import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";
import { getTranslations } from "next-intl/server";

export const Footer = async () => {
  const t = await getTranslations("Footer");
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
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              {t("fast_links.title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t("fast_links.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-white/70 hover:text-white transition-colors"
                >
                    {t("fast_links.properties")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition-colors"
                >
                    {t("fast_links.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white transition-colors"
                >
                    {t("fast_links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-lg mb-5">{t("types_of_properties.title")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t("types_of_properties.apartments")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=house"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t("types_of_properties.houses")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=land"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t("types_of_properties.land")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t("types_of_properties.commercial")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              {t("contact_info.title")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#c9a962] shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  {t("address_value")}
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
              {t("rights_reserved")}
            </p>
            <p className="text-white/50 text-sm">
              {t("developed_by")}{" "}
              <Link href="https://www.linkedin.com/in/arben-djokovic" className="text-[#c9a962]" target="_blank">
                Arben Ðoković
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
