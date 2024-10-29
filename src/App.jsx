import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import MemeGenerator from "./components/MemeGenerator";
import Navbar from "./components/Navbar";
import SainsburysCart from "./components/SainsburysCart";

const Supermarket = React.lazy(() => import("./components/Supermarket"));

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-20 w-full flex justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memegenerator" element={<MemeGenerator />} />
            <Route path="/sainsburys1" element={<Supermarket />} />
            <Route path="/sainsburys2" element={<SainsburysCart />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
