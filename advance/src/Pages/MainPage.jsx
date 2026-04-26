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

import portfolio1 from "../assets/About1.png";
import portfolio2 from "../assets/VincentBg.png";
import portfolio3 from "../assets/About1.png";
import portfolio4 from "../assets/VincentBg.png";

import certificate0 from "../assets/certificateVL.png";
import certificate1 from "../assets/certificateVL1.png";
import certificate2 from "../assets/certificateVL2.png";
import certificate3 from "../assets/certificateVL3.png";

import "../index.css";

import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
function PortfolioSlider() {
  const slides = [
    {
      id: 1,
      title: "Frontend Project",
      highlight: "Portfolio.",
      description:
        "A modern and clean web project focused on smooth interaction, responsive layout, and polished visual presentation.",
      image: portfolio1,
    },
    {
      id: 2,
      title: "UI/UX Project",
      highlight: "Design.",
      description:
        "An interface design concept that combines usability, visual clarity, and conversion-focused structure.",
      image: portfolio2,
    },
    {
      id: 3,
      title: "Web Experience",
      highlight: "Creative.",
      description:
        "A premium landing page experience with emphasis on storytelling, animation, and strong visual hierarchy.",
      image: portfolio3,
    },
    {
      id: 4,
      title: "Development Work",
      highlight: "Build.",
      description:
        "A scalable frontend implementation built with reusable structure, performance, and responsive behavior in mind.",
      image: portfolio4,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState(null);
  const [flyingImage, setFlyingImage] = useState(null);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [heroScaleKey, setHeroScaleKey] = useState(0);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);

  const sectionRef = useRef(null);
  const isPortfolioVisibleRef = useRef(false);

  const heroRef = useRef(null);
  const thumbRefs = useRef([]);
  const autoRef = useRef(null);
  const timeoutRefs = useRef([]);

  const visibleThumbCount = 4;

  const clearAllTimers = () => {
    clearInterval(autoRef.current);
    timeoutRefs.current.forEach((timer) => clearTimeout(timer));
    timeoutRefs.current = [];
  };

  const addTimer = (callback, delay) => {
    const timer = setTimeout(() => {
      callback();
      timeoutRefs.current = timeoutRefs.current.filter(
        (item) => item !== timer,
      );
    }, delay);

    timeoutRefs.current.push(timer);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.55;
        setIsPortfolioVisible(visible);
        isPortfolioVisibleRef.current = visible;
      },
      { threshold: [0, 0.55, 1] },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    isPortfolioVisibleRef.current = isPortfolioVisible;

    if (!isPortfolioVisible) {
      clearAllTimers();
      setFlyingImage(null);
      setIncomingIndex(null);
    }
  }, [isPortfolioVisible]);

  useEffect(() => {
    clearInterval(autoRef.current);

    if (!isPortfolioVisible) return;

    autoRef.current = setInterval(() => {
      if (isPortfolioVisibleRef.current) {
        handleNext(true);
      }
    }, 5000);

    return () => clearInterval(autoRef.current);
  }, [activeIndex, isPortfolioVisible]);

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const resetAuto = () => {
    clearInterval(autoRef.current);
  };

  const visibleThumbs = useMemo(() => {
    return Array.from({ length: visibleThumbCount }, (_, i) => {
      const index = (thumbStartIndex + i) % slides.length;
      return { ...slides[index], originalIndex: index };
    });
  }, [thumbStartIndex, slides.length]);

  const startFlyAnimation = (targetIndex, sourceIndex) => {
    if (!isPortfolioVisibleRef.current) return;

    clearAllTimers();

    const thumbEl = thumbRefs.current[sourceIndex];
    const heroEl = heroRef.current;

    if (!thumbEl || !heroEl) {
      setActiveIndex(targetIndex);
      setTextIndex(targetIndex);
      setHeroScaleKey((prev) => prev + 1);
      return;
    }

    const thumbRect = thumbEl.getBoundingClientRect();
    const heroRect = heroEl.getBoundingClientRect();

    setFlyingImage({
      image: slides[targetIndex].image,
      start: {
        x: thumbRect.left + 3,
        y: thumbRect.top + 3,
        width: thumbRect.width - 6,
        height: thumbRect.height - 6,
        borderRadius: 18,
      },
      end: {
        x: heroRect.left,
        y: heroRect.top,
        width: heroRect.width,
        height: heroRect.height,
        borderRadius: 0,
      },
    });

    setIncomingIndex(targetIndex);

    addTimer(() => {
      if (!isPortfolioVisibleRef.current) return;
      setActiveIndex(targetIndex);
      setHeroScaleKey((prev) => prev + 1);
    }, 620);

    addTimer(() => {
      if (!isPortfolioVisibleRef.current) return;
      setTextIndex(targetIndex);
    }, 720);

    addTimer(() => {
      if (!isPortfolioVisibleRef.current) return;
      setIncomingIndex(null);
      setFlyingImage(null);
    }, 1100);
  };

  const handleThumbClick = (index) => {
    if (index === activeIndex) return;
    resetAuto();
    startFlyAnimation(index, index);
    setThumbStartIndex(index);
  };

  const handleNext = (isAuto = false) => {
    if (isAuto && !isPortfolioVisibleRef.current) return;
    if (!isAuto) resetAuto();
    const next = (activeIndex + 1) % slides.length;
    startFlyAnimation(next, next);
    setThumbStartIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    resetAuto();
    const prev = (activeIndex - 1 + slides.length) % slides.length;
    startFlyAnimation(prev, prev);
    setThumbStartIndex(
      (prevStart) => (prevStart - 1 + slides.length) % slides.length,
    );
  };

  const currentSlide = slides[activeIndex];
  const currentText = slides[textIndex];

  return (
    <section
      ref={sectionRef}
      id="portfolio-slider"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
    >
      <div ref={heroRef} className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          key={`${currentSlide.id}-${heroScaleKey}`}
          src={currentSlide.image}
          alt={currentSlide.highlight}
          className="h-full w-full object-cover"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      </div>

      <AnimatePresence>
        {flyingImage && (
          <motion.img
            key={`${flyingImage.image}-${incomingIndex}`}
            src={flyingImage.image}
            alt=""
            className="pointer-events-none fixed z-[35] object-cover shadow-2xl will-change-transform"
            initial={{
              left: flyingImage.start.x,
              top: flyingImage.start.y,
              width: flyingImage.start.width,
              height: flyingImage.start.height,
              borderRadius: flyingImage.start.borderRadius,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              left: flyingImage.end.x,
              top: flyingImage.end.y,
              width: flyingImage.end.width,
              height: flyingImage.end.height,
              borderRadius: flyingImage.end.borderRadius,
              opacity: 1,
              scale: 1.015,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.05,
              ease: [0.19, 1, 0.22, 1],
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute left-1/2 top-6 z-30 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs"></div>

      <div className="relative z-30 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl font-sans"
            >
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-lg font-bold text-blue-400 md:text-xl"
              >
                Portfolio
              </motion.h2>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.04 }}
                className="my-2 py-3 text-5xl font-semibold leading-tight text-white md:text-6xl"
              >
                {currentText.title}
                <br />
                <span className="text-blue-400">{currentText.highlight}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.1 }}
                className="mt-3 max-w-md text-sm leading-6 text-white/80 md:text-base"
              >
                {currentText.description}
              </motion.p>

              <motion.button
                onClick={() => handleNext(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.16 }}
                className="mt-6 rounded-2xl border border-white/70 bg-white px-6 py-3 text-sm font-medium uppercase tracking-widest text-black transition hover:bg-transparent hover:text-white"
              >
                Next Project
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-50">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-xl text-white backdrop-blur transition hover:bg-white hover:text-black"
            >
              ‹
            </button>
            <button
              onClick={() => handleNext(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-xl text-white backdrop-blur transition hover:bg-white hover:text-black"
            >
              ›
            </button>
          </div>

          <div className="overflow-hidden pb-1">
            <motion.div
              layout
              className="flex gap-3"
              transition={{
                layout: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
            >
              {visibleThumbs.map((slide) => {
                const isActive = slide.originalIndex === activeIndex;
                const isIncoming = slide.originalIndex === incomingIndex;

                return (
                  <motion.button
                    layout
                    key={`${slide.id}-${slide.originalIndex}`}
                    ref={(el) => {
                      if (el) thumbRefs.current[slide.originalIndex] = el;
                    }}
                    onClick={() => handleThumbClick(slide.originalIndex)}
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      layout: {
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      duration: 0.35,
                    }}
                    className={`group relative h-28 w-20 shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-24 ${
                      isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <motion.img
                      src={slide.image}
                      alt={slide.highlight}
                      className="h-full w-full object-cover"
                      animate={{
                        scale: isActive ? 1.06 : isIncoming ? 1.03 : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-black/25 group-hover:bg-black/10"
                      animate={{
                        backgroundColor: isActive
                          ? "rgba(0,0,0,0.08)"
                          : "rgba(0,0,0,0.28)",
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-50 h-1 w-full bg-white/10">
        {isPortfolioVisible && (
          <motion.div
            key={activeIndex}
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        )}
      </div>
    </section>
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
    { id: "portfolio", name: "Portfolio" },
    { id: "certificate", name: "Certificate" },
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
      <header className="items-center sticky top-0 w-full h-25 bg-transparent  z-50 py-4 shadow-md">
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
                    className="flex justify-center items-center mx-1 w-20 h-12 px-3 py-4 cursor-pointer bg-gray-200 font-sans font-semibold  transition-colors
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
        className="relative min-h-screen w-full  bg-white pb-20"
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
              className="w-fit h-110  xl:h-full 2xl:w-full 2xl:h-full "
            />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative min-h-screen w-full  bg-white py-20 "
      >
        <div
          className="relative  sm:top-0 md:top-30 lg:top-30 grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1
           pl-5 pr-10 py-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-38 2xl:mx-58 items-center gap-10 font-sans"
        >
          <div className="flex">
            <img
              src={About1}
              alt="About Picture"
              className="w-fit h-110  xl:h-full 2xl:w-full 2xl:h-full "
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
        className="relative min-h-screen w-full  bg-white py-20 "
      >
        <div
          className="relative top-0 md:top-20 lg:top-30 xl:top-0 grid
           pl-5 pr-10 py-5 md:px-10 md:mx-18 lg:mx-28 xl:mx-38 2xl:mx-58 gap-3 font-sans my-3"
        >
          <div className="w-full px-5 text-center font-sans">
            <div className="justify-center">
              <h2 className="text-shadow-lg/10 text-lg text-blue-700 md:text-xl font-bold">
                Services
              </h2>
              <h1 className="text-5xl xl:text-6xl font-semibold my-2 py-3 text-shadow-lg/10">
                What I Do
              </h1>
              <h2 className="text-lg">
                I provide high-quality service to help businesses grow and
                success
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 sm:gap-5 my-10">
            <div className="h-full w-fit shadow-xl/20 rounded-2xl px-3 py-5 mx-5 xl:mx-2 my-3">
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

            <div className="h-full w-fit shadow-xl/20 rounded-2xl px-3 py-5 mx-5 xl:mx-2 my-3">
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

            <div className="h-full w-fit shadow-xl/20 rounded-2xl px-3 py-5 mx-5 xl:mx-2 my-3">
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
        </div>
      </section>

      <section id="portfolio">
        <PortfolioSlider />
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
