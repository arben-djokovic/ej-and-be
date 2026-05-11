import React from "react";

export const Button = ({ children, link }) => {
  return (
    <a
      href={link}
      className="inline-flex items-center gap-3 bg-[#c9a962] text-white rounded-lg font-semibold hover:bg-[#b8944f] transition-colors text-md"
    >
        {children}
    </a>
  );
};
