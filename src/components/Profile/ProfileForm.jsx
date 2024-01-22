"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUpload } from "react-icons/fa";
import { uploadUserProfileImagesToFirebaseStorage } from "@/lib/_firebase/_firebase_storage.js";

const ProfileForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const imageRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const chooseNewImage = () => {
    if (imageRef.current) imageRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleProfileImageUpload = async () => {
    if (!profileImage || uploading) return;
    setUploading(true);

    try {
      const uploaded = await uploadUserProfileImagesToFirebaseStorage(
        userId,
        profileImage
      );
      if (!uploaded[0]) throw new Error(uploaded[1].message);

      const res = await axios.post(
        `/api/user/update-profile/upload-new-image`,
        { userId, imageUrl: uploaded[1] }
      );
      if (res.data.success) {
        await fetchUserData();
        setProfileImage(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

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
        setUserId(data.userData.id);
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
          <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              multiple={false}
              ref={imageRef}
              onChange={handleProfileImageChange}
            />
            <div className="flex flex-col items-start">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : formData.image
                }
                alt="profile image"
                width={150}
                height={150}
                title="Choose new image"
                className="w-32 h-32 cursor-pointer rounded-full m-1 p-1 border-2 border-solid border-white"
                onClick={chooseNewImage}
              />
              <span className="text-slate-800 font-light text-sm">
                * Click image to upload new
              </span>
            </div>
            <button
              type="button"
              disabled={!profileImage}
              className="px-2 py-3 flex flex-row items-center justify-between rounded-lg m-1 font-semibold text-xl text-white bg-emerald-700 disabled:cursor-not-allowed disabled:hidden"
              onClick={handleProfileImageUpload}
            >
              <FaUpload className="mx-1" />
              {uploading ? <>Uploading...</> : <>Upload</>}
            </button>
          </div>
          {userId && (
            <span className="text-black m-1 bg-blue-600 py-1 px-3 rounded-xl w-fit">
              U-ID: {userId}
            </span>
          )}
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
