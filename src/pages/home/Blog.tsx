import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import HeroSection from '../../components/reuseable/HeroSection';
import GetStarted from '../../components/home/GetStarted'
import BlogCardParent from "../../components/blog/BlogCardParent";

const Blog = () => {
  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
        <HeroSection 
          menu='Blog' 
          text='Find Out The Latest MyBalance News Here'
        />
        <div className="pt-20 px-[5%] mb-24">
        <BlogCardParent/>
        </div>
        <GetStarted/>
      </div>
      <Footer/>
    </div>
  )
}

export default Blog