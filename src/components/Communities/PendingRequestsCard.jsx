"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, NotFound } from "../ComponentExporter";

const PendingRequestsCard = ({ comName, updateState }) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/request/community/logs/get-logs/members/pending-requests`,
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
  }, []);

  const handlePendingRequests = async (id, measure) => {
    if (confirm("Are you sure you want to " + measure + " ?")) {
      setLoading(false);
      try {
        const res = await axios.post(
          `/api/user/request/community/logs/member/accept-reject-member`,
          {
            communityName: comName,
            new_memberId: id,
            measure,
          }
        );
        if (res.data.success) {
          updateState((prev) => !prev);
          await getMembers();
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
          <Loading msg={"Fetching Members"} />
        </>
      ) : members.length === 0 ? (
        <>
          <NotFound msg={"[ALL DONE] No Pending Request"} />
        </>
      ) : (
        members.map((member, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex flex-col items-start bg-white rounded-lg p-2 m-1">
              <img
                src={member.image}
                alt="/"
                className="w-11 h-11 rounded-full border-2 border-solid border-white"
              />
              <span className="text-black font-normal text-xs m-1">
                U_ID: {member.id}
              </span>
              <div className="flex flex-col items-start mx-1">
                <h4 className="flex flex-row items-center">
                  <span className="text-zinc-800 font-light text-sm">
                    Name:
                  </span>
                  <span className="text-blue-700 mx-1 font-bold">
                    {member.name}
                  </span>
                </h4>
                <h5 className="flex flex-row items-center">
                  <span className="text-zinc-800 font-light text-sm">
                    Email:
                  </span>
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
              <div className="flex flex-row">
                <button
                  type="button"
                  className="p-2 rounded-lg bg-green-500 disabled:cursor-wait disabled:bg-green-300 text-white font-semibold text-base mx-1"
                  onClick={() => {
                    handlePendingRequests(member.id, "accept");
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg bg-red-500 disabled:cursor-wait disabled:bg-red-300 text-white font-semibold text-base mx-1"
                  onClick={() => {
                    handlePendingRequests(member.id, "reject");
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default PendingRequestsCard;
