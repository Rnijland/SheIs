// SHE Website Types

export interface Event {
  id: string;
  titel: string;
  beschrijving: string;
  datum: string; // ISO date string
  locatie: string;
  afbeelding: string;
  actief: boolean;
}

export interface Workshop extends Event {
  type: "workshop";
}

export interface Training extends Event {
  type: "training";
}

export interface Evenement extends Event {
  type: "evenement";
}

export type EventType = "workshop" | "training" | "evenement";

export interface Service {
  id: string;
  titel: string;
  beschrijving: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  contact: {
    telefoon: string;
    email: string;
    whatsapp: string;
    adres: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  kvk?: string;
}

export interface HeroContent {
  titel: string;
  subtitel: string;
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
}

export interface AboutContent {
  titel: string;
  intro: string;
  oprichter: {
    naam: string;
    rol: string;
    beschrijving: string;
    afbeelding: string;
  };
  statistieken: {
    label: string;
    waarde: string | number;
  }[];
}
