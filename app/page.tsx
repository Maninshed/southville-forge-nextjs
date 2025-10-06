import Header from "../components/Header";
import Hero from "../components/Hero";
import ServiceSections from "../components/ServiceSections";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import QuickForm from "../components/QuickForm";
import FloatingChat from "../components/FloatingChat";

export default function Home() {
  return (
    <main className="bg-offwhite">
      <Header />
      <Hero />
      <BackToTop />
      <ServiceSections />
      <QuickForm />
      <FloatingChat />
      <Footer />
    </main>
  );
}
