import React, { useState } from "react";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <nav className="w-full flex items-center justify-end md:justify-center mx-auto my-10 px-6 max-w-7xl">
      <MagnifyingGlassIcon className="h-6 w-6 text-black cursor-pointer hidden" />
      <ul className="md:flex gap-6 text-black font-marcellus items-center font-medium hidden">
        <li>
          <a href="#">Homepage</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#" className="font-nata font-bold text-xl">
            ATLAS
          </a>
        </li>
        <li>
          <a href="#">Blog</a>
        </li>
        <li>
          <a href="#">Pages</a>
        </li>
        <li>
          <a href="#">Destinations</a>
        </li>
      </ul>
      <button
        type="button"
        className="cursor-pointer md:hidden"
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
            <a href="#">Homepage</a>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <a href="#">About</a>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <a href="#">Services</a>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <a href="#">Blog</a>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <a href="#">Pages</a>
          </li>
          <li className="hover:text-gray-400 transition-all">
            <a href="#">Destinations</a>
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
