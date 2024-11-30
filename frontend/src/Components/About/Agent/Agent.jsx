import React from "react";
import "./Agent.css";
import agenti from '../../../Assets/agenti.png'
const Agent = () => {
  return (
    <>
      <div className="agent-class">
        <div className="agent-img">
          <img src={agenti} width={400} alt="" style={{alignContent:"center", display:"flex"}} />
        </div>
        <div className="agent-text">
          <h2>Agents</h2>
          <p>
          As an agent, you are the bridge between buyers and sellers, guiding them through the intricate process of real estate transactions. Utilize our platform to connect with clients, bid on property requirements, and showcase your expertise. Manage your client relationships, track your performance, and stay updated on market trends to provide exceptional service and achieve success in your career.
          </p>
        </div>
      </div>
    </>
  );
};

export default Agent;
