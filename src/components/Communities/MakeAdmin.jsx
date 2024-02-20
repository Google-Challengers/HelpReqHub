"use client";

import React, { useState } from "react";
import axios from "axios";

const MakeAdmin = ({ communityName, toggleCurrentMembers }) => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleAddNewAdmin = async () => {
    if (!userInput || !communityName) return;

    setLoading(true);
    try {
      const res = await axios.post(`/api/user/request/community/make-admin`, {
        newAdminId: userInput,
        communityName,
      });
      if (res.data.success) {
        toggleCurrentMembers((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-1 my-2 flex flex-col items-start w-full">
        <h1 className="text-black font-black my-2">[*] Create new Admins</h1>
        <input
          type="text"
          name="user-id"
          id="user-id"
          placeholder="Enter U-ID"
          required
          value={userInput}
          onChange={handleInputChange}
          className="outline-none bg-white border-4 border-solid focus:border-yellow-500 p-3 text-black rounded-md my-1"
        />
        {userInput.length > 0 && (
          <button
            type="button"
            onClick={handleAddNewAdmin}
            disabled={loading}
            className="font-black disabled:bg-yellow-400 text-black bg-yellow-600 px-3 py-4 my-1 rounded-lg"
          >
            {loading ? <>Making...</> : <>Make Admin</>}
          </button>
        )}
      </div>
    </>
  );
};

export default MakeAdmin;
