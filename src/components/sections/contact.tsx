"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import { motion } from "motion/react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Send,
  ExternalLink,
  Loader2,
} from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hallo, ik wil graag meer informatie over jullie diensten.")}`;
  const directionsUrl = "https://www.google.com/maps/dir//Gaasperdam,+Amsterdam";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38950.89478287652!2d4.9444444!3d52.3015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60b95a2d6b9e3%3A0x8e63d3c7e0a6a1d0!2sGaasperdam%2C%20Amsterdam!5e0!3m2!1snl!2snl!4v1700000000000!5m2!1snl!2snl";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
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
            Contact
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 px-4">
            Heb je hulp nodig of wil je meer informatie? Neem vrijblijvend
            contact met ons op.
          </p>
        </motion.div>

        {/* Main CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <a
              href={`tel:${siteConfig.contact.telefoon}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-[#c9a050] text-black font-semibold rounded-full hover:bg-[#d4af37] active:scale-[0.98] transition-all shadow-lg shadow-[#c9a050]/20 text-sm md:text-base"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              <span>24/7 Crisislijn</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 active:scale-[0.98] transition-all text-sm md:text-base"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span>WhatsApp Ons</span>
            </a>
          </div>
        </motion.div>

        {/* Two Column Layout: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#f8f7f4] rounded-2xl p-6 md:p-8">
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-black mb-5 md:mb-6">
                Stuur ons een bericht
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    Naam
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#c9a050] focus:border-transparent transition-all"
                    placeholder="Je naam"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#c9a050] focus:border-transparent transition-all"
                    placeholder="je@email.nl"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                    Bericht
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#c9a050] focus:border-transparent transition-all resize-none"
                    placeholder="Hoe kunnen we je helpen?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 md:py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      <span>Verzenden...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Verstuur Bericht</span>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <p className="text-green-600 text-center text-sm">
                    Bedankt! We nemen zo snel mogelijk contact met je op.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600 text-center text-sm">
                    Er is iets misgegaan. Probeer het later opnieuw.
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Map + Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locatie SHE - Amsterdam Zuidoost"
                className="md:h-[300px]"
              />
            </div>

            {/* Directions Button - Full width clickable */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 md:px-6 py-4 bg-[#f8f7f4] text-black font-medium rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all border border-gray-200"
            >
              <MapPin className="w-5 h-5 text-[#c9a050]" />
              <span>Routebeschrijving</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>

            {/* Contact Info Cards - Fully clickable on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <a
                href={`tel:${siteConfig.contact.telefoon}`}
                className="block p-4 md:p-5 rounded-xl bg-[#f8f7f4] border border-gray-100 hover:bg-gray-100 active:scale-[0.98] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c9a050]/10 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-[#c9a050]" />
                </div>
                <h4 className="font-semibold text-black mb-1 text-sm md:text-base">Telefoon</h4>
                <span className="text-[#c9a050] text-sm md:text-base">
                  {siteConfig.contact.telefoon.replace("+31", "06-")}
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block p-4 md:p-5 rounded-xl bg-[#f8f7f4] border border-gray-100 hover:bg-gray-100 active:scale-[0.98] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#c9a050]/10 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-[#c9a050]" />
                </div>
                <h4 className="font-semibold text-black mb-1 text-sm md:text-base">E-mail</h4>
                <span className="text-[#c9a050] text-sm md:text-base break-all">
                  {siteConfig.contact.email}
                </span>
              </a>
            </div>

            {/* Location Info */}
            <div className="p-4 md:p-5 rounded-xl bg-[#f8f7f4] border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#c9a050]/10 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-[#c9a050]" />
              </div>
              <h4 className="font-semibold text-black mb-1 text-sm md:text-base">Locatie</h4>
              <p className="text-gray-600 text-sm md:text-base">{siteConfig.contact.adres}</p>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs md:text-sm text-gray-500 mt-12 md:mt-16 max-w-2xl mx-auto px-4"
        >
          Je kunt ons ook anoniem benaderen. Alle gesprekken zijn vertrouwelijk.
          Wij oordelen niet - wij luisteren en helpen.
        </motion.p>
      </div>
    </section>
  );
}
