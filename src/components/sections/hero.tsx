"use client";

import { heroContent, siteConfig } from "@/data/site";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { motion } from "motion/react";
import { Phone, ArrowDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <Image
            src="/logos/logoshewhite.png"
            alt="SHE - Stichting Human Empowerment"
            width={280}
            height={140}
            className="mx-auto"
            priority
          />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 max-w-4xl mx-auto leading-tight"
        >
          {heroContent.titel}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-12"
        >
          {heroContent.subtitel}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PulsatingButton
            href={`tel:${siteConfig.contact.telefoon}`}
            className="text-lg"
          >
            <Phone className="w-5 h-5" />
            {heroContent.cta.primary.text}
          </PulsatingButton>

          <ShimmerButton
            onClick={() => {
              document
                .querySelector("#over-ons")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-base"
          >
            {heroContent.cta.secondary.text}
          </ShimmerButton>
        </motion.div>

        {/* 24/7 badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a050]/20 border border-[#c9a050]/30 text-[#c9a050] text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a050] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a050]"></span>
            </span>
            24/7 Bereikbaar voor Crisishulp
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/40"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
