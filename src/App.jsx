import React, { Suspense, useState } from "react";
import "./App.css";
// import MemeGenerator from "./components/MemeGenerator";
// import Supermarket from "./components/Supermarket";

const Supermarket = React.lazy(() => import("./components/Supermarket"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 p-4 border-2 bg-gray-500 text-white">
        <p className="font-bold"> Components playground</p>
      </div>
      <div className="mt-16">
        {/* <MemeGenerator /> */}
        {/* <Supermarket /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <Supermarket />
        </Suspense>
      </div>
    </>
  );
}

export default App;
