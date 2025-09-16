import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col justify-between items-center w-full gap-10">
          <div className="mb-6 md:mb-0 w-full">
            <h3 className="text-3xl font-bold font-nata">ATLAS</h3>
            <p className="text-gray-500 mt-2 font-extralight">
              Discover the world's mysteries with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            <div>
              <h3 className="font-semibold mb-4 font-italiana text-3xl">
                Important Page
              </h3>
              <ul className="space-y-2 text-gray-500 font-extralight">
                <li>Homepage</li>
                <li>About</li>
                <li>Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-italiana text-3xl">
                Other Page
              </h3>
              <ul className="space-y-2 text-gray-500 font-extralight">
                <li>Contact Us</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-italiana text-3xl">
                Social
              </h3>
              <ul className="space-y-2 text-gray-500 font-extralight">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>X</li>
                <li>Linkedin</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 font-italiana text-3xl">
                Resources
              </h3>
              <ul className="space-y-2 text-gray-500 font-extralight">
                <li>Explore</li>
                <li>Learn</li>
                <li>Docs</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2023 Atlas. All rights reserved. | Designed by DIVI PIXEL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
