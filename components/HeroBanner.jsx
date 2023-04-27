import Link from 'next/link';
import React, {useContext} from 'react';
import { TransactionContext } from "../context/TransactionContext";



import { urlFor } from '../lib/client';


const HeroBanner = ( {heroBanner} ) => {
    const { connectWallet, currentAccount } = useContext(TransactionContext);
    if (!heroBanner) {
        return <p>NOT RENDERING...</p>; // or render a loading state or error message
      }

  return (
    <div className="hero-banner-container"> 
        <div>
            <p className="beats-solo">{heroBanner.smallText}</p>


            <h3>{heroBanner.midText}</h3>
            <h1>{heroBanner.largeText1}</h1>
            <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image"/>

            <div>
                <button type="button" onClick={connectWallet}>{heroBanner.buttonText}</button>
                <div className="desc">
                    <h5>Ends August 21st !</h5>
                    <p>{heroBanner.desc}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner