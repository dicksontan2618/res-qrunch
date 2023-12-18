"use client";

import Image from 'next/image'
import Link from 'next/link';

const StartScreen = () => {
    return(
        <div className='bg-main-clr h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center gap-y-8'>
                {/* TODO: Insert Logo Image here  */}
                <p className='text-4xl font-semibold text-white'>ResQrunch</p>
                <div className=''>
                    <Link href="./home">
                        <button className='btn btn-wide bg-white text-main-clr text-md border-white'>
                            Get Started!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;