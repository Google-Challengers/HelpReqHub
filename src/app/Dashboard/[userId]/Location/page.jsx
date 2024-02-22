import { GMap, SearchLocation } from "@/components/ComponentExporter";

const Location = () => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-blue-200 via-sky-300 to-cyan-500 flex flex-col items-center">
        <h1 className="font-black text-blue-900 text-6xl md:7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
          Location
          <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
            We will use your location to show result near you.
          </span>
        </h1>
        <div className="m-3 w-full flex flex-col">
          <h3 className="text-gray-800 text-base font-semibold mx-2">
            Enter your location <span className="text-orange-600">or</span> give
            access to the <span className="text-red-600">GPS</span>
          </h3>
          <div className="p-3">
            <SearchLocation />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <GMap />
        </div>
      </section>
    </>
  );
};

export default Location;
