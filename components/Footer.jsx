import React from 'react'
import { AiFillCopyrightCircle, AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'



const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Rtrade All Rights Reserved  <AiFillCopyrightCircle /> </p>

      <p className='icons'>
        <AiFillInstagram />
        <AiFillTwitterCircle />
        <AiFillFacebook />
        
      </p>

    </div>
  )
}

export default Footer