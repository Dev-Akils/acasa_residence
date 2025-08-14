import { useEffect, useState } from 'react';
import image1 from '../assets/backgroundimage.png';
import image2 from '../assets/backgroundimage1.png';
import image3 from '../assets/backgroundimage2.png';
import Form from './Form';
import { SiYoutubemusic } from "react-icons/si";


const images = [

    {
        image1: image1,
        heading: "Commercial Building Services",
        paragraph: "Engineered for Long-Term Impact",

    },
    {
        image1: image2,
        heading: "Smart & Green Building Services",
        paragraph: "For the Conscious Era",

    },
    {
        image1: image3,
        heading: "Commercial Building Services",
        paragraph: "Engineered for Long-Term Impact",

    },

]
export default function HeroSection() {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    const otherImage = images.find((_, index) => index !== current);

    return (
        <div className="relative w-full md:h-[590px] h-[700px] overflow-hidden rounded-lg">
            {/* Background Image */}
            <img
                src={images[current].image1}
                alt="carousel"
                className="w-full h-full object-cover transition duration-700 ease-in-out"
            />


            <img
                src={otherImage?.image1}
                alt="icon"
                className="absolute lg:w-[25%] lg:h-[40%] top-[35%] right-[20%] md:right-[5%] rounded-lg py-2 px-4 text-sm sm:text-base"
            />


            {/* ping */}

            <div className="absolute top-3 md:top-20 left-[70%] transform -translate-x-1/2 z-10 flex justify-center items-center">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping-slow" >
                        <div className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping-slow" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-white flex justify-center items-center shadow-md">
                        <SiYoutubemusic size={36} color="red" />
                    </div>
                </div>
            </div>
         {/* ************************** */}
            <div className="absolute inset-0 flex flex-col justify-start items-start bg-black/40 text-white px-6 md:px-16 pt-20 md:pt-40">
                <h2 className="text-2xl md:text-5xl font-bold mb-4 lg:w-[40%]  w-full ">
                    {images[current].heading}
                </h2>
                <p className="text-lg md:text-2xl">{images[current].paragraph}</p>
            </div>
            {/* form validation */}
            <Form />


            <button
                onClick={prevSlide}

                className="absolute bottom-4 left-[20%] md:left-[45%] transform  md:-translate-x-1/2 bg-black/50 text-gray-200 rounded-full py-2 px-4 text-sm sm:text-base text-center transition-all duration-300 ease-in-out"

            >
                ❮
            </button>
            <button
                onClick={nextSlide}

                className="absolute bottom-4 right-[30%] md:right-[45%] transform md:-translate-x-1/2 bg-black/50 text-gray-200 rounded-full py-2 px-4 text-sm sm:text-base text-center transition-all duration-300 ease-in-out"

            >
                ❯
            </button>
        </div >
    );
}
