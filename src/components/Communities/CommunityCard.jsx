"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const CommunityCard = () => {
  const { data: session, status } = useSession();

  const cards = [
    {
      name: "Money-Handlers",
      desc: `we aim to provide a way to handle your money in a way that will be useful for others and you will also get benefit from it. we take up money from you every month and provide loans on interest to the customer (who are in community) and every year end we will return your deposited money to you back and interest on that money.`,
      tags: ["Money", "Yearly"],
    },
  ];

  return (
    <>
      <div className="flex flex-row flex-wrap gap-3 items-start justify-evenly">
        {cards.map((card, index) => (
          <Link
            href={`/Dashboard/${session?.user?.name}/Communities/Community/${card.name}`}
            key={index}
          >
            <div className="w-full max-w-md h-auto rounded-lg overflow-hidden border-2 border-solid border-black bg-white cursor-pointer">
              <img
                src={"/community_default.jpg"}
                alt="/"
                draggable={false}
                className="w-full h-60 hover:scale-105"
              />
              <div className="my-1 mx-2 flex flex-col items-start">
                <h1 className="font-black text-xl my-1">
                  <span className="mr-1 capitalize text-zinc-800 font-light">
                    Community Name:
                  </span>
                  <span className="font-mono text-black">{card.name}</span>
                </h1>
                <h2 className="font-black text-xl my-1">
                  <span className="mr-1 capitalize text-zinc-800 font-light">
                    Tags:
                  </span>
                  {card.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="mx-1 text-white bg-zinc-400 rounded-full p-2 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </h2>
                <p className="font-black text-xl my-1">
                  <span className="mr-1 capitalize text-zinc-800 font-light">
                    Description:
                  </span>
                  <span className="text-slate-800 font-normal text-sm">
                    {card.desc}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CommunityCard;
