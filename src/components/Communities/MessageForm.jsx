"use client";

import { useState } from "react";
import axios from "axios";

const MessageForm = ({ comName, updateState }) => {
  const [formData, setFormData] = useState({ msg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.msg) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/request/community/logs/new-message`,
        {
          communityName: comName,
          message: formData.msg,
        }
      );
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, msg: "" }));
        updateState((prev) => !prev);
      } else {
        alert("Error in messaging");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="w-full p-1 flex flex-row" onSubmit={handleSubmit}>
        <input
          type="text"
          name="msg"
          id="msg"
          value={formData.msg}
          onChange={handleChange}
          placeholder="Message..."
          required={true}
          className="outline-none bg-white px-2 mx-1 w-full rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-2 py-3 rounded-md bg-rose-600 disabled:bg-rose-300 disabled:cursor-wait text-white uppercase font-black"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default MessageForm;
