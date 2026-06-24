import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Tittle from './Tittle'

const RelatedProducts = ({category,subCategory,currentId}) => {

    const {products} = useContext(ShopContext);

    const related = useMemo(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);
            productsCopy = productsCopy.filter((item)=> item._id !== currentId);
            return productsCopy.slice(0,5);
        }
        return [];
    }, [products, category, subCategory, currentId]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
          <Tittle text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item,index)=>(
          <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
