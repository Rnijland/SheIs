import { NextRequest, NextResponse } from "next/server";
import { Event, EventType } from "@/lib/types";
import { put, list, del } from "@vercel/blob";

// Fallback data for initial seeding
import workshopsData from "@/data/workshops.json";
import trainingenData from "@/data/trainingen.json";
import evenementenData from "@/data/evenementen.json";

const BLOB_PREFIX = "she-events";

// Helper to get blob filename
function getBlobName(type: EventType | string): string {
  const normalizedType = type === "workshops" ? "workshop" :
                         type === "trainingen" ? "training" :
                         type === "evenementen" ? "evenement" : type;
  return `${BLOB_PREFIX}/${normalizedType}.json`;
}

// Fallback data from JSON files
function getFallbackData(type: EventType | string): Event[] {
  const normalizedType = type === "workshops" ? "workshop" :
                         type === "trainingen" ? "training" :
                         type === "evenementen" ? "evenement" : type;
  switch (normalizedType) {
    case "workshop":
      return workshopsData as Event[];
    case "training":
      return trainingenData as Event[];
    case "evenement":
      return evenementenData as Event[];
    default:
      return [];
  }
}

// Get events - uses Blob if configured, otherwise JSON files
async function getEvents(type: EventType | string): Promise<Event[]> {
  // Check if Blob is configured
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("Blob not configured, using JSON files (changes won't persist across deploys)");
    return getFallbackData(type);
  }

  try {
    const blobName = getBlobName(type);
    const { blobs } = await list({ prefix: blobName });

    if (blobs.length === 0) {
      // First time - seed from JSON files
      const initialData = getFallbackData(type);
      await saveEvents(type, initialData);
      return initialData;
    }

    // Fetch from blob
    const response = await fetch(blobs[0].url, { cache: "no-store" });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type} from blob:`, error);
    return getFallbackData(type);
  }
}

// Save events to Blob
async function saveEvents(type: EventType | string, events: Event[]): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("Blob not configured, can't save persistently");
    return;
  }

  const blobName = getBlobName(type);

  try {
    // Delete existing blob if exists
    const { blobs } = await list({ prefix: blobName });
    for (const blob of blobs) {
      await del(blob.url);
    }
  } catch {
    // Ignore delete errors
  }

  // Upload new data
  await put(blobName, JSON.stringify(events, null, 2), {
    access: "public",
    contentType: "application/json",
  });
}

function generateId(type: EventType | string): string {
  const normalizedType = type === "workshops" ? "workshop" :
                         type === "trainingen" ? "training" :
                         type === "evenementen" ? "evenement" : type;
  const prefix = normalizedType === "workshop" ? "ws" : normalizedType === "training" ? "tr" : "ev";
  return `${prefix}-${Date.now()}`;
}

// GET - Fetch all events or by type
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type) {
      const events = await getEvents(type);
      return NextResponse.json(events);
    }

    // Return all events
    const [workshops, trainingen, evenementen] = await Promise.all([
      getEvents("workshop"),
      getEvents("training"),
      getEvents("evenement"),
    ]);

    return NextResponse.json({ workshops, trainingen, evenementen });
  } catch (error) {
    console.error("GET events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, titel, beschrijving, datum, locatie, afbeelding, actief } = body;

    if (!type || !titel || !beschrijving || !datum || !locatie) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht" },
        { status: 400 }
      );
    }

    const events = await getEvents(type);
    const newEvent: Event = {
      id: generateId(type as EventType),
      titel,
      beschrijving,
      datum,
      locatie,
      afbeelding:
        afbeelding ||
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      actief: actief ?? true,
    };

    events.push(newEvent);
    await saveEvents(type, events);

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error("POST event error:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// PUT - Update existing event
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, titel, beschrijving, datum, locatie, afbeelding, actief } = body;

    if (!type || !id) {
      return NextResponse.json(
        { error: "Type en ID zijn verplicht" },
        { status: 400 }
      );
    }

    const events = await getEvents(type);
    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Event niet gevonden" },
        { status: 404 }
      );
    }

    events[index] = {
      ...events[index],
      titel: titel || events[index].titel,
      beschrijving: beschrijving || events[index].beschrijving,
      datum: datum || events[index].datum,
      locatie: locatie || events[index].locatie,
      afbeelding: afbeelding || events[index].afbeelding,
      actief: actief !== undefined ? actief : events[index].actief,
    };

    await saveEvents(type, events);

    return NextResponse.json({ success: true, event: events[index] });
  } catch (error) {
    console.error("PUT event error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return NextResponse.json(
        { error: "Type en ID zijn verplicht" },
        { status: 400 }
      );
    }

    const events = await getEvents(type);
    const filteredEvents = events.filter((e) => e.id !== id);

    if (filteredEvents.length === events.length) {
      return NextResponse.json(
        { error: "Event niet gevonden" },
        { status: 404 }
      );
    }

    await saveEvents(type, filteredEvents);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE event error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
