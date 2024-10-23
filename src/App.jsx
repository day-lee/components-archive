import React, { useState } from "react";
import "./App.css";
import SainsburysCart from "./components/SainsburysCart";
// import MemeGenerator from "./components/MemeGenerator";
// import Supermarket from "./components/Supermarket";

const Supermarket = React.lazy(() => import("./components/Supermarket"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 p-4 bg-gray-500 text-white">
        <p className="text-xl sm:text-2xl font-bold"> Components playground</p>
      </header>
      <main className="pt-4 w-full">
        {/* <MemeGenerator /> */}
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Supermarket />
        </Suspense> */}
        <SainsburysCart />
      </main>
    </>
  );
}

export default App;
