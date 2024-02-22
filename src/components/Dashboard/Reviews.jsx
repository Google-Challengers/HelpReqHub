"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Loading, NotFound } from "../ComponentExporter";

const Reviews = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/get-my-reviews`);
      if (res.data.success) {
        setReviews((prev) => [...res.data.userReviewData]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loading msg={"Fetching your Reviews"} />
        </>
      ) : reviews.length === 0 ? (
        <>
          <NotFound msg={"[!] You have no reviews"} />
        </>
      ) : (
        <div className="w-full my-2">
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-black bg-gray-400 px-3 py-1 rounded-full w-fit">
            Your Reviews{" "}
            <span className="text-xl text-blue-600 font-extrabold">{`(`}</span>
            <span className="font-pacifico text-slate-700 text-sm mx-1">
              Depends on others
            </span>
            <span className="text-xl text-blue-600 font-extrabold">{`)`}</span>
          </h4>
          <p className="text-sm font-normal mt-1 p-1 text-black">
            See what you others think about you.
          </p>
          <div className="w-full my-2 flex flex-col items-start">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-zinc-800 p-3 w-full rounded-md text-zinc-300"
              >
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center justify-start">
                    <img
                      src={review.image}
                      alt="/"
                      className="w-12 h-12 rounded-full m-1 shadow-md"
                    />
                    <span className="text-white font-light text-sm uppercase">
                      {review.uname}
                    </span>
                  </div>
                  <div className="flex-col items-start hidden sm:flex">
                    <span className="text-white font-light text-sm">
                      {review.email}
                    </span>
                    <span className="text-white font-light text-sm">
                      {review.contact}
                    </span>
                  </div>
                </div>
                <hr className="w-full h-[.5px] bg-zinc-950 my-2" />
                <p className="text-white text-sm font-mono">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;
