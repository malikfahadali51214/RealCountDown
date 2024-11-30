import React from 'react';
import './Agent_Ratings.css';
import profile1 from '../../Assets/profile1.jpg'
import profile2 from '../../Assets/profile2.jpg'
import profile3 from '../../Assets/profile3.jpg'
import profile4 from '../../Assets/profile4.jpg'
import profile5 from '../../Assets/profile5.jpg'
const Agent_Ratings = () => {
  const agents = [
    {
      id: 1,
      name: 'Hassan Ali',
      image: profile1,
      description: 'This is a top-rated agent with excellent service.',
      rating: 3.5,
    },
    {
      id: 2,
      name: 'Daniyal Ahmad',
      image: profile2,
      description: 'An agent with great customer reviews and experience.',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Maria Shafiq',
      image: profile3,
      description: 'Specializes in real estate and has a high satisfaction rate.',
      rating: 2.7,
    },
    {
      id: 4,
      name: 'Mutaza Salman',
      image: profile4,
      description: 'pecializes in real estate and has a high satisfaction rate.',
      rating: 3.6,
    },
    {
      id: 5,
      name: 'Sara Khan',
      image: profile5,
      description: 'Has a reputation for outstanding customer service.',
      rating: 5,
    },
  ];

  return (
    <div className='all-agents'>
      <h1 style={{ textAlign: 'center' }}>Top Rated Agents</h1>
      <div className='agentcard-container'>
        {agents.map((agent) => (
          <div key={agent.id} className='agentcard'>
            <img src={agent.image} alt={agent.name} className='agentcard-image' />
            <h2 className='agentcard-heading'>{agent.name}</h2>
            <p className='agentcard-description'>{agent.description}</p>
            <div className='agentcard-rating'>
              {'★'.repeat(Math.floor(agent.rating)) + (agent.rating % 1 >= 0.5 ? '☆' : '')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agent_Ratings;
