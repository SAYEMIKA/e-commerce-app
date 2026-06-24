import React from 'react'
import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl, getUserCart } = useContext(ShopContext) 
    const [searchParams,setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + "/api/order/verifyStripe", {success,orderId}, { headers: { token } })

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                // Reload cart items when payment is cancelled
                await getUserCart(token)
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token, backendUrl, setCartItems, navigate, getUserCart, success, orderId])

  return (
    <div>

    </div>
  )
}

export default Verify