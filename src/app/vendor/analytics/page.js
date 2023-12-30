import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const vendorAnalytics = () => {

  return (
    <div>
        <Link href="/vendor/home">
            <button className="flex flex-col items-center gap-y-1">
                <FontAwesomeIcon icon={faRecordVinyl}></FontAwesomeIcon>
                <span className="btm-nav-label text-nav-text-clr">Home</span>
            </button>
        </Link>

        <Link href="/vendor/home">
            <button className="flex flex-col items-center gap-y-1">
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                <span className="btm-nav-label text-nav-text-clr">Home</span>
            </button>
        </Link>

    </div>
  );
};

export default vendorAnalytics;
