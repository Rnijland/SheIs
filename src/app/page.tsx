import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Events } from "@/components/sections/events";
import { Contact } from "@/components/sections/contact";
import { MarqueeLoop } from "@/components/marquee-loop";
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
          "/Loop101.webp",
          "/Loop102.webp",
          "/Loop103.webp",
          "/Loop104.webp",
          "/Loop105.webp",
          "/Loop106.webp",
          "/Loop107.webp",
        ]}
        alt="SHE activiteiten"
        direction="left"
      />
      <About />
      <Services />
      <MarqueeLoop
        images={[
          "/Loop201.webp",
          "/Loop202.webp",
          "/Loop203.webp",
          "/Loop204.webp",
          "/Loop205.webp",
          "/Loop206.webp",
          "/Loop207.webp",
          "/Loop208.webp",
          "/Loop209.webp",
          "/Loop210.webp",
          "/Loop211.webp",
          "/Loop212.webp",
        ]}
        alt="SHE evenementen"
        direction="left"
      />
      <Events
        workshops={workshops}
        trainingen={trainingen}
        evenementen={evenementen}
      />
      <MarqueeLoop
        images={[
          "/Loop301.webp",
          "/Loop302.webp",
          "/Loop303.webp",
          "/Loop304.webp",
          "/Loop305.webp",
          "/Loop306.webp",
          "/Loop307.webp",
          "/Loop308.webp",
        ]}
        alt="SHE workshops"
        direction="left"
      />
      <Contact />
      <Footer />
    </main>
  );
}
