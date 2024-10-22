import React from 'react';
import Image from "next/image";

const Loading = () => {
    return (
        <div className='fixed top-0 z-[9999] left-0 w-full h-screen bg-gradient-to-b from-[rgb(255,246,223)] to-[#fff] flex items-center justify-center '>
            <div>
                <Image
                    src='/images/logo/logo_lg.png'
                    alt='Logo'
                    width={400}
                    height={10}
                    className='block animate-bounce mx-auto h-[70px] sm:h-[100px] mb-[50px]'
                />
            </div>
        </div>
    );
};

export default Loading;
