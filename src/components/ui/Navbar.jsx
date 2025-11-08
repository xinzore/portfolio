import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Toggle from "./toggle";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useLocation } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [locationPath, setLocationPath] = useState("/");
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.setAttribute("download", "resume.pdf");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full  flex lg:justify-center lg:items-center">
      {/* mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Red background covering whole screen */}
            {isOpen && (
              <motion.div
                className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            {/* Sidebar */}
            <motion.div
              ref={menuRef}
              initial={{ translateX: "100%" }}
              animate={{ translateX: "0%" }}
              exit={{ translateX: "100%" }}
              transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
              className="min-h-screen fixed top-0 right-0 flex flex-col w-[300px] justify-center items-center gap-8 lg:hidden z-50 border-l-2 bg-background"
            >
              {locationPath === "/" ? (
                <>
                  <NavLink
                    className="cursor-pointer"
                    to="/project"
                    onClick={toggleMenu}
                  >
                    Projelerim
                  </NavLink>
                </>
              ) : (
                <NavLink className="cursor-pointer" to="/" onClick={toggleMenu}>
                  About
                </NavLink>
              )}

              <Button onClick={downloadResume}>CV</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* main navbar */}
      <div className="text-[14px] font-Roboto flex flex-row justify-between items-center w-full max-w-[1440px] p-4 my-4 mx-8">
        <div className="flex justify-center items-center">
          <a className="cursor-pointer">
            <Toggle />
          </a>
        </div>
        <div className="hidden lg:flex flex-row gap-6 justify-center items-center">
          {locationPath === "/" ? (
            <NavLink
              className="cursor-pointer hover:underline hover:underline-offset-4"
              to="/project"
              onClick={toggleMenu}
            >
              Project
            </NavLink>
          ) : (
            <NavLink
              className="cursor-pointer hover:underline hover:underline-offset-4"
              to="/"
              onClick={toggleMenu}
            >
              About
            </NavLink>
          )}

          <Button onClick={downloadResume}>Resume</Button>
        </div>
        <AiOutlineMenu className="lg:hidden mx-8 size-5" onClick={toggleMenu} />
      </div>
    </div>
  );
};

export default Navbar;
