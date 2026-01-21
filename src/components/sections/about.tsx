"use client";

import { aboutContent } from "@/data/site";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { motion } from "motion/react";
import Image from "next/image";

export function About() {
  return (
    <>
      {/* Teal gradient transition strip */}
      <div className="relative h-32 md:h-48 bg-gradient-to-b from-[#0a0a0a] via-[#1a3a4a] to-[#1a3a4a]">
        {/* Decorative wave/curve effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-[#1a3a4a] to-[#f8f7f4]" />
      </div>

      <section id="over-ons" className="py-24 bg-[#f8f7f4]">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">
              {aboutContent.titel}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              {aboutContent.intro}
            </p>
          </motion.div>

          {/* Stats with teal accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {aboutContent.statistieken.map((stat, index) => (
              <div
                key={index}
                className="relative text-center py-10 px-6 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden group hover:border-[#1a3a4a]/20 transition-colors"
              >
                {/* Teal accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a3a4a] via-[#c9a050] to-[#1a3a4a]" />

                <div className="text-5xl md:text-6xl font-bold text-[#c9a050] mb-2">
                  {typeof stat.waarde === "number" ? (
                    <NumberTicker value={stat.waarde} suffix="+" delay={0.3} />
                  ) : (
                    <span>{stat.waarde}</span>
                  )}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Subtle teal accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1a3a4a]/5 to-transparent rounded-bl-full" />

              <div className="flex flex-col md:flex-row gap-8 items-center relative">
                {/* Image */}
                <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#c9a050]/20 flex-shrink-0 shadow-lg">
                  <Image
                    src={aboutContent.oprichter.afbeelding}
                    alt={aboutContent.oprichter.naam}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-black mb-2">
                    {aboutContent.oprichter.naam}
                  </h3>
                  <p className="text-[#c9a050] font-medium mb-4">
                    {aboutContent.oprichter.rol}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {aboutContent.oprichter.beschrijving}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
