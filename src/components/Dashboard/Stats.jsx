"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, NotFound } from "../ComponentExporter";
import { getLocaleTime } from "../ConvertTime";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Stats = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);

  const getStats = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`/api/user/request/global/get-stats-my`);
      if (res.data.success) {
        setStats((prev) => res.data.request_data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const updateStatus = async (id) => {
    if (confirm("Are you sure you want to update")) {
      setLoading(false);

      try {
        const res = await axios.post(`/api/user/request/global/update-status`, {
          reqId: id,
        });
        if (res.data.success) {
          await getStats();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loading msg={"Fetching your Requests"} />
        </>
      ) : stats.length === 0 ? (
        <>
          <NotFound msg={"[!] You have not requested yet"} />
        </>
      ) : (
        <div className="w-full mt-3">
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-black bg-gray-400 px-3 py-1 rounded-full w-fit">
            [Your Requests] Stats{" "}
            <span className="text-xl text-blue-600 font-extrabold">{`(`}</span>
            <span className="font-pacifico text-slate-700 text-sm mx-1">
              All your activities
            </span>
            <span className="text-xl text-blue-600 font-extrabold">{`)`}</span>
          </h4>
          <p className="text-sm font-normal mt-1 p-1 text-black">
            You have to update status of request by clicking on it if Completed.
          </p>
          <div className="mt-3 md:m-4">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      title="Change it by clicking"
                    >
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Suppliers
                    </th>
                    <th scope="col" className="px-6 py-3">
                      description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {getLocaleTime(stat.createdAt)}
                      </th>
                      <td className="px-6 py-4 capitalize">{stat.title}</td>
                      <td className="px-6 py-4">{stat.time}</td>
                      {stat.status == "pending" ? (
                        <td
                          className="px-6 py-4 text-red-500 cursor-pointer"
                          onClick={() => {
                            updateStatus(stat.reqId);
                          }}
                        >
                          Pending
                        </td>
                      ) : (
                        <td className="px-6 py-4 text-green-500">Completed</td>
                      )}
                      <td className="px-6 py-4">
                        {stat.requestHandlers.length === 0 ? (
                          <span>N/A</span>
                        ) : (
                          stat.requestHandlers.map((handler, index) => (
                            <Link
                              key={index}
                              href={`/Dashboard/${session.user.name}/OtherUser/profile/${handler}`}
                            >
                              <span className="hover:text-blue-500 p-1 cursor-pointer">
                                {handler}
                              </span>
                            </Link>
                          ))
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {stat.desc.substring(0, 15)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Stats;
