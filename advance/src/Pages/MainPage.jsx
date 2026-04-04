import Logo from "../assets/Logo.png";
import HomeBg from "../assets/HomeBg.jpg";
import Homepc from "../assets/Home.png";

import Icon from "../assets/Facebook.svg";
import Icon2 from "../assets/Instagram.png";
import Icon3 from "../assets/Youtube.png";
import Icon4 from "../assets/Twitter.png";

import "../index.css";

import { Home, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

function MainPage() {
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // 🔒 Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "services", name: "Services" },
    { id: "certificate", name: "Certificate" },
    { id: "portfolio", name: "Portfolio" },
  ];

  const navLogo = [
    { id: "1", name: Icon, AltLog: "Facebook" },
    { id: "2", name: Icon2, AltLog: "Instagram" },
    { id: "3", name: Icon3, AltLog: "Youtube" },
    { id: "4", name: Icon4, AltLog: "Twitter" },
  ];

  // ✅ Scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(id);
      setmobileMenuOpen(false);
    }
  };

  // ✅ Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop - 120;
          const bottom = top + section.offsetHeight;

          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeIcon, setActiveIcon] = useState(null);

  return (
    <div id="body">
      {/* HOME */}
      <header className="top-0 sticky top-0 w-full bg-black backdrop-blur-md z-50 py-4">
        <div className="px-5">
          <div className="flex justify-between px-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-48 2xl:mx-68">
            {/* LOGO */}

            <div className="w-20 h-20 shrink-0">
              <img
                src={Logo}
                alt="Logo"
                className="w-15 h-20"
                onClick={() => {
                  const homeSection = document.getElementById("home");
                  if (homeSection) {
                    homeSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </div>

            {/* NAV */}
            <div className="flex items-center">
              <div className="hidden md:flex items-center pl-8">
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setActive(item.id);
                    }}
                    className="relative mx-3 cursor-pointer font-sans font-light text-white transition-colors duration-200 group"
                  >
                    {/* Text */}
                    <span
                      className={`transition-colors duration-200 ${
                        active === item.id
                          ? "text-red-500"
                          : "text-white group-hover:text-red-500"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Animated underline */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-red-500 transition-all duration-300 ${
                        active === item.id ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </button>
                ))}
              </div>

              {/* ICONS */}
              <div className="hidden lg:flex items-center shrink-0 gap-3 pl-3">
                {navLogo.map((item) => (
                  <div
                    key={item.id}
                    className="relative group cursor-pointer"
                    onClick={() => setActiveIcon(item.id)}
                  >
                    <img
                      src={item.name}
                      alt={item.AltLog}
                      className={`w-5 h-5 transition-transform duration-200 ${
                        activeIcon === item.id
                          ? "scale-110"
                          : "scale-100 group-hover:scale-110"
                      }`}
                    />
                    {/* Underline animation */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-red-500 transition-all duration-300 ${
                        activeIcon === item.id
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden px-3 text-gray-300"
              onClick={() => setmobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>
      <section className="min-h-screen w-full bg-transparent">
        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div
            className={`fixed top-2 inset-0 z-40 bg-black md:hidden overflow-y-auto transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`pt-24 px-10 flex flex-col space-y-3 transform transition-transform duration-300 ${
                mobileMenuOpen ? "translate-y-0" : "-translate-y-10"
              }`}
            >
              {/* Menu Links */}
              {navLinks.map((item) => (
                <span
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-white text-lg font-sans-serif cursor-pointer hover:text-red-500 transition-colors duration-200"
                >
                  {item.name}
                </span>
              ))}

              {/* Icons */}
              <div className="flex gap-4 pt-4 pb-3">
                {navLogo.map((item) => (
                  <img
                    key={item.id}
                    src={item.name}
                    alt={item.AltLog}
                    className="w-5 h-5 transition-transform duration-200 hover:scale-110"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <section id="home" className="absolute top-0 min-h-screen pt-30 pb-20">
          <div className="relative top-5 md:top-30 grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1  px-5 md:px-10 md:mx-18 lg:mx-28  xl:mx-48 2xl:mx-68 items-center gap-10 ">
            <div className="px-3 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-semibold my-2 py-3">
                Design-Driven Sales,
              </h1>

              <h2 className="text-4xl text-red-500 md:text-5xl font-semibold text-gray-400">
                Elevated Experiences
              </h2>

              {/* ✅ PARAGRAPH FIX */}
              <div className="mt-4 space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Transform your vision into a refined digital experience. I
                  take the time to understand your needs and go beyond
                  expectations to deliver with precision—never settling for
                  anything less than excellence. Let’s connect and craft
                  something remarkable.
                </p>
              </div>

              <button
                className="mt-10 mb-5 px-6 h-12 w-[300px] md:w-[150px] lg:w-[150px] xl:w-[150px] rounded-xl border border-red-500 text-red-400 
                bg-gradient-to-r from-red-400 to-red-600 
                bg-[length:0%_100%] bg-left bg-no-repeat
                transition-all duration-500 ease-out
                hover:bg-[length:100%_100%] hover:text-white"
              >
                Contact Us
              </button>
            </div>

            <div className="hidden lg:flex justify-center">
              {/* <img src="" className="w-64 h-150 rounded-md" /> */}
            </div>
          </div>
        </section>

        {/* ABOUT */}
      </section>
      <section id="about" className="min-h-screen w-full bg-[#0D0C0B] py-30">
        <div className="relative top-30 grid sm:grid-cols-2 px-5 md:px-10 md:mx-18 lg:mx-28  xl:mx-48 2xl:mx-68 gap-10">
          <div className="flex items-center">
            <div className=" border-20 rounded-xl border-gray-600 w-85 h-110">
              <img src={Homepc} className="w-full h-full rounded-xl" />
            </div>
          </div>

          <div className="max-w-xl">
            <h2 className="text-base font-light text-gray-400">
              Mastering Design Experience
            </h2>

            <h1 className="text-5xl font-semibold my-2">
              About <span className="text-red-500">Me</span>
            </h1>

            {/* ✅ PARAGRAPH FIX */}
            <div className="mt-4 space-y-4 text-gray-300 leading-relaxed">
              <p>
                With over a decade of experience in the design industry, I bring
                clarity, strategy, and creativity to the evolving landscape of
                UI/UX, graphic, and web design, helping turn concepts into
                impactful and meaningful digital solutions.
              </p>

              <p>
                My journey began with a passion for crafting visually stunning
                and intuitive interfaces, and it has grown into a relentless
                pursuit of perfection in every pixel, driven by a commitment to
                both aesthetics and seamless user experience.
              </p>

              <p>
                In today’s rapidly evolving digital world, I’ve continuously
                refined my skills to adapt, innovate, and anticipate emerging
                trends, ensuring your projects not only stay ahead of the curve
                but also resonate with users on every level.
              </p>
            </div>

            <button
              className="mt-10 mb-3 h-12 px-6 w-[300px] md:w-[150px] lg:w-[150px] xl:w-[150px]  rounded-xl border border-red-500 text-red-400 
              bg-gradient-to-r from-red-400 to-red-600 
              bg-[length:0%_100%] bg-left bg-no-repeat
              transition-all duration-500 ease-out
              hover:bg-[length:100%_100%] hover:text-white"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
