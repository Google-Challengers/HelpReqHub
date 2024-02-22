"use client";

import GoogleMapReact from "google-map-react";

const center = {
  lat: 30.7333,
  lng: 76.7794,
};

const Marker = ({ text }) => <div className="text-red-600">{text}</div>;

const GMap = () => {
  return (
    <>
      <div className="w-full min-h-screen p-2">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
          defaultCenter={center}
          defaultZoom={15}
        >
          <Marker lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default GMap;
