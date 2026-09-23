import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/montvue/Navbar";
import { Hero } from "@/components/montvue/Hero";
import { PresentationSlider } from "@/components/montvue/PresentationSlider";
import { ScrollStory } from "@/components/montvue/ScrollStory";
import { PropertyIntro } from "@/components/montvue/PropertyIntro";
import { HealthBenefits } from "@/components/montvue/HealthBenefits";
import { FloorExplorer } from "@/components/montvue/FloorExplorer";
import { VirtualTour } from "@/components/montvue/VirtualTour";
import { ViewsBanner } from "@/components/montvue/ViewsBanner";
import { StepInside } from "@/components/montvue/StepInside";
import { Interiors } from "@/components/montvue/Interiors";
import { FloorGalleries } from "@/components/montvue/FloorGalleries";
import { Neighbourhood } from "@/components/montvue/Neighbourhood";
import { LocationMap } from "@/components/montvue/LocationMap";
import { Discover } from "@/components/montvue/Discover";
import { CinematicFilm } from "@/components/montvue/CinematicFilm";
import { ContactForm } from "@/components/montvue/ContactForm";
import { Footer } from "@/components/montvue/Footer";
import { WhatsAppFab } from "@/components/montvue/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mont Vue Residences | Luxury 3 BHK Floors in Dharamshala" },
      {
        name: "description",
        content:
          "A private view of the Dhauladhars. Spacious 3 BHK mountain residences in Dharamshala with stadium and Dhauladhar views, from INR 1.00 crore. Possession from Feb 2027.",
      },
      {
        property: "og:title",
        content: "Mont Vue Residences | Luxury 3 BHK Floors in Dharamshala",
      },
      {
        property: "og:description",
        content:
          "Contemporary living, Himalayan soul. 3 BHK · 1,400 sq ft residences from INR 1.00 crore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: "Mont Vue Residences",
          description:
            "Spacious 3 BHK mountain residences in Dharamshala with stadium and Dhauladhar views.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dharamshala",
            addressRegion: "Himachal Pradesh",
            addressCountry: "IN",
          },
          telephone: "+91 99115 36697",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-charcoal font-sans text-sand">
      <Navbar />
      <Hero />
      <PresentationSlider />
      <FloorExplorer />
      <VirtualTour />
      <StepInside />
      <Interiors />
      <FloorGalleries />
      <PropertyIntro />
      <HealthBenefits />
      <ScrollStory />
      <Neighbourhood />
      <LocationMap />
      <Discover />
      <CinematicFilm />
      <ViewsBanner />
      <ContactForm />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
