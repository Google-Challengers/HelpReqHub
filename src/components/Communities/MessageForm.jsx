"use client";

import { useState } from "react";

const MessageForm = () => {
  const [formData, setFormData] = useState({ msg: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
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
          className="px-2 py-3 rounded-md bg-rose-600 text-white uppercase font-black"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default MessageForm;
