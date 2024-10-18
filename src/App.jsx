import { useState } from "react";
import "./App.css";
import MemeGenerator from "./components/MemeGenerator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 p-4 border-2 bg-gray-500">
        <p className="font-bold"> Components playground</p>
      </div>
      <div className="mt-16">
      <MemeGenerator />
      </div>
    </>
  );
}

export default App;
