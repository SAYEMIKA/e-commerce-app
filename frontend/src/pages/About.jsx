import React from 'react'
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Tittle text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, quae quasi. Magnam, quos itaque commodi ipsum amet recusandae doloribus laboriosam eaque quae animi maiores. Numquam veniam excepturi vitae sed provident.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo dolores tempore amet sapiente quia recusandae, inventore deleniti unde fugiat sit corporis, mollitia iste. Reprehenderit itaque expedita unde voluptate sequi animi!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos beatae et amet quasi tenetur architecto voluptates eaque possimus exercitationem non ipsum, voluptate, in deleniti eligendi sunt optio laboriosam ducimus veritatis.</p>
        </div>
      </div>

    <div className='text-xl py-4 '>
      <Tittle text1={'WHY'} text2={'CHOOSE US'} />
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, saepe animi, repellendus dignissimos asperiores quidem amet delectus adipisci inventore quia obcaecati quos a rem. Itaque quas sint delectus perspiciatis qui.</p>
      </div>
      <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
        <b>Convience:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, saepe animi, repellendus dignissimos asperiores quidem amet delectus adipisci inventore quia obcaecati quos a rem. Itaque quas sint delectus perspiciatis qui.</p>
      </div>
      <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, saepe animi, repellendus dignissimos asperiores quidem amet delectus adipisci inventore quia obcaecati quos a rem. Itaque quas sint delectus perspiciatis qui.</p>
      </div>
    </div>
    <NewsletterBox />

    </div>
  )
}

export default About