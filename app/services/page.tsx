import Header from "../../components/Header";
import Hero from "../../components/Hero";
import ServiceSections from "../../components/ServiceSections";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";

export default function ServicesPage() {
  return (
    <main className="bg-offwhite">
      <Header />
      <Hero />
      <BackToTop />
      <ServiceSections />
      <Footer />
    </main>
  );
}
