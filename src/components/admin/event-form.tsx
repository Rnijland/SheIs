"use client";

import { useState } from "react";
import { Event, EventType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EventFormProps {
  type: EventType;
  event?: Event | null;
  onClose: () => void;
}

export function EventForm({ type, event, onClose }: EventFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    titel: event?.titel || "",
    beschrijving: event?.beschrijving || "",
    datum: event?.datum
      ? new Date(event.datum).toISOString().slice(0, 16)
      : "",
    locatie: event?.locatie || "Amsterdam Zuidoost",
    afbeelding:
      event?.afbeelding ||
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    actief: event?.actief ?? true,
  });

  const getTypeLabel = () => {
    switch (type) {
      case "workshop":
        return "Workshop";
      case "training":
        return "Training";
      case "evenement":
        return "Evenement";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const method = event ? "PUT" : "POST";
      const body = {
        ...formData,
        type,
        id: event?.id,
        datum: new Date(formData.datum).toISOString(),
      };

      const res = await fetch("/api/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || "Er is iets misgegaan");
      }
    } catch {
      setError("Er is iets misgegaan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-heading font-semibold">
            {event ? `${getTypeLabel()} Bewerken` : `Nieuwe ${getTypeLabel()}`}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Titel
            </label>
            <input
              type="text"
              value={formData.titel}
              onChange={(e) =>
                setFormData({ ...formData, titel: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Beschrijving
            </label>
            <textarea
              value={formData.beschrijving}
              onChange={(e) =>
                setFormData({ ...formData, beschrijving: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Datum & Tijd
              </label>
              <input
                type="datetime-local"
                value={formData.datum}
                onChange={(e) =>
                  setFormData({ ...formData, datum: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Locatie
              </label>
              <input
                type="text"
                value={formData.locatie}
                onChange={(e) =>
                  setFormData({ ...formData, locatie: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Afbeelding URL
            </label>
            <input
              type="url"
              value={formData.afbeelding}
              onChange={(e) =>
                setFormData({ ...formData, afbeelding: e.target.value })
              }
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tip: Gebruik Unsplash voor gratis afbeeldingen
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="actief"
              checked={formData.actief}
              onChange={(e) =>
                setFormData({ ...formData, actief: e.target.checked })
              }
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <label htmlFor="actief" className="text-sm text-foreground">
              Actief (zichtbaar op de website)
            </label>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuleren
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? "Opslaan..." : event ? "Bijwerken" : "Toevoegen"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
