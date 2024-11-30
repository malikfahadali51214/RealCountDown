import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import Home_Cards from "../../Components/Home_Cards/Home_Cards";
import Motto from "../../Components/Motto/Motto";
import Agent_Ratings from "../../Components/Agent_Ratings/Agent_Ratings";
import Footer from "../../Components/Footer/Footer";



const Home = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 

  return (
    <div>
      <Header />
      <Hero />
      <Home_Cards />
      <Motto />
      <Agent_Ratings />
      <Footer />
    </div>
  );
};

export default Home;
