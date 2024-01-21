"use client";

import { CheckRole, UserCard } from "@/components/ComponentExporter";

const GlobalRequests = () => {
  return (
    <>
      <section className="w-full lg:h-screen min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-r from-gray-200 via-zinc-400 to-slate-500 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <h1 className="font-black text-gray-900 text-5xl md:7xl lg:text-9xl p-3 m-2 flex flex-col items-start w-full">
            Global Requests
            <span className="text-xs md:text-sm font-thin text-gray-700 mx-1">
              make requests / help others
            </span>
          </h1>
        </div>
        <CheckRole />
        <div className="mt-3 p-1 w-full flex flex-col items-start">
          <div className="flex flex-col w-full items-start">
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-black bg-gray-400 px-3 py-1 rounded-full">
              All Requests
              <span className="text-xl text-blue-600 font-extrabold">{`(`}</span>
              <span className="font-pacifico text-slate-700 text-sm mx-1">
                Based on your Location
              </span>
              <span className="text-xl text-blue-600 font-extrabold">{`)`}</span>
            </h4>
            <UserCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default GlobalRequests;
