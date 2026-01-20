"use client";

import { useState, useEffect } from "react";
import { navItems, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop/Mobile Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#home")}
              className="flex items-center"
            >
              <Image
                src={scrolled ? "/logos/logosheblack.png" : "/logos/logoshewhite.png"}
                alt="SHE"
                width={80}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    scrolled
                      ? "text-gray-600 hover:text-black"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href={`tel:${siteConfig.contact.telefoon}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a050] text-black text-sm font-semibold hover:bg-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Hulp Nodig?
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "md:hidden p-2",
                scrolled ? "text-black" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl font-heading font-semibold text-white hover:text-[#c9a050] transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                href={`tel:${siteConfig.contact.telefoon}`}
                className="mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#c9a050] text-black text-lg font-semibold"
              >
                <Phone className="w-5 h-5" />
                Bel Nu
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
