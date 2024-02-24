"use client";

import { CiBoxes, CiBag1 } from "react-icons/ci";

const SelectRoleBtns = () => {
  const setRole = (role) => {
    localStorage.setItem("userRole", role);
    alert("Role set to " + role);
  };

  return (
    <>
      <div
        className="cursor-pointer bg-black text-white p-3 m-2 flex flex-col items-center justify-between rounded-md hover:bg-gray-700 w-full sm:w-1/2 min-w-fit"
        onClick={() => {
          setRole("receiver");
        }}
      >
        <CiBag1 className="text-9xl font-black" />
        <span className="text-5xl font-bold m-2">Requester</span>
      </div>
      <div
        className="cursor-pointer bg-black text-white p-3 m-2 flex flex-col items-center justify-between rounded-md hover:bg-gray-700 w-full sm:w-1/2 min-w-fit"
        onClick={() => {
          setRole("supplier");
        }}
      >
        <CiBoxes className="text-9xl font-black" />
        <span className="text-5xl font-bold m-2">Helper</span>
      </div>
    </>
  );
};

export default SelectRoleBtns;
