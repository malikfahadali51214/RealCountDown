import React from 'react'
import './Buyer_Seller.css'

const Buyer_Seller = (props) => {
    return (
      
        <div className="renterhostess-class">
          <div className="renterhostess-text">
            <h2>{props.firsttag}</h2>
            <p>{props.f_paragraph}</p>
            <h2>{props.sectag}</h2>
            <p>{props.s_paragraph}</p>
          </div>
          <div className="renterhostess-img">
            <img src={props.srcimg} width={500} alt=''/>
          </div>
        </div>
      )
}

export default Buyer_Seller
