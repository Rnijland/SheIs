import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Events } from "@/components/sections/events";
import { Contact } from "@/components/sections/contact";
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
      <About />
      <Services />
      <Events
        workshops={workshops}
        trainingen={trainingen}
        evenementen={evenementen}
      />
      <Contact />
      <Footer />
    </main>
  );
}
