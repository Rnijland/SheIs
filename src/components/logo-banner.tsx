import Image from "next/image";

const logos = [
  { src: "/Logo%20banner/amplify%20logo.png", alt: "Amplify" },
  { src: "/Logo%20banner/amsterdam%20logo.png", alt: "Gemeente Amsterdam" },
  { src: "/Logo%20banner/social%20pact%20logo.png", alt: "Social Pact" },
  { src: "/Logo%20banner/spe%20logo.png", alt: "SPE" },
  { src: "/Logo%20banner/vivell%20logo.png", alt: "Vivell" },
];

export function LogoBanner() {
  return (
    <section className="relative py-6 md:py-8 bg-white">
      <div className="absolute inset-0 bg-white" />
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={220}
                height={100}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
