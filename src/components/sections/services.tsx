"use client";

import { useState, useCallback, useMemo } from "react";
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

export function Services() {
  const mobilePages = useMemo(() => {
    const chunkSize = 2;
    const chunks = [];
    for (let i = 0; i < services.length; i += chunkSize) {
      chunks.push(services.slice(i, i + chunkSize));
    }
    return chunks.length > 0 ? chunks : [services];
  }, []);

  const totalMobilePages = mobilePages.length;
  const [activePage, setActivePage] = useState(0);

  const goToPage = useCallback(
    (page: number) => {
      if (!totalMobilePages) return;
      const next = ((page % totalMobilePages) + totalMobilePages) % totalMobilePages;
      setActivePage(next);
    },
    [totalMobilePages],
  );

  const goToWrappedPage = useCallback(
    (offset: number) => {
      goToPage(activePage + offset);
    },
    [activePage, goToPage],
  );

  const currentServices = useMemo(() => mobilePages[activePage] ?? [], [mobilePages, activePage]);
  const paddedServices = useMemo(() => {
    const maxVisible = 2;
    const entries: (typeof services[number] | null)[] = [...currentServices];
    while (entries.length < maxVisible) {
      entries.push(null);
    }
    return entries;
  }, [currentServices]);

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
            maken heeft met huiselijk geweld of kindermishandeling – van begeleiding en trainingen tot volledig anoniem advies wanneer je dat nodig hebt.
          </p>
        </motion.div>

        {/* Services - Mobile: swipeable pages of stacked cards with dots */}
        <div className="md:hidden">
          <div className="px-4 space-y-3">
            {paddedServices.map((service, index) => {
              if (!service) {
                return (
                  <div
                    key={`placeholder-${index}`}
                    aria-hidden="true"
                    className="p-5 rounded-2xl border border-transparent bg-transparent opacity-0 pointer-events-none min-h-[260px]"
                  />
                );
              }

              const Icon = iconMap[service.icon] || Heart;
              return (
                <div key={service.id} className="p-5 rounded-2xl border border-[#1a3a4a] bg-[#1a3a4a] min-h-[260px] flex flex-col gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#c9a050]/20 border border-[#c9a050]/40 mx-auto flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#c9a050]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white">{service.titel}</h3>
                  <p className="text-white/80 leading-relaxed text-sm flex-1">{service.beschrijving}</p>
                </div>
              );
            })}
          </div>

          {/* Page indicator dots with arrows */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => goToWrappedPage(-1)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[#c9a050]/20 text-[#c9a050]"
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
              onClick={() => goToWrappedPage(1)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[#c9a050]/20 text-[#c9a050]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.slice(0, 2).map((service, index) => {
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
                <div className="h-full p-8 rounded-2xl border border-[#1a3a4a] bg-[#1a3a4a] transition-all duration-300 text-center flex flex-col gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#c9a050]/20 border border-[#c9a050]/40 mx-auto flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#c9a050]" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {service.titel}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base flex-1">
                    {service.beschrijving}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional services - desktop */}
        {services.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="hidden md:grid md:grid-cols-2 gap-6 mt-6 max-w-5xl mx-auto"
          >
            {services.slice(2, 4).map((service, index) => {
              const Icon = iconMap[service.icon] || Heart;
              return (
                <div
                  key={service.id}
                  className="group h-full p-8 rounded-2xl border border-[#1a3a4a] bg-[#1a3a4a] transition-all duration-300 text-center flex flex-col gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#c9a050]/20 border border-[#c9a050]/40 mx-auto flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#c9a050]" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {service.titel}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base flex-1">{service.beschrijving}</p>
                </div>
              );
            })}
          </motion.div>
        )}
        </div>
    </section>
  );
}
