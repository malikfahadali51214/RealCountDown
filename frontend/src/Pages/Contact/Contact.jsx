import React, { useEffect } from "react";
import './Contact.css';
import Header from "../../Components/Header/Header";
import Contact_From from "../../Components/Contact/Contact_Form/Contact_Form"
import Contact_Map from "../../Components/Contact/Contact_Map/Contact_Map"
import Footer from "../../Components/Footer/Footer";


const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 
  return (
    <>
    <Header />
    <Contact_From />
    <Contact_Map />
    <Footer />
    </>
  )
}

export default Contact;
