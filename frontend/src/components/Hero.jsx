import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <div className="hero">
            <div className='overlay w-full h-full py-24 my-4 text-white rounded-lg'>
                <div className='lg:w-1/2 md:pl-10 pl-3 w-full flex flex-col items-start  gap-3'>
                    <h1 className='md:text-5xl text-3xl font-semibold  hero-content'>Order your</h1>
                    <h1 className='md:text-5xl text-3xl font-semibold  hero-content'>favourite food here</h1>
                    <p className='text-lg header-content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eligendi mollitia, odit dolor dicta animi.</p>
                    <Link className='px-4 py-2 header-content bg-white text-black rounded-full' to={"/menu"}>view menu</Link>
                </div>




            </div>
        </div>

    )
}

export default Hero
