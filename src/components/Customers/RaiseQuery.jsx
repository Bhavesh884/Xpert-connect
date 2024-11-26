import React, { useState } from "react";
import axios from "../../axios";

function RaiseQuery({ setRaiseQuery, fetchQueries }) {
  const [queryData, setQueryData] = useState({
    action: 1,
    subject: "",
    technology_name: "",
    topic: "",
    description: "",
    // resolved: false,
    // reply: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQueryData({ ...queryData, [name]: value });
  };

  const cookies = document.cookie.split("; ");
  const jsonData = {};

  cookies.forEach((item) => {
    const [key, value] = item.split("=");
    jsonData[key] = value;
  });
  const handleSubmit = async () => {
    try {
      // Make API call to submit the query
      const res = await axios.post("/customers/query/", queryData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jsonData.access_token}`,
        },
      });
      console.log(res);
      alert("Query raised successfully");
      setRaiseQuery(false);
      // Reset form if needed
    } catch (error) {
      console.log("Error raising query", error);
    }
    fetchQueries();
  };

  return (
    <div className="container w-full p-4 bg-white rounded-lg shadow-lg border border-solid border-slate-400">
      <h2 className="text-xlmd:text-2xl lg:text-3xl font-bold mb-6 text-gray-800">
        Raise a Query
      </h2>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={queryData.subject}
        onChange={handleInputChange}
        className="mb-4 p-2 md:p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out "
      />
      <input
        type="text"
        name="technology_name"
        placeholder="Technology"
        value={queryData.technology_name}
        onChange={handleInputChange}
        className="mb-4 p-2 md:p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out"
      />
      <input
        type="text"
        name="topic"
        placeholder="Topic"
        value={queryData.topic}
        onChange={handleInputChange}
        className="mb-4 p-2 md:p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={queryData.description}
        onChange={handleInputChange}
        className="mb-4 p-2 md:p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out h-24"
      ></textarea>
      <div className="flex justify-between space-x-2">
        <button
          onClick={() => setRaiseQuery(false)}
          className="w-full py-2 md:py-3 px-3 bg-white border border-solid border-slate-400  text-gray-600 rounded-md shadow-md  focus:outline-none transition duration-300 ease-in-out"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-full py-2 md:py-3 px-3 bg-black text-white rounded-md shadow-md  focus:outline-none  transition duration-300 ease-in-out"
        >
          Submit Query
        </button>
      </div>
    </div>
  );
}

export default RaiseQuery;
