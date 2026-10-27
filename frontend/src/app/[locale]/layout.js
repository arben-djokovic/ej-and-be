// src/app/[locale]/layout.jsx

import "./globals.css";

import { Geist, Playfair_Display } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: {
    default: "Ej&Be",
    template: "%s | Ej&Be",
  },
  description: "Profesionalna agencija za nekretnine u Crnoj Gori",
  icons: {
    icon: "/ej%26be-logo.webp",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}) {
  const { locale } = await params;

  // Ako locale nije validan -> 404
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}