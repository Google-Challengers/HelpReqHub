import { FaLocationArrow } from "react-icons/fa";

const SearchLocationBox = () => {
  return (
    <>
      <div className="bg-pink-400 flex flex-row items-center w-full max-w-2xl my-5">
        <input
          type="search"
          name="locationsearch"
          id="locationsearch"
          placeholder="Search ..."
          className="outline-none px-3 py-3 w-full bg-white text-xl text-black font-black"
          required
        />
        <FaLocationArrow className="text-4xl font-black text-black m-1 cursor-pointer" />
      </div>
    </>
  );
};

export default SearchLocationBox;
