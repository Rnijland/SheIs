"use client";

import { useState, useEffect, useMemo } from "react";
import { Event } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface EventsSectionProps {
  workshops: Event[];
  trainingen: Event[];
  evenementen: Event[];
}

function CalendarView({
  referenceDate,
  events,
  onNavigate,
  onSelect,
}: {
  referenceDate: Date;
  events: CategorizedEvent[];
  onNavigate: (offset: number) => void;
  onSelect: (event: Event) => void;
}) {
  const monthName = referenceDate.toLocaleDateString("nl-NL", {
    month: "long",
    year: "numeric",
  });

  const monthEvents = useMemo(() => {
    return events
      .filter((event) => {
        const date = new Date(event.datum);
        return (
          date.getFullYear() === referenceDate.getFullYear() &&
          date.getMonth() === referenceDate.getMonth()
        );
      })
      .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
  }, [events, referenceDate]);

  const categoryMeta: Record<CategorizedEvent["category"], { label: string; dot: string }> = {
    workshop: { label: "Workshop", dot: "bg-[#c9a050]" },
    training: { label: "Training", dot: "bg-sky-400" },
    evenement: { label: "Event", dot: "bg-emerald-400" },
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6">
      <div className="flex flex-col items-center text-center gap-3 mb-6">
        <p className="text-white/60 text-sm uppercase tracking-wide">Maandoverzicht</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#c9a050]/40 text-[#c9a050] hover:bg-[#c9a050]/10 transition"
            aria-label="Vorige maand"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white capitalize">
            {monthName}
          </h3>
          <button
            onClick={() => onNavigate(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[#c9a050]/40 text-[#c9a050] hover:bg-[#c9a050]/10 transition"
            aria-label="Volgende maand"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {monthEvents.length === 0 ? (
        <div className="text-center py-12 text-white/60 text-sm md:text-base">
          Geen activiteiten gepland in deze maand.
        </div>
      ) : (
        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {monthEvents.map((event) => {
            const meta = categoryMeta[event.category];
            const date = new Date(event.datum).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
            });

            return (
              <button
                key={event.id}
                onClick={() => onSelect(event)}
                className="text-left rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3 hover:border-[#c9a050]/40 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/70">
                    <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </div>
                  <span className="text-white/60 text-sm">{date}</span>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-base line-clamp-2">{event.titel}</h4>
                  <p className="text-white/70 text-sm line-clamp-2 mt-1">{event.beschrijving}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/70">
                  <div className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.tijd ?? formatTime(event.datum)}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.locatie}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a050]">
                  <span>Inschrijven</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

type TabType = "calendar" | "workshops" | "trainingen" | "evenementen";
type CategorizedEvent = Event & { category: "workshop" | "training" | "evenement" };

const DEFAULT_ITEMS_PER_PAGE = 3;

export function Events({
  workshops,
  trainingen,
  evenementen,
}: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("workshops");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [calendarMonthIndex, setCalendarMonthIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const combinedEvents = useMemo<CategorizedEvent[]>(() => {
    return [
      ...workshops.map((event) => ({ ...event, category: "workshop" as const })),
      ...trainingen.map((event) => ({ ...event, category: "training" as const })),
      ...evenementen.map((event) => ({ ...event, category: "evenement" as const })),
    ].sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
  }, [workshops, trainingen, evenementen]);

  const activeCombinedEvents = useMemo(() => combinedEvents.filter((event) => event.actief), [combinedEvents]);

  const calendarMonths = useMemo(() => {
    const monthMap = new Map<string, Date>();
    activeCombinedEvents.forEach((event) => {
      const date = new Date(event.datum);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!monthMap.has(key)) {
        monthMap.set(key, new Date(date.getFullYear(), date.getMonth(), 1));
      }
    });
    return Array.from(monthMap.entries())
      .sort((a, b) => a[1].getTime() - b[1].getTime())
      .map(([key, date]) => ({ key, date }));
  }, [activeCombinedEvents]);

  const safeCalendarMonthIndex = calendarMonths.length > 0 ? Math.min(calendarMonthIndex, calendarMonths.length - 1) : 0;
  const calendarDate = calendarMonths[safeCalendarMonthIndex]?.date ?? new Date();

  const handleCalendarNavigate = (offset: number) => {
    setCalendarMonthIndex((prev) => {
      if (calendarMonths.length === 0) return 0;
      const next = (prev + offset + calendarMonths.length) % calendarMonths.length;
      return next;
    });
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "calendar", label: "Kalender" },
    { id: "workshops", label: "Workshops" },
    { id: "trainingen", label: "Trainingen" },
    { id: "evenementen", label: "Events" },
  ];

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window === "undefined") return;
      setItemsPerPage(window.innerWidth < 768 ? 2 : DEFAULT_ITEMS_PER_PAGE);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const getActiveEvents = () => {
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
      case "calendar":
        events = combinedEvents;
        break;
    }

    return events
      .filter((e) => e.actief)
      .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
  };

  const activeEvents = getActiveEvents();
  const totalPages = Math.max(1, Math.ceil(activeEvents.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages - 1);
  const startIndex = safePage * itemsPerPage;
  const visibleEvents = activeEvents.slice(startIndex, startIndex + itemsPerPage);
  const placeholdersCount = Math.max(0, itemsPerPage - visibleEvents.length);
  const hasMultiplePages = activeEvents.length > itemsPerPage;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  const goToPage = (page: number, wrap = false) => {
    setCurrentPage((prev) => {
      const lastPage = Math.max(totalPages - 1, 0);
      const pageCount = lastPage + 1;
      if (pageCount === 0) return 0;
      let target = page;
      if (wrap) {
        target = ((page % pageCount) + pageCount) % pageCount;
      } else {
        target = Math.min(Math.max(page, 0), lastPage);
      }
      return target === prev ? prev : target;
    });
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
          className="max-w-5xl mx-auto"
        >
          {activeTab === "calendar" ? (
            <CalendarView
              referenceDate={calendarDate}
              events={combinedEvents}
              onNavigate={handleCalendarNavigate}
              onSelect={(event) => setSelectedEvent(event)}
            />
          ) : visibleEvents.length > 0 ? (
            <div className="flex flex-col min-h-[720px] md:min-h-[520px]">
              <div className="space-y-4 flex-1 pb-2 md:pb-4">
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

                {placeholdersCount > 0 &&
                  Array.from({ length: placeholdersCount }).map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className="rounded-2xl border border-transparent opacity-0 pointer-events-none select-none min-h-[210px] md:min-h-[180px]"
                      aria-hidden="true"
                    >
                      <div className="h-full" />
                    </div>
                  ))}
              </div>

              {/* Pagination Controls */}
              {hasMultiplePages && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-3 md:gap-4 pt-3 md:pt-6 pb-2"
                >
                  <button
                    onClick={() => goToPage(safePage - 1, true)}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-[#c9a050]/40 text-[#c9a050] hover:bg-[#c9a050]/10 transition-all"
                    aria-label="Ga naar vorige pagina"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToPage(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          safePage === index ? "w-8 bg-[#c9a050]" : "w-2.5 bg-white/30"
                        }`}
                        aria-label={`Ga naar pagina ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => goToPage(safePage + 1, true)}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-[#c9a050]/40 text-[#c9a050] hover:bg-[#c9a050]/10 transition-all"
                    aria-label="Ga naar volgende pagina"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
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
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#c9a050]/30 transition-all duration-300 min-h-[210px] md:min-h-[180px]">
        {/* Image */}
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={event.afbeelding}
            alt={event.titel}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="font-heading text-base md:text-lg font-semibold text-white mb-2 group-hover:text-[#c9a050] transition-colors">
            {event.titel}
          </h3>
          <p className="text-white/70 text-sm mb-3 line-clamp-3 flex-1">
            {event.beschrijving}
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm mt-auto">
            <div className="flex items-center gap-1.5 text-[#c9a050]">
              <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{formatDate(event.datum)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/70">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{event.tijd ?? formatTime(event.datum)}</span>
            </div>

            <button
              type="button"
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a050] text-[#0f2a36] text-xs md:text-sm font-semibold shadow-sm hover:shadow-md transition-all"
            >
              Inschrijven
              <ChevronRight className="w-4 h-4" />
            </button>
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
              href={`https://wa.me/31630340794?text=${encodeURIComponent('Hallo, ik wil graag aanmelden voor: ' + event.titel)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-5 md:px-6 py-3 rounded-full bg-[#c9a050] text-black font-medium hover:bg-[#d4af37] active:scale-[0.98] transition-all text-sm md:text-base"
            >
              Aanmelden via WhatsApp
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
