import React from 'react'
import Link from 'next/link'

import { urlFor } from './../lib/client';



const Product1 = ({product1: {image, name, slug, price} }) => {
  return (
    <div>
      <Link href={`/product1/${slug.current}`}>
        <div>
          <img 
          src={urlFor(image && image[0])}
          width={250}
          height={250}
          className='product-image'
          />
          <p className="product-name">{name}</p>
          <p className="product-price">ETH {price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product1