"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const BecomeMember = ({ comName, updateState }) => {
  const [loading, setLoading] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  const checkAlreadyRequested = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/user/request/community/logs/member/already-requested`,
        {
          communityName: comName,
        }
      );
      if (res.data.success) {
        setAlreadyRequested(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAlreadyRequested();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/user/request/community/logs/member/become-member`,
        {
          communityName: comName,
        }
      );
      if (res.data.success) {
        updateState((prev) => !prev);
        await checkAlreadyRequested();
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={loading || alreadyRequested}
        className="text-blue-700 text-lg font-black bg-white disabled:cursor-wait border-2 border-solid border-blue-600 px-1 py-2 hover:text-white hover:bg-blue-700 transition-all duration-100 ease-linear"
        onClick={handleClick}
      >
        {loading ? (
          <>Processing...</>
        ) : !alreadyRequested ? (
          <>Become a member</>
        ) : (
          <>Already Requested</>
        )}
      </button>
    </>
  );
};

export default BecomeMember;
