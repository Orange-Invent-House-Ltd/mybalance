import { Navigate, Outlet } from "react-router-dom";
import Modal from "../components/reuseable/Modal";
import logo from "../assets/Icons/logo.svg";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import handburger from "../assets/Icons/handburger.svg";
import closeIcon from "../assets/Icons/close.svg";
import sellerSidebarDatas from "./sellerSidebarDatas";
import twitter from "../assets/Icons/Twitter.svg";
import linkedin from "../assets/Icons/LinkedIn.svg";
import facebook from "../assets/Icons/Facebook.svg";
import Instagram from "../assets/Icons/Instagram.svg";
import { useUser } from "../hooks/queries";
import LoadingLogo from "../components/reuseable/LoadingLogo";
import moment from "moment";

const SellerDashboardLayout = () => {
  const today = moment().format("YYYY-MM-DD");
  const [logoutModal, setLogoutModal] = useState(false);
  const { data, isLoading, isError } = useUser();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  if (!localStorage.getItem("session_token")) {
    return <Navigate to="/login" />;
  }
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingLogo />
      </div>
    );
  }

  if (data?.userType === "BUYER") {
    return <Navigate to="/buyer/dashboard" />;
  }
  if (isError) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Modal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
      <div className="md:flex">
        {/* mobile navbar */}
        <div className="md:hidden bg-white sticky top-0 left-0 z-10 py-[5%] px-5 flex justify-between items-center mb-10">
          <Link to="/seller/dashboard">
            <img src={logo} alt="My Balance Logo" className="cursor-pointer" />
          </Link>
          <div>
            <div>
              <NavLink to="#">
                <img
                  src={handburger}
                  alt="menue"
                  onClick={showSidebar}
                  className="w-7 h-7"
                />
              </NavLink>
            </div>
            <nav
              className={
                sidebar
                  ? "navMenu right-0 duration-300"
                  : "navMenu -right-full duration-700"
              }
            >
              <ul>
                <li>
                  <NavLink to="#">
                    <img
                      src={closeIcon}
                      alt="close"
                      className="w-12 py-4 mb-2 mx-auto"
                      onClick={showSidebar}
                    />
                  </NavLink>
                </li>
                {sellerSidebarDatas.map((item, index) => (
                  <li key={index} onClick={showSidebar}>
                    <NavLink
                      to={item.path}
                      className="flex items-center gap-4 h-10 pl-4 mb-4 hover:bg-white hover:text-black"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div
                onClick={() => setLogoutModal(true)}
                className="mt-[20px] pl-4 text-[#DA1E28] hover:bg-white focus:bg-white"
              >
                <div
                  className="flex gap-4 py-2"
                  onClick={() => setSidebar(false)}
                >
                  <svg
                    className="w-6 h-6 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <g
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      clip-path="url(#a)"
                    >
                      <path d="M14 8.592v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                      <path d="M7 12.592h14l-3-3m0 6 3-3" />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 .592h24v24H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  Logout
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* desktop navbar */}
        <div className="hidden h-screen overflow-y-scroll no-scrollbar md:block min-w-[207px] text-white sticky top-0 left-0 bottom-0 bg-[#3A3A3A] pb-8">
          <header className="mt-[50px] mb-[40px] flex justify-center items-center">
            <Link to="/seller/dashboard">
              <img
                src={logo}
                alt="My Balance Logo"
                className="cursor-pointer"
              />
            </Link>
          </header>
          <nav>
            <ul className="flex flex-col gap-2">
              {sellerSidebarDatas.map((item, index) => (
                <li
                  key={index}
                  className={`hover:bg-white hover:text-black ${item.name}`}
                >
                  <NavLink
                    to={item.path}
                    className="flex items-center gap-4 pl-4 py-[10px]"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div
              onClick={() => setLogoutModal(true)}
              className="mt-[20px] pl-4 text-[#DA1E28] hover:bg-white focus:bg-white cursor-pointer"
            >
              <div className="flex gap-4 py-2">
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <g
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    clip-path="url(#a)"
                  >
                    <path d="M14 8.592v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
                    <path d="M7 12.592h14l-3-3m0 6 3-3" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 .592h24v24H0z" />
                    </clipPath>
                  </defs>
                </svg>
                Logout
              </div>
            </div>
          </nav>
        </div>
        <main className="w-full px-3 md:px-6 pt-4 md:pt-[70px] pb-10">
          <Outlet />
          {/* Mobile footer */}
          <div className="mt-24 mb-16 md:hidden">
            <div className="flex gap-6 mb-2 ">
              <a href="https://twitter.com/mybalance_app" target="_blank">
                <img src={twitter} alt="Twitter" />
              </a>
              <a
                href="https://linkedin.com/company/mybalanceapp"
                target="_blank"
              >
                <img src={linkedin} alt="LinkedIn" />
              </a>
              <a
                href="https://www.facebook.com/themybalanceapp"
                target="_blank"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/mybalance_app" target="_blank">
                <img src={Instagram} alt="Instagram" />
              </a>
            </div>
            <p className="text-[#121212] text-base font-medium mt-4">
              © {today.slice(0, 4)} MyBalance. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
