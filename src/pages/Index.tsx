import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Initiatives from "@/components/Initiatives";
import Events from "@/components/Events";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <About />
      <Initiatives />
      <Events />
      <Sponsors />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
