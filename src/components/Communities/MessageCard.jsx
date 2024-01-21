"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Loading, NotFound } from "../ComponentExporter";
import { getLocaleTime } from "../ConvertTime";

const MessageCard = ({ comName, states = [] }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/request/community/logs/get-logs/messages`,
        { communityName: comName }
      );
      if (res.data.success) {
        setMessages((prev) => [...res.data.logsMessages]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [...states]);

  return (
    <>
      {loading ? (
        <>
          <Loading msg={"Fetching Messages"} />
        </>
      ) : messages.length === 0 ? (
        <>
          <NotFound msg={"[!] No messages"} />
        </>
      ) : (
        messages.map((msg, i) => (
          <div
            key={i}
            className="p-2 bg-white rounded-lg flex flex-col items-start w-fit m-1"
          >
            <span className="text-blue-800 font-black mx-1">
              {getLocaleTime(msg.time)}.
            </span>
            <p className="text-black font-light text-sm">{msg.msg}</p>
          </div>
        ))
      )}
    </>
  );
};

export default MessageCard;
