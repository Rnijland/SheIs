"use client";

import { useState } from "react";
import { Event } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Clock, ChevronDown, X } from "lucide-react";
import Image from "next/image";

interface EventsSectionProps {
  workshops: Event[];
  trainingen: Event[];
  evenementen: Event[];
}

type TabType = "workshops" | "trainingen" | "evenementen";

const ITEMS_PER_PAGE = 3;

export function Events({
  workshops,
  trainingen,
  evenementen,
}: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("workshops");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const tabs: { id: TabType; label: string }[] = [
    { id: "workshops", label: "Workshops" },
    { id: "trainingen", label: "Trainingen" },
    { id: "evenementen", label: "Events" },
  ];

  const getActiveEvents = () => {
    const now = new Date();
    let events: Event[] = [];

    switch (activeTab) {
      case "workshops":
        events = workshops;
        break;
      case "trainingen":
        events = trainingen;
        break;
      case "evenementen":
        events = evenementen;
        break;
    }

    return events
      .filter((e) => e.actief && new Date(e.datum) >= now)
      .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
  };

  const activeEvents = getActiveEvents();
  const visibleEvents = activeEvents.slice(0, visibleCount);
  const hasMore = activeEvents.length > visibleCount;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section
      id="agenda"
      className="relative py-16 md:py-24 bg-gradient-to-b from-[#1a3a4a] to-[#0f2a36]"
      style={{ backgroundImage: "url('/bgGreen.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Subtle overlay to soften background pattern */}
      <div className="absolute inset-0 bg-[#1a3a4a]/60" />
      <div className="relative container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Agenda
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/60 px-4">
            Bekijk onze aankomende workshops, trainingen en evenementen.
          </p>
        </motion.div>

        {/* Tabs - Smaller pills with proper padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10 md:mb-12 px-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#c9a050] text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {visibleEvents.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {visibleEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <EventCard
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center pt-6"
                >
                  <button
                    onClick={loadMore}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white/70 hover:bg-white/20 border border-white/10 transition-all duration-300 text-sm"
                  >
                    <span>Meer laden</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <p className="text-white/40 text-xs mt-2">
                    {activeEvents.length - visibleCount} meer beschikbaar
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 px-6 md:px-8 rounded-2xl bg-white border border-gray-100">
              <p className="text-gray-600 text-sm md:text-base">
                Er zijn momenteel geen {activeTab} gepland. Kom binnenkort terug
                voor updates!
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function EventCard({
  event,
  onClick,
}: {
  event: Event;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group active:scale-[0.98] transition-transform"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#c9a050]/30 hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <div className="relative w-full md:w-36 h-28 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={event.afbeelding}
            alt={event.titel}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-base md:text-lg font-semibold text-black mb-2 group-hover:text-[#c9a050] transition-colors">
            {event.titel}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {event.beschrijving}
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1.5 text-[#c9a050]">
              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{formatDate(event.datum)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{formatTime(event.datum)}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function EventModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg md:max-w-2xl bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 text-white/70 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Image */}
        <div className="relative w-full h-48 md:h-64">
          <Image
            src={event.afbeelding}
            alt={event.titel}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 -mt-12 md:-mt-16 relative">
          <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
            {event.titel}
          </h2>

          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 text-xs md:text-sm">
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-[#c9a050]/20 text-[#c9a050]">
              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{formatDate(event.datum)}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/10 text-white/70">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{formatTime(event.datum)}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/10 text-white/70">
              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{event.locatie}</span>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
            {event.beschrijving}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <a
              href={`tel:+31630340794`}
              className="flex-1 text-center px-5 md:px-6 py-3 rounded-full bg-[#c9a050] text-black font-medium hover:bg-[#d4af37] active:scale-[0.98] transition-all text-sm md:text-base"
            >
              Aanmelden
            </a>
            <button
              onClick={onClose}
              className="px-5 md:px-6 py-3 rounded-full bg-white/10 text-white/70 hover:bg-white/20 active:scale-[0.98] transition-all text-sm md:text-base"
            >
              Sluiten
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
