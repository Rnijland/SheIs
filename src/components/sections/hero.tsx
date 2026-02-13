"use client";

import { useState, useRef, useEffect } from "react";
import { heroContent, siteConfig } from "@/data/site";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { motion } from "motion/react";
import { MessageCircle, ArrowDown, Loader2 } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Preload video
      video.load();
    }
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0f2a36]"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Loading indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0f2a36] z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="w-8 h-8 text-[#c9a050] animate-spin" />
              <span className="text-white/50 text-sm">Laden...</span>
            </motion.div>
          </div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-40" : "opacity-0"
          }`}
        >
          <source src="/videos/shehero.mp4" type="video/mp4" />
        </video>

        {/* Fallback image if video fails */}
        {videoError && (
          <Image
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        )}

        {/* Gradient overlays with teal tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a4a]/80 via-[#1a3a4a]/50 to-[#1a3a4a]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a36] via-transparent to-transparent" />
      </div>

      {/* Content */}
      {/* Logo - absolute center of viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[120vw] sm:w-auto sm:max-w-[700px]"
      >
        <Image
          src="/logos/logoshewhitewithsub.png"
          alt="SHE - Stichting Human Empowerment"
          width={700}
          height={350}
          className="mx-auto w-full h-auto"
          priority
        />
      </motion.div>

      {/* Text content - bottom of viewport */}
      <div className="absolute bottom-16 left-0 right-0 z-10 container mx-auto px-6 text-center">
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-row items-center justify-center gap-3 mb-6"
        >
          <PulsatingButton
            href={heroContent.cta.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base"
          >
            <MessageCircle className="w-5 h-5" />
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

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-2xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 max-w-4xl mx-auto leading-tight"
        >
          {heroContent.titel}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-6"
        >
          {heroContent.subtitel}
        </motion.p>

        {/* 24/7 badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a050]/20 border border-[#c9a050]/30 text-[#c9a050] text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a050] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a050]"></span>
            </span>
            24/7 Bereikbaar voor Crisishulp
          </span>
        </motion.div>

      </div>

      {/* Scroll indicator - on section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/40"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
