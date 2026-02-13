"use client";

import { useState, useRef, useCallback } from "react";
import { services } from "@/data/site";
import { motion } from "motion/react";
import {
  Heart,
  Users,
  BookOpen,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Users,
  BookOpen,
  Phone,
  MessageCircle,
};

// Split services into pages of 3
const mobilePages = [services.slice(0, 3), services.slice(3)];

export function Services() {
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setActivePage(page);
  }, []);

  const goToPage = useCallback((page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: page * el.clientWidth, behavior: "smooth" });
    setActivePage(page);
  }, []);

  return (
    <section
      id="diensten"
      className="relative py-16 md:py-24 bg-white"
      style={{ backgroundImage: "url('/bgWhite.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Subtle overlay to soften background pattern */}
      <div className="absolute inset-0 bg-white/70" />
      <div className="relative container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Wat Wij Doen
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 px-4">
            Wij bieden diverse vormen van ondersteuning aan voor iedereen die te
            maken heeft met huiselijk geweld of kindermishandeling.
          </p>
        </motion.div>

        {/* Services - Mobile: swipeable pages of stacked cards with dots */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            <div className="flex" style={{ width: `${mobilePages.length * 100}%` }}>
              {mobilePages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="snap-start flex-shrink-0 px-4 space-y-3"
                  style={{ width: `${100 / mobilePages.length}%` }}
                >
                  {page.map((service, index) => {
                    const Icon = iconMap[service.icon] || Heart;
                    return (
                      <div
                        key={service.id}
                        className="p-5 rounded-2xl border border-[#1a3a4a] bg-[#1a3a4a]"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#c9a050] flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-white mb-2">
                          {service.titel}
                        </h3>
                        <p className="text-white/80 leading-relaxed text-sm">
                          {service.beschrijving}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Page indicator dots with arrows */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => goToPage(Math.max(0, activePage - 1))}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                activePage === 0 ? "bg-gray-200 text-gray-400" : "bg-[#c9a050]/20 text-[#c9a050]"
              }`}
              disabled={activePage === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {mobilePages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activePage === index
                      ? "bg-[#c9a050] w-6"
                      : "bg-gray-300 w-2.5"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => goToPage(Math.min(mobilePages.length - 1, activePage + 1))}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                activePage === mobilePages.length - 1 ? "bg-gray-200 text-gray-400" : "bg-[#c9a050]/20 text-[#c9a050]"
              }`}
              disabled={activePage === mobilePages.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.slice(0, 4).map((service, index) => {
            const Icon = iconMap[service.icon] || Heart;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl border border-[#1a3a4a] bg-[#1a3a4a] hover:bg-[#244a5a] active:scale-[0.98] transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-[#c9a050] flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">
                    {service.titel}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base">
                    {service.beschrijving}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fifth service - desktop only, centered */}
        {services.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="hidden md:block mt-6 max-w-5xl mx-auto"
          >
            <div className="max-w-[calc(50%-12px)] mx-auto">
              {(() => {
                const service = services[4];
                const Icon = iconMap[service.icon] || Heart;
                return (
                  <div className="group h-full p-8 rounded-2xl border border-[#1a3a4a] bg-[#1a3a4a] hover:bg-[#244a5a] active:scale-[0.98] transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#c9a050] flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-white mb-3">
                      {service.titel}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-base">
                      {service.beschrijving}
                    </p>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
        </div>
    </section>
  );
}
