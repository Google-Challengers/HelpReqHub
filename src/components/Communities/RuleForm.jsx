"use client";

import { useState } from "react";
import axios from "axios";

const RuleForm = ({ comName, updateState }) => {
  const [formData, setFormData] = useState({ rule: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rule) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/user/request/community/logs/new-rule/set`,
        {
          communityName: comName,
          rule: formData.rule,
        }
      );
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, rule: "" }));
        updateState((prev) => !prev);
      } else {
        alert("Error setting new rule");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="w-full p-1 flex flex-row" onSubmit={handleSubmit}>
        <input
          type="text"
          name="rule"
          id="rule"
          value={formData.rule}
          onChange={handleChange}
          placeholder="Set the rules..."
          required={true}
          className="outline-none bg-white px-2 mx-1 w-full rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-2 py-3 rounded-md bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-wait text-white uppercase font-black"
        >
          SET
        </button>
      </form>
    </>
  );
};

export default RuleForm;
