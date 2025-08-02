import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import UpcomingEvents from "@/components/UpcomingEvents";
import SocialFollow from "@/components/SocialFollow";
import Contact from "@/components/Contact";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <About />
      <UpcomingEvents />
      <SocialFollow />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
