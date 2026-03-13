import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Events } from "@/components/sections/events";
import { Contact } from "@/components/sections/contact";
import { MarqueeLoop } from "@/components/marquee-loop";
import { LogoBanner } from "@/components/logo-banner";
import { getWorkshops, getTrainingen, getEvenementen } from "@/lib/data";

export default function Home() {
  // Get event data (server-side)
  const workshops = getWorkshops();
  const trainingen = getTrainingen();
  const evenementen = getEvenementen();

  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <MarqueeLoop
        images={[
          "/Loop102.webp",
          "/Loop103.webp",
          "/Loop107.webp",
        ]}
        alt="SHE activiteiten"
        direction="left"
      />
      <About />
      <Services />
      <Events
        workshops={workshops}
        trainingen={trainingen}
        evenementen={evenementen}
      />
      <MarqueeLoop
        images={[
          "/Loop301.webp",
          "/Loop302.webp",
          "/Loop305.webp",
          "/Loop306.webp",
        ]}
        alt="SHE workshops"
        direction="left"
      />
      <Contact />
      <LogoBanner />
      <Footer />
    </main>
  );
}
