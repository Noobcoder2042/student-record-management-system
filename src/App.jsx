import React, { useState, useEffect } from "react";
import Dashboard from "./Component/Dashboard";
import WelcomeScreen from "./Component/WelcomeScreen"; // Import WelcomeScreen
import "./App.css";
const App = () => {
  const [showWelcome, setShowWelcome] = useState(true); // State to manage welcome screen visibility

  const handleProceed = () => {
    setShowWelcome(false); // Hide welcome screen when proceeding
  };

  return (
    <>
      {showWelcome ? ( // Conditionally render the welcome screen
        <WelcomeScreen onProceed={handleProceed} />
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default App;
