import agent from "../Assets/agent.jpg";
import Buyer from '../Assets/Buyer.png';

const cardData = [
  {
    imageSrc: agent,
    title: 'Are you an Agent?',
    description: 'Bridge the gap between dreams and reality with expert real estate services.',
    buttonText: 'Continue',
    role: 'agent', // Add role
  },
  {
    imageSrc: Buyer,
    title: 'Are you a Customer?',
    description: 'Discover your dream home with ease and confidence on our platform.',
    buttonText: 'Continue',
    role: 'customer', // Add role
  },
];

export default cardData;
