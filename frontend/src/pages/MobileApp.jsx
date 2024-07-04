import React from 'react'
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa"
const MobileApp = () => {
    return (
        <section className="bg-[#FFFBF7]">
            <div className="container flex flex-wrap  py-24">
                <div className='md:w-1/2 w-full pt-5'>
                    <img src="https://b.zmtcdn.com/data/o2_assets/f773629053b24263e69f601925790f301680693809.png" alt="mobile-app" width={300} className='mx-auto' />
                </div>
                <div className='flex flex-col items-center md:items-start  md:w-1/2 w-full gap-4 p-5'>
                    <h1 className='md:text-5xl text-3xl'>Get the Zomato app</h1>
                    <p className='text-xl text-center md:text-left'>We will send you a link, open it on your phone to download the app</p>

                    <div className='flex gap-2 md:flex-row flex-col justify-center w-full md:justify-start'>
                        <input type="text" placeholder='Email' className='border-2 p-2 outline-none rounded-lg' />
                        <button className='bg-[#EF4F5F] text-white px-4 py-2 rounded-lg min-w-fit'>Share App Link</button>
                    </div>
                    <div className='flex gap-2 mt-2 justify-center w-full md:justify-start'>
                        <div className='bg-[#1E3B4F] flex gap-3 items-center px-4 py-2 text-white rounded-lg'>
                            <IoLogoGooglePlaystore size={25}/>
                            <div className='flex flex-col items-start'>
                                <span className='text-xs'>GET IT ON</span>
                                <span className='text-sm'>Google Play</span>
                            </div>
                        </div>
                        <div className='bg-[#1E3B4F] flex gap-3 items-center px-4 py-2 text-white rounded-lg'>
                            <FaApple size={25}/>
                            <div className='flex flex-col items-start'>
                                <span className='text-xs'>Download on the</span>
                                <span className='text-sm'>App Store</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default MobileApp
