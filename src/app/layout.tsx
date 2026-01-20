import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://she-is.nl"),
  title: {
    default: "SHE - Stichting Human Empowerment",
    template: `%s | SHE`,
  },
  description:
    "Stichting Human Empowerment (SHE) biedt ondersteuning aan slachtoffers van huiselijk geweld en kindermishandeling. 24/7 bereikbaar voor crisishulp, begeleiding en trainingen.",
  keywords: [
    "huiselijk geweld",
    "kindermishandeling",
    "hulp",
    "ondersteuning",
    "Amsterdam",
    "Zuidoost",
    "crisishulp",
    "empowerment",
    "vrouwen",
    "Nieuwe Krachtvrouwen",
  ],
  authors: [{ name: "Stichting Human Empowerment" }],
  openGraph: {
    title: "SHE - Stichting Human Empowerment",
    description:
      "Een veilige omgeving waar slachtoffers gehoord worden. 24/7 bereikbaar voor hulp bij huiselijk geweld en kindermishandeling.",
    url: "https://she-is.nl",
    siteName: "SHE - Stichting Human Empowerment",
    locale: "nl_NL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "SHE - Stichting Human Empowerment",
    card: "summary_large_image",
    description:
      "Ondersteuning bij huiselijk geweld en kindermishandeling. 24/7 bereikbaar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
