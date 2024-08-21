import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="container mx-auto hero  rounded-lg   text-white">
            <div className="overlay py-16 rounded-lg">
                <div className="lg:w-1/2 px-5 w-full flex flex-col view items-start gap-3">
                    <h1 className="md:text-5xl text-3xl font-semibold ">
                        Order your
                    </h1>
                    <h1 className="md:text-5xl text-3xl font-semibold ">
                        favourite food here
                    </h1>
                    <p className="text-lg">
                        Satisfy your cravings with a wide variety of delicious meals, prepared
                        fresh and delivered straight to your door. From comfort food to gourmet
                        delights, we've got something for everyone. Place your order now and enjoy
                        the taste of happiness!
                    </p>
                    <Link
                        className="px-4 py-2  hover:bg-orange-500 hover:text-white bg-white text-black rounded-full"
                        to="/menu"
                    >
                        View Menu
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
