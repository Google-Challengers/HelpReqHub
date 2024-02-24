"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// icons
import { BiCurrentLocation } from "react-icons/bi";

const SetUpLocation = () => {
  const [locationData, setLocationData] = useState({
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const chooseCurrentLocation = () => {
    setLoading(true);

    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;
      setLocationData((prev) => ({ ...prev, lat: latitude, lng: longitude }));
    };

    const handleError = (err) => {
      console.error(err);
      alert("Unable to get the current location");
    };

    navigator.geolocation.getCurrentPosition(handlePosition, handleError);

    setLoading(false);
  };

  useEffect(() => {
    chooseCurrentLocation();
  }, []);

  const handleLocationSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`/api/user/update-profile/update-location`, {
        lat: locationData.lat,
        lng: locationData.lng,
      });
      if (res.data.success) {
        alert("Location updated successfully");
      } else {
        alert("Error while updating location");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start w-full my-2">
        <h1 className="font-black text-black text-3xl underline">
          Set Up Location
        </h1>
        <div className="flex flex-col items-start p-2 my-2">
          <div className="flex flex-col p-2 gap-1">
            <label className="text-black font-light text-xl">
              Latitude:{" "}
              <input
                type="number"
                name="lat"
                value={locationData.lat}
                onChange={handleLocationChange}
                placeholder="Latitude"
                required
                className="outline-none bg-transparent p-2 border-2 border-solid shadow-md border-yellow-500 rounded-lg placeholder:text-white"
              />
            </label>
            <label className="text-black font-light text-xl">
              Longitude:{" "}
              <input
                type="number"
                name="lng"
                value={locationData.lng}
                onChange={handleLocationChange}
                placeholder="Longitude"
                required
                className="outline-none bg-transparent p-2 border-2 border-solid shadow-md border-yellow-500 rounded-lg placeholder:text-white"
              />
            </label>
            <button
              type="button"
              disabled={loading}
              className="flex flex-row items-center w-fit justify-between gap-2 px-2 py-3 rounded-lg bg-yellow-500 disabled:cursor-not-allowed disabled:bg-yellow-400 text-white font-bold text-sm shadow-md"
              onClick={chooseCurrentLocation}
            >
              Use current location
              <BiCurrentLocation className="text-xl" />
            </button>
          </div>
          <button
            type="button"
            disabled={loading}
            className="px-5 py-2 shadow-md bg-black text-white disabled:bg-zinc-400 disabled:cursor-not-allowed rounded-full font-black text-xl"
            onClick={handleLocationSubmit}
          >
            {loading ? <>Setting ...</> : <>Set</>}
          </button>
        </div>
      </div>
    </>
  );
};

export default SetUpLocation;
