import { Link } from "@/i18n/navigation";
import React from "react";

export const Button = ({ children, link }) => {
  return (
    <Link
      href={link}
      className="cursor-pointer inline-flex items-center gap-3 bg-[#c9a962] text-white rounded-lg font-semibold hover:bg-[#b8944f] transition-colors text-md"
    >
        {children}
    </Link>
  );
};
