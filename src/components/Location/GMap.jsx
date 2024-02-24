"use client";

import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import axios from "axios";

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

const NotSetMarker = () => {
  return (
    <>
      <div className="w-6 h-6 flex flex-col items-center justify-center bg-black rounded-full">
        <div className="w-3 h-3 bg-white text-black animate-bounce rounded-full transition-all shadow-md"></div>
      </div>
    </>
  );
};

const GMap = () => {
  const [usersData, setUserData] = useState([]);

  const getLocationData = async () => {
    try {
      const res = await axios.get(`/api/user/calc-users-for-map`);
      if (res.data.success) {
        setUserData((prev) => [...res.data.mapData]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 my-2 w-full p-2">
        <h3 className="font-black text-black underline">[*] Markers</h3>
        <div className="flex flex-row items-center gap-1">
          <HelpersMarker />
          <span className="mx-1 text-xs font-light text-black">Helpers</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <RequestersMarker />
          <span className="mx-1 text-xs font-light text-black">Requesters</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <NotSetMarker />
          <span className="mx-1 text-xs font-light text-black">Not Set</span>
        </div>
      </div>
      <div className="w-full min-h-screen p-2">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
          defaultCenter={center}
          defaultZoom={10}
          center={center}
          margin={[10, 10, 10, 10]}
          options={{}}
          onChange={(e) => {}}
          onChildClick={(child) => {}}
        >
          {/* Based on user role show the marker on the map */}
          {usersData.map((user_data, idx) => (
            <div className="" key={idx}>
              {user_data.userIs.toLowerCase() == "receiver" ? (
                <HelpersMarker
                  lat={user_data.location.lat}
                  lng={user_data.location.lng}
                />
              ) : user_data.userIs.toLowerCase() == "helper" ? (
                <RequestersMarker
                  lat={user_data.location.lat}
                  lng={user_data.location.lng}
                />
              ) : (
                <NotSetMarker
                  lat={user_data.location.lat}
                  lng={user_data.location.lng}
                />
              )}
            </div>
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default GMap;
