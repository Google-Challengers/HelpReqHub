"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Loading, NotFound } from "../ComponentExporter";
import { getLocaleTime } from "../ConvertTime";

const HelpWantedCard = ({ comName, states = [] }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRequests = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/request/community/logs/get-logs/requests`,
        { communityName: comName }
      );
      if (res.data.success) {
        setRequests((prev) => res.data.helpWanted);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, [...states]);

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
        requests.map((request, i) => (
          <div
            key={i}
            className="bg-white w-full p-2 rounded-md flex flex-col items-start m-1"
          >
            <div className="flex flex-col sm:flex-row items-start w-full justify-between">
              <div className="flex flex-row items-center">
                <img
                  src={request.image}
                  alt="/"
                  className="w-11 h-11 rounded-full border-2 border-solid border-white"
                />
                <div className="flex flex-col items-start mx-1">
                  <h1 className="font-black text-black text-base">
                    {request.name}
                  </h1>
                  <h2 className="text-slate-700 font-light text-sm">
                    {request.email}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col items-start m-1">
                <span className="m-1 text-black font-normal text-xs">
                  U-ID: {request.userId}
                </span>
                <span className="m-1 text-black font-normal text-xs">
                  Requested at: {getLocaleTime(request.createdAt)}
                </span>
              </div>
            </div>
            <h4 className="text-black m-1">
              <span className="text-slate-700 mr-1 font-normal p-1 rounded-lg bg-yellow-500">
                Title:
              </span>
              <span>{request.title}</span>
            </h4>
            <p className="text-black m-1">
              <span className="text-slate-700 mr-1 font-normal p-1 rounded-lg bg-yellow-500">
                Description:
              </span>
              <span className="font-medium text-base">{request.desc}</span>
            </p>
            <p className="text-black m-1 bg-green-700 p-1 rounded-md">
              <span className="text-black mr-1 font-normal">Time:</span>
              <span className="font-medium text-base text-white">
                By {request.time}
              </span>
            </p>
            <h4 className="text-black m-1">
              <span className="text-slate-700 mr-1 font-normal p-1 rounded-lg bg-yellow-500">
                Images
              </span>
            </h4>
            <img
              src={request.help_image}
              className="w-full h-60 aspect-video bg-black p-1 border-2 my-1 rounded-lg overflow-hidden"
            ></img>
          </div>
        ))
      )}
    </>
  );
};

export default HelpWantedCard;
