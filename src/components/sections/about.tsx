"use client";

import { aboutContent } from "@/data/site";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { motion } from "motion/react";
import Image from "next/image";

export function About() {
  return (
    <section
      id="over-ons"
      className="relative py-16 md:py-24 bg-[#1a3a4a]"
      style={{ backgroundImage: "url('/bgGreen.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Subtle overlay to soften background pattern */}
      <div className="absolute inset-0 bg-[#1a3a4a]/60" />
      <div className="relative container mx-auto px-6 flex flex-col">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {aboutContent.titel}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/80 px-4">
            {aboutContent.intro}
          </p>
        </motion.div>

        <div className="order-2 md:order-3 flex flex-col md:flex-row md:items-stretch gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:basis-2/3 flex"
          >
            <div className="bg-white/5 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl border border-white/10 flex flex-col justify-center w-full">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-[#c9a050]/30 flex-shrink-0 shadow-lg">
                    <Image
                      src={aboutContent.oprichter.afbeelding}
                      alt={aboutContent.oprichter.naam}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2">
                      {aboutContent.oprichter.naam}
                    </h3>
                    <p className="text-[#c9a050] font-medium mb-3 md:mb-4 text-sm md:text-base">
                      {aboutContent.oprichter.rol}
                    </p>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                      {aboutContent.oprichter.beschrijving}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:basis-1/3 flex"
          >
            <div className="grid grid-cols-3 gap-3 w-full md:grid-cols-1 md:flex md:flex-col md:gap-4">
              {aboutContent.statistieken.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center py-6 px-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg"
                >
                  <div className="text-2xl md:text-4xl font-bold text-[#c9a050] mb-1">
                    {typeof stat.waarde === "number" ? `${stat.waarde}+` : stat.waarde}
                  </div>
                  <div className="text-white/80 font-medium text-xs md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="order-4 mt-10"
        >
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <video
              controls
              poster="/thumbnailsheisvideo.png"
              className="w-full h-full max-h-[540px] object-cover"
            >
              <source src="/videos/sheisvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
