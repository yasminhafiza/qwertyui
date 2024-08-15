import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/suitmedia_logo.png";

const Header = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setScrollingUp(currentScroll < lastScrollTop);
      setLastScrollTop(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const isActive = (path) =>
    location.pathname === path ? "border-b-4 border-white pb-1" : "";

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-orange-500 text-white transition-transform duration-300 z-20 ${
        scrollingUp ? "translate-y-0 opacity-90" : "-translate-y-full opacity-100"
      }`}
    >
      <nav className="flex justify-between items-center py-3 mx-20">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Menu */}
        <div className="flex space-x-4">
          <Link to="/" className={`hover:text-gray-200 ${isActive("/")}`}>
            Home
          </Link>
          <Link to="/about" className={`hover:text-gray-200 ${isActive("/about")}`}>
            About
          </Link>
          <Link to="/services" className={`hover:text-gray-200 ${isActive("/services")}`}>
            Services
          </Link>
          <Link to="/ideas" className={`hover:text-gray-200 ${isActive("/ideas")}`}>
            Ideas
          </Link>
          <Link to="/careers" className={`hover:text-gray-200 ${isActive("/careers")}`}>
            Careers
          </Link>
          <Link to="/contacts" className={`hover:text-gray-200 ${isActive("/contacts")}`}>
            Contacts
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
