"use client";

import React, { useState } from "react";
import axios from "axios";

const ReviewUserForm = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [userReview, setUserReview] = useState("");

  const handleInputChange = (e) => {
    setUserReview(e.target.value);
  };

  const handleReviewSubmit = async () => {
    if (!userReview || !userId) return;

    setLoading(true);
    try {
      const res = await axios.post(`/api/other/review`, {
        userId,
        review: userReview,
      });
      if (res.data.success) {
        console.log(res.data.message);
      } else {
        console.log(res.data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-1 flex flex-col items-start">
        <h1 className="flex flex-col items-start justify-start">
          <span className="font-black text-black capitalize tracking-tight text-2xl">
            Review User
          </span>
          <span className="font-light text-zinc-800 tracking-tighter text-sm">
            tell everyone about this user
          </span>
        </h1>
        <textarea
          name="user-review"
          id="user-review"
          required
          className="outline-none focus:ring-4 focus:ring-yellow-400 border-4 border-solid border-yellow-400 p-3 rounded-lg m-1 my-3 min-h-56 w-full bg-yellow-50"
          value={userReview}
          onChange={handleInputChange}
          placeholder="Write user review here ..."
        ></textarea>
        {userReview.length > 0 && (
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-2 rounded-full bg-blue-600 disabled:bg-blue-500 text-white font-bold capitalize my-2 ml-2"
            onClick={handleReviewSubmit}
          >
            {loading ? <>Submitting...</> : <>Submit</>}
          </button>
        )}
      </div>
    </>
  );
};

export default ReviewUserForm;
