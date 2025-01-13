import React from "react";
import HeroText from "../components/Home/HeroText";
import KuznetsCurve from "../components/Home/KuznetsCurve";
import AboutKuznets from "../components/Home/AboutKuznets";

const Home = () => {
  return (
    <div>
      <HeroText />
      <div>
        <KuznetsCurve />
      </div>
      <div>
        <AboutKuznets />
      </div>
    </div>
  );
};

export default Home;
