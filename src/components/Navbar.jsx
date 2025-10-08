import React, { useState } from "react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const token = localStorage.getItem("token");
  return (
    <nav className="w-full flex items-center justify-end md:justify-between mx-auto my-10 px-6 max-w-7xl">
      <span className="h-6 w-6 text-black cursor-pointer opacity-0"></span>
      <ul className="md:flex gap-6 text-black font-nata items-center font-light hidden">
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/" className="font-nata font-bold text-xl">
            ATLAS
          </Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
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

        <p className="font-nata font-bold text-xl w-full text-end">ATLAS</p>

        {/* Contenuto drawer */}
        <ul className="flex flex-col gap-12 h-full text-black font-marcellus text-4xl items-center justify-center font-medium">
          <li className="hover:text-gray-400 transition-all">
            <Link to="/">Homepage</Link>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <Link to="/services">Services</Link>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <Link to="#">Blog</Link>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <Link to="/destinations">Destinations</Link>
          </li>
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
