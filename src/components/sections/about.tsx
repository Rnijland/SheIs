"use client";

import { aboutContent } from "@/data/site";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { motion } from "motion/react";
import Image from "next/image";

export function About() {
  return (
    <section
      id="over-ons"
      className="relative py-16 md:py-24 bg-[#f8f7f4]"
      style={{ backgroundImage: "url('/bgWhite.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Subtle overlay to soften background pattern */}
      <div className="absolute inset-0 bg-[#f8f7f4]/70" />
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            {aboutContent.titel}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 px-4">
            {aboutContent.intro}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          {aboutContent.statistieken.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center py-8 px-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#c9a050] mb-2">
                {typeof stat.waarde === "number" ? (
                  <NumberTicker value={stat.waarde} suffix="+" delay={0.3} />
                ) : (
                  <span>{stat.waarde}</span>
                )}
              </div>
              <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              {/* Image */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-[#c9a050]/20 flex-shrink-0 shadow-lg">
                <Image
                  src={aboutContent.oprichter.afbeelding}
                  alt={aboutContent.oprichter.naam}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-2">
                  {aboutContent.oprichter.naam}
                </h3>
                <p className="text-[#c9a050] font-medium mb-3 md:mb-4 text-sm md:text-base">
                  {aboutContent.oprichter.rol}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {aboutContent.oprichter.beschrijving}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
