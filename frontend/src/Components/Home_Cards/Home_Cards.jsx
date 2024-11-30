import React from 'react';
import './Home_Cards.css';
import cardData from '../../Assets/cardData';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home_Cards = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleContinueClick = (role) => {
    navigate(`/register?role=${role}`); // Navigate to Register page with role parameter
  };

  return (
    <div className='home_cards'>
      <h1>Who Are You</h1> 
      <div className="cards-wrapper">
        {cardData.map((card, index) => (
          <div className="card-container" key={index}>
            <img className="card-image" src={card.imageSrc} alt={card.title} />
            <h2 className="card-heading">{card.title}</h2>
            <p className="card-paragraph">{card.description}</p>
            <button className="card-button" onClick={() => handleContinueClick(card.role)}> {/* Pass role to the handler */}
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home_Cards;
