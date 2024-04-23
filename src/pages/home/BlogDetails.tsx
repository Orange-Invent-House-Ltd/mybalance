import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import user from "../../assets/images/user.jpg";
import detailimg from "../../assets/images/office.png";
import { Facebook, Twitter, Linkedin, Copy } from "lucide-react";
import { useLocation } from "react-router-dom";

const BlogDetails = () => {
  const location = useLocation();
  const blogData = location.state?.blogData;

  if (!blogData) {
    return <div>Blog post not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="mt-[9rem] flex flex-col justify-center items-center text-center lg:px-0 px-9">
        <p className="mb-7 text-primary-blogCol font-bold">
          Published 20 Jan 2022
        </p>
        <h1 className="text-4xl font-bold mb-7">UX review presentations</h1>
        <p className="text-md font-semibold mb-11 text-gray">
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p>
        <div className="text-md font-light mb-11">
          <span className="lg:mr-5 mr-3 font-bold bg-[#F9F5FF] text-[#6941C6] px-5 py-1 rounded-xl shadow-md">
            Design
          </span>
          <span className="lg:mr-5 mr-3 font-bold bg-[#EEF4FF] text-[#3538CD]  px-5 py-1 rounded-xl shadow-md">
            Research
          </span>
          <span className=" font-bold bg-[#FDF2FA] text-[#C11574]  px-5 py-1 rounded-xl shadow-lg">
            Presentation
          </span>
        </div>
      </div>
      <div className="w-full lg:px-[10rem] md:px-8 px-3">
        <img src={detailimg} alt="" className="w-full lg:h-[600px] h-[full]" />
      </div>

      <section className="lg:p-pad md:px-96 px-4 mt-16 mb-36">
        <h1 className="mb-4 font-bold text-2xl">Introduction</h1>
        <p className="mb-9 text-gray">
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
          suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis
          montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere
          vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
          varius id. Eget quis mi enim, leo lacinia pharetra, semper. Eget in
          volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames
          arcu quis fusce augue enim. Quis at habitant diam at. Suscipit
          tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum
          molestie aliquet sodales id est ac volutpat.
        </p>
        <div className="w-full object-cover mb-11">
          <img
            src={blogData.imgs}
            alt=""
            className="w-full lg:h-[500px] h-96 mb-4"
          />
          {/* <p  className=" relative text-gray text-md mb-11">Image courtesy of Laura Davidson via Unsplash <span className=" absolute -bottom-0.5 left-64  bg-slate-400 w-16 h-0.5 ml-3" ></span></p> */}
        </div>
        <div className="flex gap-8 mb-8">
          <div className=" lg:h-48 h-64 w-1 bg-primary-normal"></div>
          <div className="text-xl font-bold mt-3">
            “In a world older and more complete than ours they move finished and
            complete, gifted with extensions of the senses we have lost or never
            attained, living by voices we shall never hear.”
            <p className="mt-10 text-base text-gray">
              — Olivia Rhye, Product Designer
            </p>
          </div>
        </div>

        <p className="mb-12 text-gray">
          Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla
          odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis
          mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
          commodo consectetur convallis risus. Sed condimentum enim dignissim
          adipiscing faucibus consequat, urna. Viverra purus et erat auctor
          aliquam. Risus, volutpat vulputate posuere purus sit congue convallis
          aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque
          ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget
          nunc lectus in tellus, pharetra, porttitor. Ipsum sit mattis nulla
          quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque
          congue eget consectetur turpis. Sapien, dictum molestie sem tempor.
          Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor
          tellus. Sed vel, congue felis elit erat nam nibh orci.
        </p>
        <div>
          <h1 className="mb-4 font-bold text-2xl">Other resources</h1>
          <p className="text-gray">
            Sagittis et eu at elementum, quis in. Proin praesent volutpat
            egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac.
            Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur
            ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim
            massa erat cursus vulputate gravida id. Sed quis auctor vulputate
            hac elementum gravida cursus dis.
          </p>
          <ol className="text-gray list-decimal list-inside mt-2">
            <li> Lectus id duis vitae porttitor enim gravida morbi.</li>
            <li>
              {" "}
              Eu turpis posuere semper feugiat volutpat elit, ultrices
              suspendisse. Auctor vel in vitae placerat.{" "}
            </li>
            <li>
              Suspendisse maecenas ac donec scelerisque diam sed est duis purus.
            </li>
          </ol>
        </div>
        <hr className=" border-slate-300 mt-11 border-1" />
        <div className="lg:flex block items-center justify-between">
          <div className="flex items-center space-x-4 user mt-8 mb-6">
            <div className="h-11 w-11 rounded-full overflow-hidden">
              <img
                src={user}
                alt="User Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-gray-400 text-sm font-semibold">
                {blogData.name}
              </div>
              <div className="text-gray-400 text-xs">Product Designer</div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center border-slate-300 border-2 p-2 rounded-md font-bold cursor-pointer">
              <Copy className="text-gray w-4 mr-2" />
              <p className="text-sm">Copy link</p>
            </div>
            <div className="flex items-center border-slate-300 border-2 p-2 rounded-md font-bold cursor-pointer">
              <a href="">
                <Twitter className="text-gray w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center border-slate-300 border-2 p-2 rounded-md font-bold cursor-pointer">
              <a href="">
                <Facebook className="text-gray w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center border-slate-300 border-2 p-2 rounded-md font-bold cursor-pointer">
              <a href="">
                <Linkedin className="text-gray w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetails;
