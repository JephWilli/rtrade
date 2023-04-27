import { client, urlFor } from '@/lib/client';
import { useRouter } from 'next/router';

import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/components';
import { useStateContext } from '@/context/StateContext';



export const getStaticPaths = async () => {
    const query = `*[_type == "product" || _type == "smart_watches"] { slug { current } }`;

  
    const products = await client.fetch(query);
 //   console.log('products: ', products);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));


    return {
      paths,
      fallback: 'blocking'
    }
  }

export const getStaticProps = async ({ params: { slug }}) => {
    //console.log('params: ', params);
 //   console.log('slug: ', slug);
    
    const product = await client.fetch(`*[(_type == "product" || _type == "smart_watches") 
    && slug.current == '${slug}'][0]`);
 //   const product1 = await client.fetch(`*[_type == "smart-watches"   && slug.current == '${slug}']`);
    const products = await client.fetch('*[_type == "product" || _type == "smart_watches"]');
  
    console.log('product: ',product);
 //   console.log('product1: ',product1);

  
    return {
      props: { products, product }
    }
  }

const ProductDetails = ({product, product1, products}) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const {decreaseQty, increaseQty, qty, addToCart} = useStateContext();


    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[index])}
                        className='product-detail-image'/>
                    </div>
                     <div className='small-images-container'>
                        {image?.map((item, i) => (
                            <img 
                                src={urlFor(item)}
                                className={i === index? 
                                'small-image selected-image' :
                                'small-image'}
                                onMouseEnter={()=> setIndex(i)}
                            />
                        ))}
                    </div> 
                </div>

                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'></div>
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>
                        (23)
                    </p> 
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className='price'>ETH {price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decreaseQty}><AiOutlineMinus /></span>
                            <span className='num' onClick=''>{qty}</span>
                            <span className='plus' onClick={increaseQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                        <div className='buttons'>
                            <button type='button'
                                    className='add-to-cart'
                                    onClick={()=> addToCart(product, qty)}>Add to Cart</button>
                            <button type='button'
                                    className='buy-now'
                                    onClick=''>Wishlist</button>
                        </div>
                </div>
            </div>
                    <div className='maylike-products-wrapper'>
                        <h2>You may also like</h2>
                        <div className='marquee'>
                            <div className='maylike-products-container track'>
                                {products.map((item) => (<Product key={item._id}
                                                          product={item}/>))}
                            </div>
                        </div>
                    </div>
        </div>
      )
    }

export default ProductDetails