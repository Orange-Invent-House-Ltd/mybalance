import AboutComponent from "../../components/home/AboutComponent";
import Benefit from "../../components/home/Benefit";
import Header from "../../components/home/Header";
import HowToUseSection from "../../components/home/HowToUseSection";
import Introduction from "../../components/home/Introduction";
import ContactSection from "../../components/home/ContactSection";
import FaqSection from "../../components/home/FaqSection";
import Features from "../../components/home/Features";
import Footer from "../../components/home/Footer";

const Home = () => {
  return (
    <div className="">
      <Header />
      <Introduction />
      <AboutComponent />
      <HowToUseSection />
      <Benefit />

      <Features />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
