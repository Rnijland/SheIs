"use client";

import { siteConfig, navItems } from "@/data/site";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logos/logoshewhite.png"
              alt="SHE - Stichting Human Empowerment"
              width={120}
              height={60}
              className="mb-6"
            />
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              Stichting Human Empowerment biedt ondersteuning aan vrouwen,
              mannen en jongeren die te maken hebben met huiselijk geweld en
              kindermishandeling.
            </p>

            {/* 24/7 Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a050]/20 border border-[#c9a050]/30 text-[#c9a050] text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a050] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a050]"></span>
              </span>
              24/7 Bereikbaar voor Crisishulp
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Snelle Links</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/60 hover:text-[#c9a050] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.contact.telefoon}`}
                  className="flex items-center gap-2 text-white/60 hover:text-[#c9a050] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.contact.telefoon.replace("+31", "06-")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-white/60 hover:text-[#c9a050] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" />
                {siteConfig.contact.adres}
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#c9a050] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#c9a050] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#c9a050] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} Stichting Human Empowerment. Alle rechten
            voorbehouden.
          </p>
          {siteConfig.kvk && (
            <p className="text-white/50 text-sm">
              KvK: {siteConfig.kvk}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
