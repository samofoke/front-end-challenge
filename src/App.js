import React from "react";
import NavBar from "./components/Navbar/naviation";
import LandingPage from "./components/Landingpage/LandingPage";
import YearsData from "./components/YearData/YearsF1Data";

const App = () => {
  return (
    <div>
      <NavBar />
      <LandingPage />
      <YearsData />
    </div>
  );
};

export default App;
