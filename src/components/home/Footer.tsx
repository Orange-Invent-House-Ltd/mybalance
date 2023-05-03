import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Icons/logo.svg";
import facebook from "../../assets/Icons/Facebook.svg";
import twitter from "../../assets/Icons/Twitter.svg";
import linkedin from "../../assets/Icons/LinkedIn.svg";
const Footer = () => {
  return (
    <div className="max-w-7xl w-full mx-auto ">
      <div className="bg-[#ededed29] py-16  pl-[30px] sm:pl-[60px] md:pl-[121px]  flex flex-col md:flex-row gap-[100px]">
        <div className="">
          <img src={logo} alt="" className="mb-[43px]" />
          <p className="w-[258px] font-normal ">
            We are a platform where buyers are assured of getting value for
            their money and the seller can bank on us to get paid for the
            product sold.
          </p>
        </div>
        <div className="flex gap-14 md:gap-24 flex-wrap ">
          {footerData.map(({ items, title }) => (
            <div className="w-[112px]">
              <p className="text-tertiary capitalize mb-[16px] font-medium ">
                {title}
              </p>
              <ul className="gap-y-3 capitalize flex flex-col font-medium  text-[#6D6D6D]">
                {items.map(({ name, link }) => (
                  <Link to={link}>{name}</Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="  px-[16px] md:px-[121px] bg-white py-7 gap-5 md:py-12 flex-wrap-reverse flex justify-between">
        <p className="font-medium">© 2022 My Balance. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={linkedin} alt="" />
        </div>
      </div>
    </div>
  );
};
const footerData = [
  {
    title: "solutions",
    items: [
      {
        name: "vendors and buyers",
        link: "/",
      },
      {
        name: "companies & merchants",
        link: "/",
      },
      {
        name: "governments & contractors",
        link: "/",
      },
     
    ],
  },
  {
    title: "company",
    items: [
      {
        name: "about us",
        link: "/",
      },
      {
        name: "careers",
        link: "/",
      },
      {
        name: "news",
        link: "/",
      },
      {
        name: "contact",
        link: "/",
      },
    ],
  },
  {
    title: "social",
    items: [
      {
        name: "twitter",
        link: "/",
      },
      {
        name: "linkedIn",
        link: "/",
      },
      {
        name: "facebook",
        link: "/",
      },
      
    ],
  },
  {
    title: "legals",
    items: [
      {
        name: "terms",
        link: "/",
      },
      {
        name: "privacy",
        link: "/",
      },
      {
        name: "cookies",
        link: "/",
      },
     
    ],
  },
];

export default Footer;
