"use client";

import { ReceiverForm } from "../ComponentExporter";

const CheckRole = () => {
  const currentRole = localStorage.getItem("userRole");

  return (
    <>
      {!currentRole ? (
        <>
          <h3
            className="text-xl font-semibold p-1"
            title="Change it in profile settings"
          >
            Please choose one of (Receiver or Supplier)
            <span className="font-black text-cyan-900 uppercase text-2xl">
              in SELECT ROLE Tab
            </span>
          </h3>
        </>
      ) : (
        <>
          <h3
            className="text-xl font-semibold p-1"
            title="Change it in profile settings"
          >
            You are currently a{" "}
            <span className="font-black text-cyan-900 uppercase text-2xl">
              {currentRole == "receiver" ? <>Receiver</> : <>Supplier</>}
            </span>
          </h3>
          {currentRole == "receiver" && (
            <div className="m-3 p-1 flex flex-col items-start w-full">
              <ReceiverForm />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CheckRole;
