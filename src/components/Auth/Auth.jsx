"use client";

import { useState } from "react";

const Auth = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    contact: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("password and confirm password do not match");
      setLoading(false);
      return;
    }

    console.log(formData); // make request to server
    setLoading(false);
  };

  return (
    <>
      <form
        className="flex flex-col items-start justify-between w-full max-w-md gap-5 p-3 bg-white m-2 md:shadow-md border-2 border-solid border-transparent md:border-orange-400 rounded-lg"
        onSubmit={handleSumbit}
      >
        <div className="flex flex-col w-full">
          <label
            htmlFor="userName"
            className="text-base font-thin text-black capitalize"
          >
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Karan Yadav"
            autoComplete="off"
            value={formData?.userName}
            onChange={handleChange}
            className="border-2 text-black border-solid border-orange-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
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
            placeholder="abc@gmail.com"
            autoComplete="off"
            value={formData?.email}
            onChange={handleChange}
            className="border-2 text-black border-solid border-orange-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="contact"
            className="text-base font-thin text-black capitalize"
          >
            Contact Number
          </label>
          <input
            type="tel"
            name="contact"
            id="contact"
            placeholder="1029384756"
            autoComplete="off"
            value={formData?.contact}
            onChange={handleChange}
            className="border-2 text-black border-solid border-orange-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="password"
            className="text-base font-thin text-black capitalize"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="########"
            autoComplete="off"
            value={formData?.password}
            onChange={handleChange}
            className="border-2 text-black border-solid border-orange-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="confirmPassword"
            className="text-base font-thin text-black capitalize"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="########"
            autoComplete="off"
            value={formData?.confirmPassword}
            onChange={handleChange}
            className="border-2 text-black border-solid border-orange-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="capitalize px-3 py-4 bg-rose-600 hover:bg-rose-500 font-semibold text-white rounded-md disabled:cursor-wait w-full"
        >
          {loading ? <>Processing...</> : <>Login</>}
        </button>
      </form>
    </>
  );
};

export default Auth;
