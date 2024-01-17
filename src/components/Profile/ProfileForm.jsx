"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/get-user-profile-data`);
      const data = res.data;
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          name: data.userData.name,
          email: data.userData.email,
          contact: data.userData.contact,
          image: data.userData.image,
        }));
      } else {
        alert("Error getting user profile data");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.name === session?.user?.name && !formData.password) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/user/update-profile", {
        name: formData.name,
        password: formData.password,
      });
      const data = res.data;
      if (data?.success) {
        await signIn("user_credentials", {
          redirect: false,
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          password: formData.password,
        });
        await fetchUserData();
        setFormData((prev) => ({ ...prev, password: "" }));
        alert("Profile updated successfully");
        router.replace(`/Dashboard/${formData.name}/Profile`);
      } else {
        alert("Error updating profile");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mb-4">
        <div className="flex flex-col w-full">
          <img
            src={formData.image}
            alt="profile image"
            width={150}
            height={150}
            className="w-32 h-32 rounded-full m-1 p-1 border-2 border-solid border-white"
          />
          <label
            htmlFor="name"
            className="text-base font-thin text-black capitalize"
          >
            name
          </label>
          <input
            disabled={loading}
            type="text"
            name="name"
            id="name"
            placeholder="Karan Yadav"
            autoComplete="off"
            value={formData?.name}
            onChange={handleChange}
            className="border-2 disabled:cursor-not-allowed text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
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
            disabled={true}
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            autoComplete="off"
            value={formData?.email}
            onChange={handleChange}
            className="border-2 disabled:cursor-not-allowed text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
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
            disabled={true}
            type="tel"
            name="contact"
            id="contact"
            placeholder="1029384756"
            autoComplete="off"
            value={formData?.contact}
            onChange={handleChange}
            className="border-2 disabled:cursor-not-allowed text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
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
            disabled={loading}
            type="password"
            name="password"
            id="password"
            placeholder="########"
            autoComplete="off"
            value={formData?.password}
            onChange={handleChange}
            className="border-2 disabled:cursor-not-allowed text-black border-solid border-fuchsia-400 outline-none px-3 py-4 m-2 rounded-md shadow-md"
          />
        </div>
        <button
          type="submit"
          disabled={
            loading ||
            (formData.name === session?.user?.name && !formData.password)
          }
          className="self-start mx-4 capitalize px-3 py-4 bg-blue-600 hover:bg-blue-500 font-semibold text-white rounded-md disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {loading ? <>Processing...</> : <>Update Profile</>}
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
