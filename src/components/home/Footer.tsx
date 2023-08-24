import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Icons/logo.svg";
import facebook from "../../assets/Icons/Facebook.svg";
import twitter from "../../assets/Icons/Twitter.svg";
import linkedin from "../../assets/Icons/LinkedIn.svg";
import Instagram from '../../assets/Icons/Instagram.svg'

const Footer = () => {
  return (
    <div className=" w-full">
      <div className="bg-[#ededed29] py-16 px-[5%] flex flex-col md:flex-row gap-[100px]">
        <div className="">
          <Link to="/">
            <img src={logo} className="mb-[43px]" />
          </Link>
          <p className="w-[258px] font-normal ">
            MyBalance offers escrow services for businesses, organizations and
            government parastatals with our world’s most secure payment method.
          </p>
        </div>
        <div className="flex gap-14 md:gap-24 flex-wrap ">
          {footerData.map(({ items, title }) => (
            <div className="w-[112px]" key={title}>
              <p className="text-tertiary capitalize mb-[16px] font-medium ">
                {title}
              </p>
              <ul className="gap-y-3 capitalize flex flex-col font-medium  text-[#6D6D6D]">
                {items.map(({ name, link, target }) => (
                  <Link to={link} key={link} target={target}>
                    {name}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="px-[5%] bg-white py-7 gap-5 md:py-12 flex-wrap-reverse flex justify-between">
        <p className="font-medium">© 2022 MyBalance. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="https://twitter.com/mybalance_app" target="_blank">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="" target="_blank">
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a href="https://www.facebook.com/themybalanceapp" target="_blank">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/mybalance_app" target="_blank">
            <img src={Instagram} alt="Instagram" />
          </a>
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
        target: "_self"
      },
      {
        name: "companies & merchants",
        link: "/",
        target: "_self"
      },
      {
        name: "governments & contractors",
        link: "/",
        target: "_self"
      },
    
    ],
  },
  {
    title: "company",
    items: [
      {
        name: "about us",
        link: "/about-us",
        target: "_self"
      },
      {
        name: "careers",
        link: "/",
        target: "_self"
      },
      {
        name: "news",
        link: "/",
        target: "_self"
      },
      {
        name: "contact",
        link: "/contact",
        target: "_self"
      },
    ],
  },
  {
    title: "social",
    items: [
      {
        name: "twitter",
        link: "https://twitter.com/mybalance_app",
        target: '_blank'
      },
      {
        name: "linkedIn",
        link: "/",
        target: '_blank'
      },
      {
        name: "facebook",
        link: "https://www.facebook.com/themybalanceapp",
        target: '_blank'
      },
      {
        name: "instagram",
        link: "https://www.instagram.com/mybalance_app",
        target: '_blank'
      },
      
      
    ],
  },
  {
    title: "legals",
    items: [
      {
        name: "terms",
        link: "/t&c",
        target: "_self"
      },
      {
        name: "privacy",
        link: "/privacy",
        target: "_self"
      },
      {
        name: "cookies",
        link: "/",
        target: "_self"
      },
    
    ],
  },
];

export default Footer;
