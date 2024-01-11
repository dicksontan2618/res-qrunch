import React from "react";
import { MarkerF } from "@react-google-maps/api";

function Markers({ business }) {
  return (
    <div>
      <MarkerF
        position={business.geometry.location}
        icon={{
          url: "/charity-pin.webp",
          scaledSize: {
            width: 50,
            height: 30,
          },
        }}
      />
    </div>
  );
}

export default Markers;
