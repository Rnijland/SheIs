"use client";

import { services } from "@/data/site";
import { motion } from "motion/react";
import {
  Heart,
  Users,
  BookOpen,
  Phone,
  MessageCircle,
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
  return (
    <section
      id="diensten"
      className="relative py-16 md:py-24 bg-white"
      style={{ backgroundImage: "url('/bgWhite.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="container mx-auto px-4 md:px-6">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
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
                <div className="h-full p-5 md:p-8 rounded-2xl border border-gray-200 bg-white hover:border-[#c9a050]/50 hover:shadow-lg hover:shadow-[#c9a050]/5 active:scale-[0.98] transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#c9a050]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#c9a050]/20 transition-colors">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#c9a050]" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-black mb-2 md:mb-3">
                    {service.titel}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {service.beschrijving}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fifth service - centered */}
        {services.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-4 md:mt-6 max-w-5xl mx-auto"
          >
            <div className="md:max-w-[calc(50%-12px)] md:mx-auto">
              {(() => {
                const service = services[4];
                const Icon = iconMap[service.icon] || Heart;
                return (
                  <div className="group h-full p-5 md:p-8 rounded-2xl border border-gray-200 bg-white hover:border-[#c9a050]/50 hover:shadow-lg hover:shadow-[#c9a050]/5 active:scale-[0.98] transition-all duration-300">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#c9a050]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#c9a050]/20 transition-colors">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#c9a050]" />
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-semibold text-black mb-2 md:mb-3">
                      {service.titel}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
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
