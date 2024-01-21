"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Loading, NotFound } from "../ComponentExporter";
import { getLocaleTime } from "../ConvertTime";

const UserCard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [showDetailsWindow, setShowDetailsWindow] = useState(false);

  const currentRole = localStorage.getItem("userRole");

  const getUsersRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/request/global/get-all`);
      if (res.data.success) {
        setRequests((prev) => res.data.request_data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersRequests();
  }, []);

  const getDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/user/request/global/get-details`, {
        reqId: id,
      });
      if (res.data.success) {
        setDetails((prev) => res.data.requestDetails);
        setShowDetailsWindow(true);
        await getUsersRequests();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const joinToHelp = async (id) => {
    if (confirm("Are you sure you want to join")) {
      setLoading(true);

      try {
        const res = await axios.post(`/api/user/request/global/join-to-help`, {
          reqId: id,
        });
        if (res.data.success) {
          await getDetails(id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loading msg={"Fetching Requests"} />
        </>
      ) : requests.length === 0 ? (
        <>
          <NotFound msg={"[!] No one asked for help"} />
        </>
      ) : (
        <>
          <div className="w-full mt-4 flex flex-row items-center overflow-x-auto">
            {requests.map((request, index) => (
              <div
                key={index}
                className="min-w-[298px] flex flex-col items-center border rounded-lg shadow bg-gray-800 border-gray-700 m-2"
              >
                <img
                  className="rounded-t-lg w-full max-w-xs h-auto md:max-w-xs border-b-2 border-solid border-gray-700 shadow-sm shadow-gray-600"
                  src={"/default-help.webp"}
                  width={250}
                  height={250}
                  alt="Waste Card"
                />
                <div className="p-5 w-full flex flex-col items-start">
                  <div className="text-white flex flex-row items-start gap-1">
                    <img
                      src={request.image}
                      alt="/"
                      className="w-11 h-11 m-1 rounded-full border-2 border-solid border-white"
                    />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white uppercase">
                      {request.title}
                    </h5>
                  </div>
                  <p className="mb-3 font-normal text-gray-400 flex flex-col">
                    <span>Name: {request.name}</span>
                    <span>Time: {request.time}</span>
                    <span>
                      Status:{" "}
                      {request.status == "pending" ? (
                        <span className="capitalize text-red-600 font-black">
                          Pending
                        </span>
                      ) : (
                        <span className="capitalize text-green-600 font-black">
                          Completed
                        </span>
                      )}
                    </span>
                  </p>
                  {currentRole == "supplier" && (
                    <button
                      disabled={loading}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-wait focus:ring-blue-800"
                      onClick={() => {
                        getDetails(request.reqId);
                      }}
                    >
                      See details
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {showDetailsWindow && (
            <>
              <hr className="h-1 bg-zinc-700 w-full m-1" />
              <div className="w-full flex flex-col items-start p-1 my-2">
                <h1 className="font-black text-3xl text-black">Details</h1>
                <div className="flex flex-row items-start m-1">
                  <span className="text-black bg-yellow-500 mx-1 p-1 rounded-md">
                    Created At:
                  </span>
                  <span className="text-black font-normal text-base">
                    {getLocaleTime(details.createdAt)}
                  </span>
                </div>
                <div className="flex flex-row items-start m-1">
                  <span className="text-black bg-yellow-500 mx-1 p-1 rounded-md">
                    Title:
                  </span>
                  <span className="text-black font-medium text-base capitalize">
                    {details.title}
                  </span>
                </div>
                <div className="flex flex-row items-start m-1">
                  <span className="text-black bg-yellow-500 mx-1 p-1 rounded-md">
                    Description:
                  </span>
                  <span className="text-black font-medium text-base">
                    {details.desc}
                  </span>
                </div>
                <div className="flex flex-row items-start m-1">
                  <span className="text-black bg-yellow-500 mx-1 p-1 rounded-md">
                    Time:
                  </span>
                  <span className="text-black font-medium text-base">
                    {details.time}
                  </span>
                </div>
                <div className="flex flex-row items-start m-1">
                  {details.requestHandlers.length == 0 ? (
                    <>
                      <span className="text-black font-bold m-1 p-1 rounded-lg bg-red-600">
                        No one helped him yet
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col items-start w-full">
                      <span className="text-black font-bold m-1">
                        Who help(ed) him/her?
                      </span>
                      {details.requestHandlers.map((handler, index) => (
                        <span
                          key={index}
                          className="text-black font-medium text-base hover:text-blue-600 cursor-pointer m-1"
                        >
                          {handler}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-start m-1">
                  <button
                    type="button"
                    className="bg-green-600 text-white font-black p-2 rounded-lg"
                    onClick={() => {
                      joinToHelp(details._id);
                    }}
                  >
                    Want to help
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserCard;
