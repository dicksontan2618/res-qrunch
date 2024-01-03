"use client"

import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export default function BottomNavCustomer(){

    const clearDonation = () => {
        window.localStorage.removeItem("donation");
    }

    return (
        <div className="btm-nav bg-nav-bg-clr">
            <Link href="/customer/home">
                <button className="flex flex-col items-center gap-y-1" onClick={clearDonation}>
                    <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Home</span>
                </button>
            </Link>
            <Link href="/customer/shopping-cart">
                <button className="flex flex-col items-center gap-y-1" onClick={clearDonation}>
                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Cart</span>
                </button>
            </Link>
            <Link href="/customer/profile">
                <button className="flex flex-col items-center gap-y-1" onClick={clearDonation}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Profile</span>
                </button>
            </Link>
        </div>
    );
}