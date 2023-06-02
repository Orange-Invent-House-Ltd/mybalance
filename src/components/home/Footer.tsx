import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Icons/logo.svg";
import facebook from "../../assets/Icons/Facebook.svg";
import twitter from "../../assets/Icons/Twitter.svg";
import linkedin from "../../assets/Icons/LinkedIn.svg";

const Footer = () => {
  return (
    <div className=" w-full">
      <div className="bg-[#ededed29] py-16 px-[5%] flex flex-col md:flex-row gap-[100px]">
        <div className="">
        <Link to='/'><img src={logo} className="mb-[43px]" /></Link>
          <p className="w-[258px] font-normal ">
            MyBalance offers escrow services for businesses, organizations and government parastatals with our world’s most secure payment method.
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
                  <a href={link}>{name}</a>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="px-[5%] bg-white py-7 gap-5 md:py-12 flex-wrap-reverse flex justify-between">
        <p className="font-medium">© 2022 MyBalance. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="https://www.facebook.com/themybalanceapp" target="_blank"><img src={facebook} alt="Facebook" /></a>
          <a href="https://twitter.com/mybalance_app" target="_blank"><img src={twitter} alt="Twitter" /></a>
          <a href="" target="_blank"><img src={linkedin} alt="LinkedIn" /></a>
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
        link: "/t&c",
      },
      {
        name: "privacy",
        link: "/privacy",
      },
      {
        name: "cookies",
        link: "/",
      },
     
    ],
  },
];

export default Footer;
