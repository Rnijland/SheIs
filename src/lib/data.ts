import { Event, EventType } from "./types";
import workshopsData from "@/data/workshops.json";
import trainingenData from "@/data/trainingen.json";
import evenementenData from "@/data/evenementen.json";

// Get all workshops
export function getWorkshops(): Event[] {
  return workshopsData as Event[];
}

// Get all trainingen
export function getTrainingen(): Event[] {
  return trainingenData as Event[];
}

// Get all evenementen
export function getEvenementen(): Event[] {
  return evenementenData as Event[];
}

// Get events by type
export function getEventsByType(type: EventType): Event[] {
  switch (type) {
    case "workshop":
      return getWorkshops();
    case "training":
      return getTrainingen();
    case "evenement":
      return getEvenementen();
    default:
      return [];
  }
}

// Get all active and upcoming events
export function getUpcomingEvents(type: EventType): Event[] {
  const events = getEventsByType(type);
  const now = new Date();

  return events
    .filter((event) => event.actief && new Date(event.datum) >= now)
    .sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
}

// Get all events (for admin)
export function getAllEvents(): {
  workshops: Event[];
  trainingen: Event[];
  evenementen: Event[];
} {
  return {
    workshops: getWorkshops(),
    trainingen: getTrainingen(),
    evenementen: getEvenementen(),
  };
}

// Format date for display (Dutch format)
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format time for display
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
