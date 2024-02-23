"use client";

import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";

const SearchLocationBox = () => {
  const [place, setPlace] = useState("");

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleSearch = async () => {
    console.log(place);
  };

  const handleOnLoad = (autocomplete) => {
    console.log({ autocomplete });
  };

  const handleOnPlaceChange = (place) => {
    console.log({ place });
  };

  return (
    <>
      <div className="bg-pink-400 flex flex-row items-center w-full max-w-2xl my-5">
        <Autocomplete
          onLoad={handleOnLoad}
          onPlaceChanged={handleOnPlaceChange}
          options={{}}
          className="w-full"
        >
          <input
            type="search"
            name="locationsearch"
            id="locationsearch"
            value={place}
            onChange={handlePlaceChange}
            placeholder="Search ..."
            className="outline-none px-3 py-3 w-full bg-white text-xl text-black font-black"
            required
          />
        </Autocomplete>
        <FaLocationArrow
          className="text-4xl font-black text-black m-1 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchLocationBox;
