"use client"

import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';

const StartScreen = () => {

    useEffect(() => {
      window.localStorage.setItem(
          "initShoppingCart", "false");
    }, []);

    return(
        <div className='bg-main-clr h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center gap-y-8'>
                {/* TODO: Insert Logo Image here  */}
                <p className='text-4xl font-semibold text-white'>ResQrunch</p>
                <div className='flex flex-col justify-center gap-y-4'>
                    <Link href="./customer/sign-in">
                        <button className='btn btn-wide bg-white text-main-clr text-md border-white'>
                            Customer Login
                        </button>
                    </Link>
                    <Link href="./vendor/sign-in">
                        <button className='btn btn-wide bg-white text-main-clr text-md border-white'>
                            Vendor Login
                        </button>
                    </Link>
                    <Link href="./charity/sign-in">
                        <button className='btn btn-wide bg-white text-main-clr text-md border-white'>
                            Charity Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;