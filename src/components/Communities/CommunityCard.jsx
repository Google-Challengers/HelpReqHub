"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, NotFound , NewCommunityForm } from "../ComponentExporter";

const CommunityCard = () => {
  const { data: session, status } = useSession();

  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

 const getCommunities = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/api/user/request/community/get-all`);
      if (res.data.success) {
        setCommunities((prev) => [...res.data.communityDetails]);
      } else {
        alert("Error while fetching the data");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loading msg={"Fetching Communities"} />
        </>
      ) : (
        <div className="flex flex-row flex-wrap gap-3 items-start justify-evenly">
          {!communities ? (
            <>
              <NotFound msg={"[!] Cannot fetch communities"} />
            </>
          ) : (
                <>
              <div className="w-full my-2 flex flex-col items-start p-2">
          <NewCommunityForm getCommunities={getCommunities}/>
        </div>
        
            {communities.map((community, index) => (
              <Link
                href={`/Dashboard/${session?.user?.name}/Communities/Community/${community.com_name}`}
                key={index}
              >
                <div className="w-full max-w-md h-auto rounded-lg overflow-hidden border-2 border-solid border-black bg-white cursor-pointer">
                  <img
                    src={`${community.com_image}`}
                    alt="/"
                    draggable={false}
                    className="w-full h-60 hover:scale-105 bg-black transition-all duration-100 ease-linear"
                  />
                  <div className="my-1 mx-2 flex flex-col items-start mt-3">
                    <span className="m-1 w-full">U-ID: {community.com_id}</span>
                    <h1 className="font-black text-xl my-1">
                      <span className="mr-1 capitalize text-zinc-800 font-light bg-yellow-500 p-1 rounded-lg">
                        Community Name:
                      </span>
                      <span className="font-mono text-black uppercase">
                        {community.com_name}
                      </span>
                    </h1>
                    <h2 className="font-black text-xl my-1 flex flex-row items-center flex-wrap">
                      <span className="mr-1 capitalize text-zinc-800 font-light bg-yellow-500 p-1 rounded-lg">
                        Tags:
                      </span>
                      {community.com_tags.map((tag, i) => (
                        <span
                          key={i}
                          className="mx-1 my-1 text-white bg-zinc-400 rounded-full p-2 capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </h2>
                    <p className="font-black text-xl my-1">
                      <span className="mr-1 capitalize text-zinc-800 font-light bg-yellow-500 p-1 rounded-lg">
                        Description:
                      </span>
                      <span className="text-slate-800 font-normal text-sm">
                        {community.com_desc}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </>
           
            
          )}
         
        </div>
       
      )}
     
    </>
  );
};

export default CommunityCard
