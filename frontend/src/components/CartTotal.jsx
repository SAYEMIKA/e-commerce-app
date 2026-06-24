import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle';
import { formatPrice } from '../utils/formatPrice';

const CartTotal = () => {

    const {currency,delivery_free,getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Tittle text1={'CART'} text2={'TOTALS'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {formatPrice(getCartAmount())}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Free</p>
                <p>{currency}{formatPrice(delivery_free)}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getCartAmount() === 0 ? 0 : formatPrice(getCartAmount() + delivery_free)}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal