import Logo from "../assets/Logo.png";

import About1 from "../assets/About1.png";
import VincentBg from "../assets/VincentBg.png";
import ServiceIcon1 from "../assets/ServiceIcon.png";
import Browserservecies from "../assets/Browserservices.svg";
import Mobileservices from "../assets/Mobileservices.svg";
import Editservices from "../assets/Editservices.svg";

import Icon from "../assets/Facebook.svg";
import Icon2 from "../assets/Instagram.png";
import Icon3 from "../assets/Youtube.png";
import Icon4 from "../assets/Twitter.png";

import certificate0 from "../assets/certificateVL.png";
import certificate1 from "../assets/certificateVL1.png";
import certificate2 from "../assets/certificateVL2.png";
import certificate3 from "../assets/certificateVL3.png";

import "../index.css";

import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function RevealParagraphs({ paragraphs, className = "", button = false }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        className={`mt-4 space-y-4 text-gray-700 leading-relaxed ${className}`}
      >
        {paragraphs.map((text, index) => (
          <p
            key={index}
            className={`transition-all duration-700 ease-out ${
              show
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-6 opacity-0 blur-sm"
            }`}
            style={{
              transitionDelay: `${index * 180}ms`,
            }}
          >
            {text}
          </p>
        ))}
      </div>

      {button && (
        <div className="grid grid-cols-1 md:grid-cols-2 font-sans">
          <button
            className={`bg-blue-700 mt-10 mb-3 gap-5 h-15 px-6 w-[300px] md:w-[200px] lg:w-[200px] xl:w-[200px] rounded-2xl border-1 border-blue-700 
            shadow-2xl  text-white hover:text-black hover:text-shadow-xl/20
          bg-gradient-to-r from-blue-400 to-blue-600 
          bg-[length:0%_100%] bg-left bg-no-repeat
          transition-all duration-300 ease-out
          hover:bg-[length:100%_100%] hover:text-black ${
            show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
            style={{
              transitionDelay: `${paragraphs.length * 180}ms`,
            }}
          >
            View My work
          </button>
          <button
            className={`mt-3 md:mt-10 mb-3 h-15 px-6 w-[300px]  md:w-[200px] lg:w-[200px] xl:w-[200px] rounded-2xl border-1 border-blue-700 
            shadow-2xl  text-blue-700 hover:text-white 
          bg-gradient-to-r from-blue-400 to-blue-600 
          bg-[length:0%_100%] bg-left bg-no-repeat
          transition-all duration-300 ease-out
          hover:bg-[length:100%_100%] hover:text-black ${
            show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
            style={{
              transitionDelay: `${paragraphs.length * 180}ms`,
            }}
          >
            Contact Me
          </button>
        </div>
      )}
    </div>
  );
}

function MainPage() {
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
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

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(id);
      setmobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6, // 60% visible = active
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div id="body">
      <header className="items-center sticky top-0 w-full h-25 bg-[#F2EDED] z-50 py-4 shadow-md">
        <div className="px-5">
          <div className="flex  justify-between items-center h-full px-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-38 2xl:mx-58 ">
            <div className="flex justify-center w-auto h-full shrink-0 ">
              <img
                src={Logo}
                alt="Logo"
                className="w-40 h-17 cursor-pointer"
                onClick={() => {
                  const homeSection = document.getElementById("home");
                  if (homeSection) {
                    homeSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </div>

            <div className="flex items-center ">
              <div className="hidden md:flex items-center pl-8 ">
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setActive(item.id);
                    }}
                    className="flex justify-center items-center mx-1 w-20 h-12 px-3 py-4 cursor-pointer font-sans font-semibold  transition-colors
                     duration-200 group shadow-lg/20 border-gray-900 rounded-xl hover:h-16 hover:w-27 hover:text-xl hover-text-shadow-lg/20"
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        active === item.id
                          ? "text-blue-700"
                          : "text-black group-hover:text-blue-500"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-red-500 transition-all duration-300 ${
                        active === item.id ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span> */}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex shrink-0 gap-3 pl-3 ">
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

            <button
              className="md:hidden px-3 text-black"
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

      {/* <div className="absolute top-28 right-30 h-screen hidden xl:block">
          <img
            src={HomeBgRight}
            alt=""
            className="h-full w-auto object-contain"
          />
        </div> */}
      {mobileMenuOpen && (
        <div
          className={`fixed top-2 inset-0 z-40 bg-white md:hidden overflow-y-auto transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`pt-24 px-10 flex flex-col space-y-3 transform transition-transform duration-300 ${
              mobileMenuOpen ? "translate-y-0" : "-translate-y-10"
            }`}
          >
            {navLinks.map((item) => (
              <span
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setmobileMenuOpen(false);
                }}
                className="w-fit cursor-pointer px-5 py-3 transition-colors duration-200 hover:rounded-xl hover:bg-blue-200 hover:text-blue-700 hover:shadow-xl/20"
              >
                {item.name}
              </span>
            ))}

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

      <section
        id="home"
        className="relative min-h-screen w-full  bg-white pb-20 border-1"
      >
        <div
          className="relative top-25 md:top-30 lg:top-30 grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1
           pl-5 pr-10 py-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-38 2xl:mx-58 items-center gap-10 font-sans"
        >
          <div className="px-5 max-w-xl">
            <div className="flex justify-center bg-gray-200 w-32 rounded-2xl">
              <h2 className="text-normal text-blue-700 md:text-xl font-semibold ">
                HELLO, I'M
              </h2>
            </div>

            <h1 className="text-7xl xl:text-5xl font-semibold my-2 py-3 text-shadow-lg/30">
              Vincent Leyson
            </h1>
            <h2 className="text-2xl sm:text-lg">
              I'm a<span className="text-blue-700"> Frontend Developer </span>|
            </h2>

            <RevealParagraphs
              paragraphs={[
                "I build scalable, high-performance web applications that deliver exceptional user experience. I take the time to understand your needs and go beyond expectations to deliver with precision—never settling for anything less than excellence. Let’s connect and craft something remarkable.",
              ]}
              button={true}
            />
          </div>
          <div className="flex">
            <img
              src={VincentBg}
              alt="Profile"
              className="w-130 h-110  xl:h-full 2xl:w-full 2xl:h-full "
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative min-h-screen w-full  bg-white py-20 border-1"
      >
        <div
          className="relative  sm:top-0 md:top-30 lg:top-30 grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1
           pl-5 pr-10 py-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-38 2xl:mx-58 items-center gap-10 font-sans"
        >
          <div className="flex">
            <img
              src={About1}
              alt="About Picture"
              className="w-130 h-110  xl:h-full 2xl:w-full 2xl:h-full "
            />
          </div>

          <div className="px-5 w-full font-sans">
            <h2 className="text-shadow-lg/10 text-lg text-blue-700 md:text-xl font-bold">
              About Me
            </h2>
            <h1 className="text-5xl xl:text-6xl font-semibold my-2 py-3 text-shadow-lg/30">
              Passionate Developer Who
              <span className="text-blue-700">Love to Code</span>
            </h1>
            <RevealParagraphs
              paragraphs={[
                "I'm a Frontend developer with a passion  for building scalable Web responsive applications. I specialize  in moderm  UI/UX framework and love turning ideas into reality",
              ]}
            />
          </div>
        </div>
      </section>
      <section
        id="services"
        className="relative min-h-screen w-full  bg-white py-20 border-1"
      >
        <div
          className="relative top-0 md:top-20 lg:top-30 xl:top-0 grid
           pl-5 pr-10 py-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-38 2xl:mx-58  gap-10 font-sans"
        >
          <div className="w-full px-5 text-center font-sans">
            <div className="justify-center">
              <h2 className="text-shadow-lg/10 text-lg text-blue-700 md:text-xl font-bold">
                Services
              </h2>
              <h1 className="text-5xl xl:text-6xl font-semibold my-2 py-3 text-shadow-lg/10">
                What I Do
              </h1>
              <h2>
                I provide high-quality service to help businesses grow and
                success
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="h-full w-110 2xl:w-90 xl:w-80 shadow-xl/20 rounded-2xl px-3 py-5 mx-5">
              <div className="px-3 py-2 h-15 w-15 shadow-xl/10 bg-gray-200 rounded-xl">
                <img
                  src={Browserservecies}
                  alt="Services"
                  className="w-10 h-10"
                />
              </div>
              <div className="my-10 font-sans">
                <h1 className="text-2xl font-semibold">Web Development</h1>
                <RevealParagraphs
                  paragraphs={[
                    <p className="py-5">
                      I Build responsive and performance website using modern
                      technology
                    </p>,
                  ]}
                ></RevealParagraphs>
              </div>
            </div>

            <div className="h-full w-110 2xl:w-90 xl:w-80 shadow-xl/20 rounded-2xl px-3 py-5 mx-5">
              <div className="px-3 py-2 h-15 w-15 shadow-xl/10 bg-gray-200 rounded-xl">
                <img
                  src={Mobileservices}
                  alt="Services"
                  className="w-10 h-10"
                />
              </div>
              <div className="my-10 ">
                <h1 className="text-2xl font-semibold">Mobile Development</h1>
                <RevealParagraphs
                  paragraphs={[
                    <p className="py-5">
                      I create cross-platform mobile applications that provide
                      great user experiences.
                    </p>,
                  ]}
                ></RevealParagraphs>
              </div>
            </div>
            <div className="h-full w-110 2xl:w-90 xl:w-80 shadow-xl/20 rounded-2xl px-3 py-5 mx-5">
              <div className="px-3 py-2 h-15 w-15 shadow-xl/10 bg-gray-200 rounded-xl">
                <img src={Editservices} alt="Services" className="w-10 h-10" />
              </div>
              <div className="my-10 font-sans">
                <h1 className="text-2xl font-semibold">UI/UX Design</h1>
                <RevealParagraphs
                  paragraphs={[
                    <p className="py-5">
                      I design clean and intuitive user interfaces that enhance
                      user experience.
                    </p>,
                  ]}
                ></RevealParagraphs>
              </div>
            </div>
          </div>

          {/* <div className="max-w-xl px-5 sm:px-10">
            <RevealParagraphs
              paragraphs={[
                <div>
                  <div className="flex flex-col sm:flex-row items-start h-auto  gap-1  py-4 my-4  border-b border-[#232323] gap-4">
                    <img
                      src={ServiceIcon1}
                      alt="Service Icon"
                      className="w-16 h-16 object-contain shrink-0"
                    />
                    <div className="flex flex-col">
                      <h2 className="mb-2 text-2xl font-light">UI/UX Design</h2>
                      <span className="text-base">
                        User interfaces and experiences that not only captivate
                        but also ensure seamless interaction.
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start h-auto gap-1  py-4  my-4 border-b border-[#232323] gap-4">
                    <img
                      src={ServiceIcon1}
                      alt="Service Icon"
                      className="w-16 h-16 object-contain shrink-0"
                    />
                    <div className="flex flex-col">
                      <h2 className="mb-2 text-2xl font-light">
                        Graphic Design
                      </h2>
                      <span className="text-base">
                        Create concepts into impactful designs that resonate
                        with your audience.
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start h-auto gap-1  py-4 my-4 border-b border-[#232323] gap-4">
                    <img
                      src={ServiceIcon1}
                      alt="Service Icon"
                      className="w-16 h-16 object-contain shrink-0"
                    />
                    <div className="flex flex-col">
                      <h2 className="mb-2 text-2xl font-light">Web Design</h2>
                      <span className="text-base">
                        Build responsive, high-performance websites that
                        function flawlessly across devices, ensuring a flawless
                        user journey.
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start h-auto gap-1  py-4 my-4 border-b border-[#232323] gap-4">
                    <img
                      src={ServiceIcon1}
                      alt="Service Icon"
                      className="w-16 h-16 object-contain shrink-0"
                    />
                    <div className="flex flex-col">
                      <h2 className="mb-2 text-2xl font-light">
                        Branding Design
                      </h2>
                      <span className="text-base">
                        Crafting a unique identity that is essential in today's
                        competitive landscape.
                      </span>
                    </div>
                  </div>
                </div>,
              ]}
            />
          </div> */}
        </div>
      </section>
      <section id="certificate" className="min-h-screen w-full bg-black py-30">
        <div
          className="relative top-0 md:top-30 grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1
           px-10 md:px-10 md:mx-18 lg:mx-28 xl:mx-38 2xl:mx-58 items-center gap-10 font-sans"
        >
          <div className="flex items-center px-5">
            <div className="h-full">
              <div>
                <img src="" alt="" />
              </div>
            </div>
          </div>

          <div className="flex items-center max-w-xl px-5">
            <RevealParagraphs
              paragraphs={[
                <div className=" grid grid-cols-2">
                  <div className="flex items-center">
                    <img src={certificate0} alt="" />
                  </div>
                  <div className="flex items-center">
                    <img src={certificate1} alt="" />
                  </div>
                  <div className="flex items-center">
                    <img src={certificate2} alt="" />
                  </div>
                  <img src={certificate3} alt="" />
                </div>,
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
