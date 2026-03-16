import { AboutContent, HeroContent, Service, SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  name: "SHE - Stichting Human Empowerment",
  description:
    "Een veilige omgeving waar slachtoffers gehoord worden en plegers de hulp krijgen die ze nodig hebben.",
  url: "https://she-is.nl",
  contact: {
    telefoon: "+31630340794",
    email: "info@she-is.nl", // Placeholder
    whatsapp: "+31630340794",
    adres: "Amsterdam Zuidoost (Gaasperdam)",
  },
  social: {
    instagram: "", // Placeholder
    facebook: "", // Placeholder
    linkedin: "", // Placeholder
  },
  kvk: "", // Placeholder - te vragen aan klant
};

export const heroContent: HeroContent = {
  titel: "Een Veilige Plek voor Herstel en Groei",
  subtitel:
    "Stichting Human Empowerment biedt ondersteuning aan vrouwen, mannen en jongeren die te maken hebben met huiselijk geweld en kindermishandeling. 24/7 bereikbaar.",
  cta: {
    primary: {
      text: "Hulp Nodig?",
      href: "https://wa.me/31630340794?text=Hallo%2C%20ik%20wil%20graag%20meer%20informatie.",
    },
    secondary: {
      text: "Meer Informatie",
      href: "#over-ons",
    },
  },
};

export const aboutContent: AboutContent = {
  titel: "Over SHE",
  intro:
    "Stichting Human Empowerment (SHE) creëert een veilige omgeving waar mensen gehoord worden en plegers de hulp krijgen die ze nodig hebben. Wij geloven in de kracht van herstel en transformatie.",
  oprichter: {
    naam: "Lydy Blijd",
    rol: "Oprichter & Ervaringsdeskundige",
    beschrijving:
      "Lydy Blijd is ervaringsdeskundige op het gebied van huiselijk geweld en kindermishandeling. Haar eigen ervaringen heeft zij kunnen ombuigen naar kracht en positiviteit, en nu helpt zij anderen hetzelfde te doen.",
    afbeelding: "/lydly-blijd.jpg",
  },
  statistieken: [
    {
      label: "Gezinnen Geholpen",
      waarde: 250,
    },
    {
      label: "Jaar Ervaring",
      waarde: 10,
    },
    {
      label: "Uur Bereikbaar",
      waarde: "24/7",
    },
  ],
};

export const services: Service[] = [
  {
    id: "gesprekken",
    titel: "Individuele Gesprekken",
    beschrijving:
      "Persoonlijke begeleiding en ondersteuning in een veilige, vertrouwelijke omgeving. Samen werken we aan jouw herstel.",
    icon: "Heart",
  },
  {
    id: "krachtvrouwen",
    titel: "Nieuwe Krachtvrouwen Training",
    beschrijving:
      "Wij bieden persoonlijke gesprekken, begeleiding, Informatieve workshops en krachttrainingen!",
    icon: "Users",
  },
  {
    id: "workshops",
    titel: "Workshops & Trainingen",
    beschrijving:
      "Educatieve sessies over bewustwording, zelfverdediging, en het herkennen van signalen van huiselijk geweld.",
    icon: "BookOpen",
  },
  {
    id: "crisishulp",
    titel: "24/7 Crisishulp",
    beschrijving:
      "Dag en nacht bereikbaar voor acute situaties. Je staat er niet alleen voor - wij zijn er wanneer je ons nodig hebt.",
    icon: "Phone",
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Over Ons", href: "#over-ons" },
  { label: "Wat Wij Doen", href: "#diensten" },
  { label: "Agenda", href: "#agenda" },
  { label: "Contact", href: "#contact" },
];
