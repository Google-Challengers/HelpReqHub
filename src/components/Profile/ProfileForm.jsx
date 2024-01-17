"use client";

import { useState } from "react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "Karan Yadav",
    email: "ky@gmail.com",
    contact: "1029384765",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mb-4">
        <div className="flex flex-col w-full">
          <label
            htmlFor="name"
            className="text-base font-thin text-black capitalize"
          >
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Karan Yadav"
            autoComplete="off"
            value={formData?.name}
            onChange={handleChange}
            className="border-2 text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="email"
            className="text-base font-thin text-black capitalize"
          >
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            autoComplete="off"
            value={formData?.email}
            onChange={handleChange}
            className="border-2 text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="contact"
            className="text-base font-thin text-black capitalize"
          >
            contact number
          </label>
          <input
            type="tel"
            name="contact"
            id="contact"
            placeholder="1029384756"
            autoComplete="off"
            value={formData?.contact}
            onChange={handleChange}
            className="border-2 text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="password"
            className="text-base font-thin text-black capitalize"
          >
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="########"
            autoComplete="off"
            value={formData?.password}
            onChange={handleChange}
            className="border-2 text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="self-start mx-4 capitalize px-3 py-4 bg-blue-600 hover:bg-blue-500 font-semibold text-white rounded-md disabled:cursor-wait"
        >
          {loading ? <>Processing...</> : <>Update Profile</>}
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
