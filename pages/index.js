import React, {useContext} from 'react';
import { createClient } from "next-sanity";


import {Product, Product1, FooterBanner, HeroBanner} from '../components';
import { TransactionContext } from './../context/TransactionContext';

const client = createClient({
  projectId: "xuc10hn7",
  dataset: "production",
  apiVersion: "2023-02-12",
  useCdn: false
});

export async function getServerSideProps(){
    const products = await client.fetch(`*[_type == "product"]`);
    const products1 = await client.fetch(`*[_type == "smart_watches"]`);
    const banner = await client.fetch(`*[_type == "banner"]`);

    return{
      props:{ products, products1, banner}

      };
}


const index = ( {products, products1, banner} ) => {
  const { connectWallet } = useContext(TransactionContext);


  return (

  <>
      <HeroBanner heroBanner={banner.length>0 && banner[0]}/>


      <div className='products-heading'>
        <h2> Best Sellers</h2>
        <p>Sort your audio needs</p>
      </div>

      <div className='products-container'>
        {products?.map((product)=><Product key= {product._id} product={product}/>)}
      </div>

      <div className='products-heading'>
        <h2> Smart Watches on sale</h2>
      </div>

      <div className='products-container'>
        {products1?.map((product)=><Product key= {product._id} product={product}/>)}
      </div>


      <FooterBanner footerBanner={banner.length>0 && banner[0]}/>

  </>
  
  )
}

export default index