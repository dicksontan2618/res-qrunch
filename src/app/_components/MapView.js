import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useState } from 'react'

import Markers from './Markers';

function MapView({mapList,num}) {

    const [map,setMap] = useState();

    const containerStyle = {
        width:"100vw",
        height:"90vh"
    }

    const coordinate = JSON.parse(window.localStorage.getItem("curLoc"));
    return (
      <div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinate}
            zoom={15}
            onLoad={(map) => setMap(map)}
          >
            <MarkerF
              position={coordinate}
              icon={{
                url: "/user-location.webp",
                scaledSize: {
                  width: 50,
                  height: 50,
                },
              }}
            />
            {
              mapList.map(
                (item, index) =>
                  index <= num && (
                    <Markers business={item} key={index}/>
                  )
              )}
          </GoogleMap>
        </LoadScript>
      </div>
    );
}

export default MapView