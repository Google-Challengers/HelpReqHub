"use client";

import { useRef, useState } from "react";
import { FaPenNib } from "react-icons/fa";

const NewCommunityForm = () => {
  const [showForm, setShowForm] = useState(false);

  const tagRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewTag = () => {
    if (tagRef.current.value) {
      const value = tagRef.current.value;
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, value],
      }));
      tagRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // make request to the server
    setShowForm((prev) => !prev);
  };

  return (
    <>
      {!showForm ? (
        <>
          <div
            className="flex flex-row items-center bg-fuchsia-500 gap-2 m-1 p-2 rounded-md cursor-pointer text-white"
            onClick={() => {
              setShowForm((prev) => !prev);
            }}
          >
            <FaPenNib className="text-3xl" />
            <span className="text-xl font-black text-white">
              Create your own
            </span>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full p-2"
        >
          <div className="flex flex-col items-start w-full p-1">
            <label
              htmlFor="name"
              className="my-1 text-sm text-black capitalize font-light"
            >
              Community Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={`Community Name`}
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
              placeholder="Provide some description about the organization."
              required
              className="outline-none max-w-md max-h-96 text-white font-medium text-base px-3 py-2 mx-2 w-full mb-3 mt-1 bg-slate-800"
            ></textarea>
          </div>
          <div className="flex flex-col items-start w-full p-1">
            <label
              htmlFor="tags"
              className="my-1 text-sm text-black capitalize font-light"
            >
              Tags *
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Type and press Add button"
              ref={tagRef}
              className="outline-none max-w-md text-white font-medium text-base px-3 py-2 mx-2 w-full mb-3 mt-1 bg-slate-800"
            />
            <button
              type="button"
              className="bg-green-600 text-white font-black text-xl px-2 rounded-md mx-2"
              onClick={addNewTag}
            >
              + Add
            </button>
            <div className="w-full flex flex-row flex-wrap">
              {formData.tags.map((tag, index) => (
                <>
                  <span
                    key={index}
                    className="bg-zinc-800 text-white font-black text-sm m-1 p-1 rounded-md"
                  >
                    {tag}
                  </span>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start w-full p-1">
            <button
              type="submit"
              className="flex flex-row items-center bg-fuchsia-500 gap-2 m-1 p-2 rounded-md cursor-pointer text-white"
            >
              <FaPenNib className="text-3xl" />
              <span className="text-xl font-black text-white">Create</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default NewCommunityForm;
