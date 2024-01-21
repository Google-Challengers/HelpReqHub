"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading, NotFound } from "../ComponentExporter";

const RulesCards = ({ comName, states = [] }) => {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState([]);

  const getRules = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/request/community/logs/get-logs/rules`,
        { communityName: comName }
      );
      if (res.data.success) {
        setRules((prev) => [...res.data.logsRules]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRules();
  }, [...states]);

  return (
    <>
      {loading ? (
        <>
          <Loading msg={"Fetching Rules"} />
        </>
      ) : rules.length === 0 ? (
        <>
          <NotFound msg={"[!] No rules"} />
        </>
      ) : (
        rules.map((rule, i) => (
          <div className="flex flex-col items-start" key={i}>
            <div className="p-2 bg-white rounded-lg flex flex-row items-start w-fit m-1">
              <span className="text-blue-800 font-black mx-1">{i + 1}.</span>
              <p className="text-black font-light text-sm">{rule}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default RulesCards;
