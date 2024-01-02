import React from 'react'
import { MarkerF } from '@react-google-maps/api';

function Markers({business}) {
  return (
    <div>
      <MarkerF
        position={business.geometry.location}
        icon={{
          url: "/shop-pin.webp",
          scaledSize: {
            width: 100,
            height: 60,
          },
        }}
      />
    </div>
  );
}

export default Markers