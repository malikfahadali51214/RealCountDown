import React from "react";
import "./Hero.css"; // CSS file for styling
import hero from '../../Assets/hero-image.svg'
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>All-Inclusive Living, <br/><span className="hero-text2"> One Platform. </span></h1>
        <p>
        Explore a world of possibilities with <span className="hero-text2" style={{fontWeight:"bold"}}>RealCountdown</span>, your all-in-one platform for every imaginable property. 
        From cozy apartments to expansive estates, find your perfect space effortlessly.
        </p>
        <br/>
        <p>
         The Best Companion for Your Property Needs
        </p>
      </div>

      <div className="hero-image">
        <img src={hero} alt="Hero Section" />
      </div>
    </section>
  );
};

export default Hero;
