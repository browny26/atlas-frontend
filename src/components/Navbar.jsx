import React, { useState } from "react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const NavItem = ({ to, children }) => {
    const isActive = location.pathname === to;

    return (
      <li className="relative">
        <Link
          to={to}
          className={`relative pb-1 group transition-colors duration-300 ${
            isActive ? "text-black" : "text-gray-800 hover:text-black"
          }`}
        >
          {children}
          {/* Linea sottile - attiva */}
          {isActive && (
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></span>
          )}
          {/* Linea hover - animata dal centro */}
          <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </Link>
      </li>
    );
  };

  const DrawerNavItem = ({ to, children, onClick }) => {
    const isActive = location.pathname === to;

    return (
      <li className="relative">
        <Link
          to={to}
          onClick={onClick}
          className={`relative pb-1 group block transition-colors duration-300 ${
            isActive ? "text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          {children}
          {/* Linea sottile - attiva */}
          {isActive && (
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></span>
          )}
          {/* Linea hover - animata dal centro */}
          <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </Link>
      </li>
    );
  };

  return (
    <nav className="w-full flex items-center justify-end md:justify-between mx-auto my-10 px-6 max-w-7xl">
      <span className="h-6 w-6 text-black cursor-pointer opacity-0"></span>
      <ul className="md:flex gap-6 text-black font-nata items-center font-light hidden">
        <NavItem to="/">Homepage</NavItem>
        <NavItem to="/about">About</NavItem>
        <li>
          <Link to="/" className="font-nata font-bold text-xl text-black">
            ATLAS
          </Link>
        </li>
        <NavItem to="/services">Services</NavItem>
        <NavItem to="/adventure">Adventure</NavItem>
      </ul>
      <Link to={token ? "/dashboard" : "/signin"}>
        <UserCircleIcon className="h-6 w-6 text-black cursor-pointer" />
      </Link>

      <button
        type="button"
        className="cursor-pointer md:hidden ms-5"
        onClick={() => setDrawerOpen(true)}
      >
        <Bars3Icon className="h-6 w-6 text-black" />
      </button>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-50 w-full sm:w-[70dvw] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-5 left-5 flex items-center justify-center "
        >
          <XMarkIcon className="h-10 w-10" />
          <span className="sr-only">Close menu</span>
        </button>

        <p className="font-nata font-bold text-xl w-full text-end text-black">
          ATLAS
        </p>

        {/* Contenuto drawer */}
        <ul className="flex flex-col gap-12 h-full text-black font-marcellus text-4xl items-center justify-center font-medium">
          <DrawerNavItem to="/" onClick={() => setDrawerOpen(false)}>
            Homepage
          </DrawerNavItem>
          <DrawerNavItem to="/about" onClick={() => setDrawerOpen(false)}>
            About
          </DrawerNavItem>
          <DrawerNavItem to="/services" onClick={() => setDrawerOpen(false)}>
            Services
          </DrawerNavItem>
          <DrawerNavItem to="/adventure" onClick={() => setDrawerOpen(false)}>
            Adventure
          </DrawerNavItem>
        </ul>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
