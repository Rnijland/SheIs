"use client";

import { siteConfig, navItems } from "@/data/site";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#0a0a0a] text-white py-12 md:py-16"
      style={{ backgroundImage: "url('/bgGreen.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2 text-center md:text-left">
            <Image
              src="/logos/WhiteLogoHero.png"
              alt="SHE - Stichting Human Empowerment"
              width={100}
              height={50}
              className="mb-5 md:mb-6 mx-auto md:mx-0"
            />
            <p className="text-white/70 mb-5 md:mb-6 max-w-md leading-relaxed text-sm md:text-base mx-auto md:mx-0">
              Stichting Human Empowerment biedt ondersteuning aan vrouwen,
              mannen en jongeren die te maken hebben met huiselijk geweld en
              kindermishandeling.
            </p>

            {/* 24/7 Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a050]/20 border border-[#c9a050]/30 text-[#c9a050] text-xs md:text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a050] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a050]"></span>
              </span>
              24/7 Bereikbaar
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-base md:text-lg mb-4 text-white">Snelle Links</h4>
            <ul className="space-y-2 md:space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/60 hover:text-[#c9a050] transition-colors text-sm md:text-base"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-base md:text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.contact.telefoon}`}
                  className="inline-flex items-center gap-2 text-white/60 hover:text-[#c9a050] transition-colors text-sm md:text-base"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.contact.telefoon.replace("+31", "06-")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-white/60 hover:text-[#c9a050] transition-colors text-sm md:text-base"
                >
                  <Mail className="w-4 h-4" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/60 text-sm md:text-base">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{siteConfig.contact.adres}</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-5 md:mt-6">
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
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center">
          <p className="text-white/50 text-xs md:text-sm">
            &copy; {currentYear} Stichting Human Empowerment. Alle rechten
            voorbehouden.
          </p>
          {siteConfig.kvk && (
            <p className="text-white/50 text-xs md:text-sm">
              KvK: {siteConfig.kvk}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
