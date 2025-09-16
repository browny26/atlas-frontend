import React from "react";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between mx-auto my-10 px-6 max-w-7xl">
      <MagnifyingGlassIcon className="h-6 w-6 text-black cursor-pointer" />
      <ul className="flex gap-6 text-black font-marcellus items-center font-medium">
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
      <Bars3Icon className="h-6 w-6 text-black cursor-pointer" />
    </nav>
  );
};

export default Navbar;
