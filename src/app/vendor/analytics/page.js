import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faList } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const vendorAnalytics = () => {

  return (
    <div className=''>
      <Link href="/vendor/home">
        <button className="flex flex-row items-center">
          <span className="btm-nav-label text-nav-text-clr">Home</span>
          <FontAwesomeIcon icon={faList} />
        </button>
      </Link>

      <Link href="/vendor/home">
        <button className="flex flex-row items-center">
          <span className="btm-nav-label text-nav-text-clr">Home</span>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </Link>

    </div>
  );
};

export default vendorAnalytics;
