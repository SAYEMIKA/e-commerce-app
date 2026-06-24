import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo2} className='mb-5 w-24 sm:w-32 md:w-40 h-auto object-contain' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, autem nam tenetur laboriosam doloribus illum sunt corporis molestiae molestias sit voluptatem et natus iste perferendis aliquid error beatae modi accusamus.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Phone: +62 81434523</li>
                    <li>Email: info@example.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© 2024 Your Company Name. All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer