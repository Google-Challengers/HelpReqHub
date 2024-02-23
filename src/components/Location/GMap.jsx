"use client";

import GoogleMapReact from "google-map-react";

const center = {
  lat: 30.7333,
  lng: 76.7794,
};

const HelpersMarker = () => {
  return (
    <>
      <div className="w-6 h-6 flex flex-col items-center justify-center bg-blue-700 rounded-full">
        <div className="w-3 h-3 bg-white text-black animate-pulse rounded-full transition-all shadow-md"></div>
      </div>
    </>
  );
};

const RequestersMarker = () => {
  return (
    <>
      <div className="w-6 h-6 flex flex-col items-center justify-center bg-red-700 rounded-full">
        <div className="w-3 h-3 bg-white text-black animate-ping rounded-full transition-all shadow-md"></div>
      </div>
    </>
  );
};

const GMap = () => {
  const userRole = "receiver";

  return (
    <>
      <div className="flex flex-col gap-2 my-2 w-full p-2">
        <h3 className="font-black text-black underline">[*] Markers</h3>
        <div className="flex flex-row items-center gap-1">
          <HelpersMarker />
          <span className="mx-1 text-xs font-light text-black">Helpers</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <RequestersMarker />
          <span className="mx-1 text-xs font-light text-black">Requesters</span>
        </div>
      </div>
      <div className="w-full min-h-screen p-2">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
          defaultCenter={center}
          defaultZoom={15}
          center={center}
          margin={[10, 10, 10, 10]}
          options={{}}
          onChange={(e) => {}}
          onChildClick={(child) => {}}
        >
          {/* Based on user role show the marker on the map */}
          {userRole.toLowerCase() == "receiver" ? (
            <HelpersMarker lat={center.lat} lng={center.lng} />
          ) : (
            <RequestersMarker lat={center.lat} lng={center.lng} />
          )}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default GMap;
