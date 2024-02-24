"use client";

import { useRef, useState } from "react";
import { FaPenNib } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { uploadUserProfileImagesToFirebaseStorage } from "@/lib/_firebase/_firebase_storage";


const NewCommunityForm = (props) => {

  const CommunityCardref = useRef(null);
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
  const [imageSrc, setImageSrc] = useState(null);
  const [uploading, setUploading] = useState(false);

  const addNewTag = () => {
    if (tagRef.current.value) {
      const value = tagRef.current.value;
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, value.toLowerCase()],
      }));
      tagRef.current.value = "";
    }
  };

  const removeTag = (rtag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== rtag),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/user/request/community/create-new`, {
        communityName: formData.name,
        desc: formData.desc,
        tags: formData.tags,
        image:formData.image
      });
      if (res.data.success) {
        props.getCommunities()
        alert("New community created successfully");
        
      } else {
        alert("Error creating new community");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowForm((prev) => !prev);
      setFormData((prev) => ({ ...prev, name: "", desc: "", tags: [] ,image:""}));
    }
  };
  
  // // choose the image file to upload
  const handleImageChange = (e) => {
     setImageSrc(e.target.files[0]);
   };
  

  // // handle image upload onnecting to firebase storage
 const handleImageUpload = async () => {
   setUploading(true);
   try {
     const res = await uploadUserProfileImagesToFirebaseStorage(
        `community_img`,
        imageSrc
      );
     console.log(res[1])
     if (res[0]) {
       setFormData((prev) => ({ ...prev, image: res[1] }));
     }
    } catch (error) {
     console.error(error);
   } finally {
     setUploading(false);
   }
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
              htmlFor="image"
              className="my-1 text-sm text-black capitalize font-light"
            >
              Add Image*
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              required
              accept="image/*"
              multiple={false}
              className="outline-none max-w-md text-white font-medium text-base px-3 py-2 mx-2 w-full mb-3 mt-1 bg-slate-800"
            />
            {imageSrc && (
              <div className="flex flex-col items-center p-2">
                <img
                  src={URL.createObjectURL(imageSrc)}
                  alt="/"
                  className="max-w-sm h-auto aspect-video my-2 rounded-md shadow-md border-2 border-solid border-zinc-600 ml-2"
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageUpload}
                  className="bg-transparent border-2 border-solid border-blue-600 px-3 py-2 rounded-md mx-2 text-blue-600 font-black text-base"
                >
                  {uploading ? <>Uploading...</> : <>Upload</>}
                </button>
              </div>
            )}
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
                <span
                  key={index}
                  className="bg-zinc-800 text-white font-black text-sm m-1 p-1 flex flex-row items-center justify-between rounded-md"
                >
                  {tag}
                  <span
                    className="ml-1 text-sm font-normal flex items-center justify-center rounded-full bg-slate-600 cursor-pointer p-1"
                    onClick={() => {
                      removeTag(tag);
                    }}
                  >
                    <IoClose className="text-white" />
                  </span>
                </span>
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
