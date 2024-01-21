"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, NotFound } from "../ComponentExporter";

const MemberCard = ({ comName, states = [] }) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/request/community/logs/get-logs/members`,
        { communityName: comName }
      );
      if (res.data.success) {
        setMembers((prev) => [...res.data.logsMembers]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMembers();
  }, [...states]);

  return (
    <>
      {loading ? (
        <>
          <Loading msg={"Fetching Members"} />
        </>
      ) : members.length === 0 ? (
        <>
          <NotFound msg={"[!] No members found"} />
        </>
      ) : (
        members.map((member, i) => (
          <div
            key={i}
            className="flex flex-col items-start bg-white rounded-lg p-2 m-1"
          >
            <img
              src={member.image}
              alt="/"
              className="w-11 h-11 rounded-full border-2 border-solid border-white"
            />
            <span className="text-black text-xs m-1 font-normal">
              U-ID: {member.id}
            </span>
            <div className="flex flex-col items-start mx-1">
              <h4 className="flex flex-row items-center">
                <span className="text-zinc-800 font-light text-sm">Name:</span>
                <span className="text-blue-700 mx-1 font-bold">
                  {member.name}
                </span>
              </h4>
              <h5 className="flex flex-row items-center">
                <span className="text-zinc-800 font-light text-sm">Email:</span>
                <span className="text-blue-700 mx-1 font-bold">
                  {member.email}
                </span>
              </h5>
              <h6 className="flex flex-row items-center">
                <span className="text-zinc-800 font-light text-sm">
                  Contact:
                </span>
                <span className="text-blue-700 mx-1 font-bold">
                  {member.contact}
                </span>
              </h6>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default MemberCard;
