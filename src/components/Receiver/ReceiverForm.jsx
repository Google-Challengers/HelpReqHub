"use client";

import { useState } from "react";
import { FaPenNib } from "react-icons/fa";
import axios from "axios";

const ReceiverForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`/api/user/request/global/add`, {
        title: formData.title,
        desc: formData.desc,
        time: formData.time,
      });
      if (res.data.success) {
      } else {
        alert("Error adding request");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    setShowForm((prev) => !prev);
  };

  return (
    <>
      {!showForm ? (
        <>
          <div
            className="flex flex-row items-center bg-blue-500 gap-2 m-1 p-2 rounded-md cursor-pointer text-white"
            onClick={() => {
              setShowForm((prev) => !prev);
            }}
          >
            <FaPenNib className="text-3xl" />
            <span className="text-xl font-black text-white">Request</span>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full p-2"
        >
          <div className="flex flex-col items-start w-full p-1">
            <label
              htmlFor="title"
              className="my-1 text-sm text-black capitalize font-light"
            >
              Title *
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={`"Food", "E-Waste", etc...`}
              required
              className="outline-none max-w-md text-white font-medium text-base px-3 py-2 mx-2 w-full mb-3 mt-1 bg-slate-800"
            />
          </div>
          <div className="flex flex-col items-start w-full p-1">
            <label
              htmlFor="desc"
              className="my-1 text-sm text-black capitalize font-light"
            >
              Description *
            </label>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="5"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Provide some description about what you need and other details regarding it."
              required
              className="outline-none max-w-md max-h-96 text-white font-medium text-base px-3 py-2 mx-2 w-full mb-3 mt-1 bg-slate-800"
            ></textarea>
          </div>
          <div className="flex flex-col items-start w-full p-1">
            <label
              htmlFor="time"
              className="my-1 text-sm text-black capitalize font-light"
            >
              Time *
            </label>
            <input
              type="text"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Everytime, Weekends, DD-MM-YYYY"
              required
              className="outline-none max-w-md text-white font-medium text-base px-3 py-2 mx-2 w-full mb-3 mt-1 bg-slate-800"
            />
          </div>
          <div className="flex flex-col items-start w-full p-1">
            <button
              type="submit"
              disabled={loading}
              className="flex flex-row items-center bg-blue-500 disabled:cursor-wait disabled:bg-blue-300 gap-2 m-1 p-2 rounded-md cursor-pointer text-white"
            >
              <FaPenNib className="text-3xl" />
              <span className="text-xl font-black text-white">Request</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ReceiverForm;
