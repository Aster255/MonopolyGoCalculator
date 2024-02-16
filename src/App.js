import React, { useState } from "react";
import { LowRoller } from "./LowRoller";
import { HighRoller } from "./HighRoller";

const App = () => {
  const [showComponentA, setShowComponentA] = useState(true);

  const toggleComponent = () => {
    setShowComponentA((prevShowComponentA) => !prevShowComponentA);
  };
  return (
    <div className="p-4">
      <h1>MONOPOLY GO CALCULATOR</h1>
      <button onClick={toggleComponent}>Toggle High Roller</button>
      {showComponentA ? <LowRoller /> : <HighRoller />}
    </div>
  );
};

export default App;
