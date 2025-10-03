import Header from "../components/Header";
import Hero from "../components/Hero";
import ServiceSections from "../components/ServiceSections";
import ServiceWebDesign from "../components/ServiceWebDesign";
import ServiceBranding from "../components/ServiceBranding";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-offwhite">
      <Header />
      <Hero />
      <ServiceSections />
      <ServiceWebDesign />
      <ServiceBranding />
      <Footer />
    </main>
  );
}
