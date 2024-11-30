import React, { useEffect } from "react";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Agent from '../../Components/About/Agent/Agent';
import Buyer_Seller from '../../Components/About/Buyer_Seller/Buyer_Seller';
import Motto from '../../Components/About/Motto/Motto';
import buyerseller from '../../Assets/buyerseller.jpg'
import renter from '../../Assets/renter.jpg'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 
  return (
    <div>
      <Header/>
      <Buyer_Seller
       firsttag="Buyer"
       f_paragraph="As a buyer, you are actively seeking your dream property. Whether it's a cozy home for your family or an investment opportunity, you're looking for the perfect match. Browse through our extensive listings, save your favorites, and communicate with agents to find the property that meets your needs and aspirations.
       "
       sectag="Seller"
       s_paragraph="As a seller, you are ready to showcase your property to potential buyers. You have a valuable asset and want to maximize its value. List your property on our platform, leverage our network of agents, and track the performance of your listings. Get the exposure you need to attract the right buyers and achieve your selling goals."
       srcimg={buyerseller}
       />
      <Agent/>
      <Buyer_Seller
       firsttag="Renter"
       f_paragraph="As a renter, you have extra space in your property that you'd like to monetize by renting it out to tenants. Whether it's a spare room, a guest house, or an entire property, you can list it on our platform and reach potential tenants. Showcase your rental space, manage inquiries, and connect with tenants to generate additional income and make the most of your property."
       sectag="Tenant"
       s_paragraph="As a tenant, you are searching for the perfect rental property to call home. Whether it's a cozy apartment in the city or a spacious house in the suburbs, you have specific preferences and requirements. Browse through our rental listings, save your searches, and communicate with agents to find the ideal place to live.
"
       srcimg={renter}
       />
      <Motto/>
      <Footer/>
      
    </div>
  )
}

export default About
