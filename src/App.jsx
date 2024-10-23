// import React, { Suspense, useState } from "react";
import React, { useState } from "react";
import "./App.css";
// import MemeGenerator from "./components/MemeGenerator";
import SainsburysCart from "./components/SainsburysCart";
import hamburgerMenu from "./components/assets/burger-menu.svg";

const Supermarket = React.lazy(() => import("./components/Supermarket"));

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 p-4 bg-gray-500 text-white">
        <nav>
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold">
              Components playground
            </div>
            <div>
              <button
                className="hover:bg-gray-600"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img src={hamburgerMenu} alt="menu" />
              </button>
            </div>
            <div
              className={`absolute top-16 right-4 bg-gray-600 flex-col  ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <div className="block text-white px-4 py-2">Meme Generator</div>
              <div className="block text-white px-4 py-2">Sainsbury's 1</div>
              <div className="block text-white px-4 py-2">Sainsbury's 2</div>
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-4 w-full">
        <SainsburysCart />
        {/* <MemeGenerator />
        <Suspense fallback={<div>Loading...</div>}>
          <Supermarket />
        </Suspense> */}
      </main>
    </>
  );
}

export default App;
