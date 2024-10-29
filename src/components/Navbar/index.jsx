import React, { useState } from "react";
import { Link } from "react-router-dom";
import hamburgerMenu from "../assets/burger-menu.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full p-2 bg-white shadow-lg">
      <div>
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="text-xl sm:text-xl ml-2 font-bold text-gray-600">
              Components playground
            </div>
          </Link>
          <div>
            <button
              className="hover:bg-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={hamburgerMenu} alt="menu" />
            </button>
          </div>
          <nav
            className={`absolute top-12 right-8 bg-gray-300 rounded-sm flex-col  ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul>
              <Link to="/memegenerator">
                <li className="block px-4 py-2 text-gray-800 hover:text-blue-800">
                  Meme Generator
                </li>
              </Link>
              <Link to="/sainsburys1">
                <li className="block  px-4 py-2 text-gray-800 hover:text-blue-800">
                  Sainsbury's 1
                </li>
              </Link>
              <Link to="/sainsburys2">
                <li className="block px-4 py-2 text-gray-800 hover:text-blue-800">
                  Sainsbury's 2
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
