"use client";

import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";

const SearchLocationBox = () => {
  const [place, setPlace] = useState("");

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleSearch = async () => {
    console.log(place);
  };

  return (
    <>
      <div className="bg-pink-400 flex flex-row items-center w-full max-w-2xl my-5">
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
        <FaLocationArrow
          className="text-4xl font-black text-black m-1 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchLocationBox;
