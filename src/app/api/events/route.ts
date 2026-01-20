import { NextRequest, NextResponse } from "next/server";
import { Event, EventType } from "@/lib/types";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

function getFilePath(type: EventType | string): string {
  switch (type) {
    case "workshop":
    case "workshops":
      return path.join(DATA_DIR, "workshops.json");
    case "training":
    case "trainingen":
      return path.join(DATA_DIR, "trainingen.json");
    case "evenement":
    case "evenementen":
      return path.join(DATA_DIR, "evenementen.json");
    default:
      throw new Error(`Invalid event type: ${type}`);
  }
}

function readEvents(type: EventType | string): Event[] {
  try {
    const filePath = getFilePath(type);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeEvents(type: EventType | string, events: Event[]) {
  const filePath = getFilePath(type);
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
}

function generateId(type: EventType): string {
  const prefix = type === "workshop" ? "ws" : type === "training" ? "tr" : "ev";
  return `${prefix}-${Date.now()}`;
}

// GET - Fetch all events or by type
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type) {
      const events = readEvents(type);
      return NextResponse.json(events);
    }

    // Return all events
    return NextResponse.json({
      workshops: readEvents("workshop"),
      trainingen: readEvents("training"),
      evenementen: readEvents("evenement"),
    });
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
    const { type, titel, beschrijving, datum, locatie, afbeelding, actief } =
      body;

    if (!type || !titel || !beschrijving || !datum || !locatie) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht" },
        { status: 400 }
      );
    }

    const events = readEvents(type);
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
    writeEvents(type, events);

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
    const {
      type,
      id,
      titel,
      beschrijving,
      datum,
      locatie,
      afbeelding,
      actief,
    } = body;

    if (!type || !id) {
      return NextResponse.json(
        { error: "Type en ID zijn verplicht" },
        { status: 400 }
      );
    }

    const events = readEvents(type);
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

    writeEvents(type, events);

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

    const events = readEvents(type);
    const filteredEvents = events.filter((e) => e.id !== id);

    if (filteredEvents.length === events.length) {
      return NextResponse.json(
        { error: "Event niet gevonden" },
        { status: 404 }
      );
    }

    writeEvents(type, filteredEvents);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE event error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
