import React from "react";
import HeroText from "../components/Home/HeroText";
import KuznetsCurve from "../components/Home/KuznetsCurve";
import AboutKuznets from "../components/Home/AboutKuznets";

const Home = () => {
  return (
    <div className="text-black dark:text-white">
      <HeroText />
      <div className="text-black dark:text-white">
        <KuznetsCurve />
      </div>
      <div className="text-black dark:text-white">
        <AboutKuznets />
      </div>
    </div>
  );
};

export default Home;