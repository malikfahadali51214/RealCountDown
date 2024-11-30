import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"; // import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Icons */}
      <div className="social-media">
        <a href="https://www.facebook.com" className="icon-link">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </a>
        <a href="https://www.instagram.com" className="icon-link">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a href="https://www.twitter.com" className="icon-link">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
      </div>

      <hr className="divider" />

      <div className="footer-content">
        {/* Company Name and Description */}
        <div className="company-info">
          <h3>RealCountDown</h3>
          <p>
          A comprehensive platform for real estate solutions. 
          Whether you're a buyer, seller, tenant, renter, or agent, we're here to simplify your real estate journey. 
          Our goal is to connect you with the perfect property swiftly and efficiently, ensuring a seamless experience every step of the way. 
          Explore our diverse range of listings, personalized services, and expert guidance to meet your unique needs. 
          Join us and discover the future of real estate transactions today.
          </p>
        </div>


        {/* Contact Us */}
        <div className="contact-info">
          <h4>Contact Us</h4>
          <p>
            <a href="mailto:info@realcountdown.com" className="icon-link">
              <FontAwesomeIcon icon={faEnvelope} /> info@realcountdown.com
            </a>
          </p>
          <p>
            <a href="tel:+923499655567" className="icon-link">
              <FontAwesomeIcon icon={faPhone} /> +92 349 9655567
            </a>
          </p>
        </div>
      </div>

      <hr className="divider" />

      <div className="footer-copyright">
        {/* Copyright Notice */}
        <p>©2024 Copyrights RealCountDown. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
