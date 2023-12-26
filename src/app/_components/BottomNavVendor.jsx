import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

export default function BottomNavVendor(){

    return (
        <div className="btm-nav bg-nav-bg-clr">
            <Link href="/vendor/home">
                <button className="flex flex-col items-center gap-y-1">
                    <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Home</span>
                </button>
            </Link>
            <Link href="/vendor/menu">
                <button className="flex flex-col items-center gap-y-1">
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Menu</span>
                </button>
            </Link>
            <Link href="/vendor/profile">
                <button className="flex flex-col items-center gap-y-1">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    <span className="btm-nav-label text-nav-text-clr">Profile</span>
                </button>
            </Link>
        </div>
    );
}
