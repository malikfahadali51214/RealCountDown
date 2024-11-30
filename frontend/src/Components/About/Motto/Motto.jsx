import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './Motto.css'
import motive from '../../../Assets/motive.png'
const Motto = () => {
  return (
    <div className="motto-main">
    <div className="motto-img">
      <img src={motive} width={400} alt="" style={{alignContent:"center", display:"flex"}}></img>
    </div>
    <div className="motto-text">
      <h2>Connecting, Empowering, Building</h2>
      <p>
      "Revolutionizing real estate interactions with seamless bidding, communication, and secure transactions, connecting buyers, sellers, tenants, and agents effortlessly."</p>
      <Link to='/about'>
        <Button variant="contained" className='motto-btn'>About-Us</Button>
      </Link>
    </div>
  </div>
  )
}

export default Motto
