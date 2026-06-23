"use client";

import React from "react";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export const SelectLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  // aktivni locale iz URL-a
  const locale = useLocale();

  const handleChangeLanguage = (e) => {
    const nextLocale = e.target.value;

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="w-auto md:w-42.5">
      <select
        className="bg-transparent text-white selectLanguage"
        value={locale}
        onChange={handleChangeLanguage}
      >
        <option className="text-black" value="me">
          🇲🇪 Crnogorski
        </option>

        <option className="text-black" value="en">
          🇬🇧 English
        </option>

        <option className="text-black" value="tr">
          🇹🇷 Türkçe
        </option>

        <option className="text-black" value="ru">
          🇷🇺 Русский
        </option>
      </select>
    </div>
  );
};