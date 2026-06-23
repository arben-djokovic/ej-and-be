'use client'
import React from "react";
import { Button } from "./Button";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("Contact");
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#1a2744] mb-2"
        >
          {t("name_form")}
        </label>
        <input
          id="name"
          type="text"
          required
          // value={formData.name}
          // onChange={(e) =>
          //   setFormData({ ...formData, name: e.target.value })
          // }
          className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#1a2744] mb-2"
        >
          {t("email_form")}
        </label>
        <input
          id="email"
          type="email"
          required
          // value={formData.email}
          // onChange={(e) =>
          //   setFormData({ ...formData, email: e.target.value })
          // }
          className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[#1a2744] mb-2"
        >
          {t("phone_form")}
        </label>
        <input
          id="phone"
          type="tel"
          // value={formData.phone}
          // onChange={(e) =>
          //   setFormData({ ...formData, phone: e.target.value })
          // }
          className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[#1a2744] mb-2"
        >
          {t("message_form")}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          // value={formData.message}
          // onChange={(e) =>
          //   setFormData({ ...formData, message: e.target.value })
          // }
          className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50 resize-none"
        />
      </div>

      <Button
        link=""
        type="submit"
        className="w-full bg-[#c9a962] hover:bg-[#b8944f] text-white py-3 text-base"
      >
       <p className="py-1.5 px-4">{t("submit_button")}</p> 
      </Button>
    </form>
  );
}
