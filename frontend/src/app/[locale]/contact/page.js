import ContactForm from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { PageHeader } from "@/components/PageHeader";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function Contact() {
  const t = await getTranslations("Contact");
  
  return (
    <>
      <Header />
      <div>
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <section id="contact" className="py-20 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[#c9a962]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2744] mb-1">
                    {t("address")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("address_value")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-[#c9a962]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2744] mb-1">
                    {t("phone")}
                  </h3>
                  <p className="text-muted-foreground">+382 68 27 910</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-[#c9a962]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2744] mb-1">
                    {t("email")}
                  </h3>
                  <p className="text-muted-foreground">info@ejbiandco.me</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a962]/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-[#c9a962]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2744] mb-1">
                    {t("working_hours")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("working_hours_value")}
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.5671894!2d19.2636!3d42.4411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDI2JzI4LjAiTiAxOcKwMTUnNDkuMCJF!5e0!3m2!1sen!2s!4v1640000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location map"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-xl p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
