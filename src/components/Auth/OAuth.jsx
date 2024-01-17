"use client";

import { ImFacebook2, ImGoogle2, ImInstagram } from "react-icons/im";
import { signIn } from "next-auth/react";
import { useState } from "react";
import clsx from "clsx";

const oauthProviders = [
  { name: "Google", iconname: ImGoogle2 },
  { name: "Facebook", iconname: ImFacebook2 },
  { name: "Instagram", iconname: ImInstagram },
];

const OAuth = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (name) => {
    setLoading(true);
    await signIn(name.toLowerCase(), { redirect: true, callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <>
      <div className="m-1 flex flex-col lg:flex-row">
        {oauthProviders.map((provider, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "px-3 py-2 m-2 shadow-md rounded-md bg-gradient-to-t from-fuchsia-500 via-pink-500 to-rose-500 cursor-pointer flex flex-row items-center",
                loading ? "line-through" : ""
              )}
              onClick={() => {
                handleClick(provider.name);
              }}
            >
              <provider.iconname className="text-slate-900 text-xl m-1" />
              <span className="font-bold text-xl text-black m-1">
                Continue with{` ${provider.name}`}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OAuth;
