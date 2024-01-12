import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export default function BottomNavCharity(){

    return (
        <div className="btm-nav bg-nav-bg-clr">
            <Link href="/charity/home">
                <button className="flex flex-col items-center gap-y-1">
                    <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Home</span>
                </button>
            </Link>
            <Link href="/charity/claimed">
                <button className="flex flex-col items-center gap-y-1">
                    <FontAwesomeIcon icon={faBasketShopping}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Claimed Food</span>
                </button>
            </Link>
            <Link href="/charity/profile">
                <button className="flex flex-col items-center gap-y-1">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Profile</span>
                </button>
            </Link>
        </div>
    );
}
