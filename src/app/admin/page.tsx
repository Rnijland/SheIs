"use client";

import { useState, useEffect } from "react";
import { Event, EventType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/admin/event-form";
import { Plus, Pencil, Trash2, Calendar, MapPin } from "lucide-react";

type TabType = "workshops" | "trainingen" | "evenementen";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("workshops");
  const [events, setEvents] = useState<{
    workshops: Event[];
    trainingen: Event[];
    evenementen: Event[];
  }>({ workshops: [], trainingen: [], evenementen: [] });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const tabs: { id: TabType; label: string }[] = [
    { id: "workshops", label: "Workshops" },
    { id: "trainingen", label: "Trainingen" },
    { id: "evenementen", label: "Evenementen" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Weet je zeker dat je dit item wilt verwijderen?")) return;

    try {
      const res = await fetch(`/api/events?type=${activeTab}&id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEvent(null);
    fetchEvents();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getEventType = (): EventType => {
    if (activeTab === "workshops") return "workshop";
    if (activeTab === "trainingen") return "training";
    return "evenement";
  };

  const currentEvents = events[activeTab] || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground">Laden...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-heading font-bold">Beheer Agenda</h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nieuw Toevoegen
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-accent text-accent-foreground"
                : "bg-card text-muted-foreground hover:bg-accent/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {currentEvents.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground">
              Nog geen {activeTab} toegevoegd.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              variant="link"
              className="text-accent mt-2"
            >
              Voeg de eerste toe
            </Button>
          </div>
        ) : (
          currentEvents.map((event) => (
            <div
              key={event.id}
              className={`flex items-center justify-between p-4 bg-card rounded-lg border border-border ${
                !event.actief ? "opacity-50" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    {event.titel}
                  </h3>
                  {!event.actief && (
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      Inactief
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.datum)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.locatie}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(event)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(event.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <EventForm
          type={getEventType()}
          event={editingEvent}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
