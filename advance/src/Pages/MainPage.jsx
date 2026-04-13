import Logo from "../assets/Logo.png";
import HomeBgRight from "../assets/HomeBgRight.png";

import Homepc from "../assets/Home.png";
import ServiceIcon1 from "../assets/ServiceIcon.png";

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
        className={`mt-4 space-y-4 text-gray-300 leading-relaxed ${className}`}
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
        <button
          className={`mt-10 mb-3 h-12 px-6 w-[300px] md:w-[150px] lg:w-[150px] xl:w-[150px] rounded-xl border border-red-500 text-white 
          bg-gradient-to-r from-red-400 to-red-600 
          bg-[length:0%_100%] bg-left bg-no-repeat
          transition-all duration-300 ease-out
          hover:bg-[length:100%_100%] hover:text-black ${
            show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionDelay: `${paragraphs.length * 180}ms`,
          }}
        >
          Contact Us
        </button>
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
      <header className="sticky top-0 w-full bg-black backdrop-blur-md z-50 py-4">
        <div className="px-5">
          <div className="flex justify-between px-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-48 2xl:mx-68">
            <div className="w-20 h-20 shrink-0">
              <img
                src={Logo}
                alt="Logo"
                className="w-15 h-20 cursor-pointer"
                onClick={() => {
                  const homeSection = document.getElementById("home");
                  if (homeSection) {
                    homeSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            </div>

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
                    <span
                      className={`transition-colors duration-200 ${
                        active === item.id
                          ? "text-red-500"
                          : "text-white group-hover:text-red-500"
                      }`}
                    >
                      {item.name}
                    </span>

                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-red-500 transition-all duration-300 ${
                        active === item.id ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </button>
                ))}
              </div>

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
        <div className="absolute top-28 right-30 h-screen hidden xl:block">
          <img
            src={HomeBgRight}
            alt=""
            className="h-full w-auto object-contain"
          />
        </div>
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
              {navLinks.map((item) => (
                <span
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setmobileMenuOpen(false);
                  }}
                  className="text-white text-lg font-sans-serif cursor-pointer hover:text-red-500 transition-colors duration-200"
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
          className="absolute top-0 min-h-screen pt-30 pb-20 w-full bg-cover bg-center"
        >
          <div className="relative top-5 md:top-30 grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 px-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-48 2xl:mx-68 items-center gap-10">
            <div className="px-5  max-w-xl">
              <h1 className="text-4xl md:text-5xl font-semibold my-2 py-3">
                Design-Driven Sales,
              </h1>

              <h2 className="text-4xl text-red-500 md:text-5xl font-semibold text-gray-400">
                Elevated Experiences
              </h2>

              <RevealParagraphs
                paragraphs={[
                  "Transform your vision into a refined digital experience. I take the time to understand your needs and go beyond expectations to deliver with precision—never settling for anything less than excellence. Let’s connect and craft something remarkable.",
                ]}
                button={true}
              />
            </div>
          </div>
        </section>
      </section>

      <section id="about" className="min-h-screen w-full bg-[#0D0C0B] py-30">
        <div className="relative top-20 grid sm:grid-cols-2 px-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-48 2xl:mx-68 gap-10">
          <div className="flex items-center px-5">
            <div className="border-20 rounded-xl border-gray-600 w-85 h-110 ">
              <img
                src={Homepc}
                alt="About"
                className="w-full h-full rounded-xl"
              />
            </div>
          </div>

          <div className="max-w-xl px-5">
            <h2 className="text-base font-light text-gray-400">
              Mastering Design Experience
            </h2>

            <h1 className="text-5xl font-semibold my-2">
              About <span className="text-red-500">Me</span>
            </h1>

            <RevealParagraphs
              paragraphs={[
                "With over a decade of experience in the design industry, I bring clarity, strategy, and creativity to the evolving landscape of UI/UX, graphic, and web design, helping turn concepts into impactful and meaningful digital solutions.",
                "My journey began with a passion for crafting visually stunning and intuitive interfaces, and it has grown into a relentless pursuit of perfection in every pixel, driven by a commitment to both aesthetics and seamless user experience.",
                "In today’s rapidly evolving digital world, I’ve continuously refined my skills to adapt, innovate, and anticipate emerging trends, ensuring your projects not only stay ahead of the curve but also resonate with users on every level.",
              ]}
              button={true}
            />
          </div>
        </div>
      </section>

      <section id="services" className="min-h-screen w-full bg-black py-30">
        <div className="relative top-5 md:top-30 grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 px-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-48 2xl:mx-68 items-center gap-10">
          <div className="px-5  max-w-xl">
            <div className="h-full ">
              <div>
                <h2 className="text-[#232323] text-2xl font-semibold">
                  Your Vision, My Design
                </h2>
                <h1 className="text-5xl font-bold">
                  My <span className="text-red-500">Services</span>
                </h1>
                <RevealParagraphs
                  paragraphs={[
                    <p>
                      Step into a realm where possibilities abound, guided by my
                      expertise and passion. With a deep well of knowledge and
                      creativity at my disposal, I offer you a spectrum of
                      Services designed to elevate your digital presence.
                    </p>,
                  ]}
                  button={true}
                />
              </div>
            </div>
          </div>
          <div className="max-w-xl px-5 sm:px-10">
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
          </div>
        </div>
      </section>
      <section id="certificate" className="min-h-screen w-full bg-black py-30">
        <div className="relative top-20 grid sm:grid-cols-2 px-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-48 2xl:mx-68 gap-10">
          <div className="flex items-center px-5">
            <div className="h-full">
              <div>
                <h2 className="text-[#232323] text-2xl font-semibold">
                  Your Vision, My Design
                </h2>
                <h1 className="text-5xl font-bold text-red-500">
                  Certifications, <span>Tools</span>
                </h1>
                <RevealParagraphs
                  paragraphs={[
                    <div>
                      {" "}
                      <p>
                        Achieving excellence in the world of design requires
                        continuous learning and adaptation. My commitment to
                        staying at the forefront of the industry is demonstrated
                        through my certifications and my ability to tailor my
                        experience to your unique needs.
                      </p>
                      <p>
                        My journey is marked by my dedication to professional
                        growth. I hold certifications, genuine designing tools
                        and methodologies, ensuring that I can leverage the most
                        cutting-edge techniques/tools for any creative projects.
                      </p>
                    </div>,
                  ]}
                  button={true}
                />
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
