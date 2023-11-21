import Header from "../../components/home/Header";
import Introduction from "../../components/home/Introduction";
import AboutComponent from "../../components/home/AboutComponent";
import WhyChoose from "../../components/home/WhyChoose";
import UserExperience from "../../components/home/UserExperience";
import HowToUseSection from "../../components/home/HowToUseSection";
import GetStarted from "../../components/home/GetStarted";
import ContactSection from "../../components/home/ContactSection";
import FaqSection from "../../components/home/FaqSection";
import Footer from "../../components/home/Footer";




const Home = () => {
  return (
    <div className="">
      <Header />
      <Introduction />
      <AboutComponent />
      <WhyChoose/>
      <UserExperience/>
      <HowToUseSection />
      <GetStarted />

      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
