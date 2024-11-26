import React, { useState, useEffect } from "react";
import axios from "../../axios";
import RaiseQuery from "./RaiseQuery";
import { FaSearch, FaCaretDown, FaFilter } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import QueryDetailsModal from "./QueriesModal"; // Import the modal component
import ReactModal from "react-modal";

function MyQueries() {
  const [queries, setQueries] = useState([]);
  const [raiseQuery, setRaiseQuery] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [notResolved, setNotResolved] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("topic");
  const [dateFilter, setDateFilter] = useState("");
  const [isSearchByModalOpen, setIsSearchByModalOpen] = useState(false);
  const [isDateFilterModalOpen, setIsDateFilterModalOpen] = useState(false);

  const cookies = document.cookie.split("; ");
  const jsonData = {};

  cookies.forEach((item) => {
    const [key, value] = item.split("=");
    jsonData[key] = value;
  });

  const fetchQueries = async () => {
    try {
      const response = await axios.get("/customers/query/?action=1", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jsonData.access_token}`,
        },
      });
      setQueries(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleResolve = async (queryId) => {
    try {
      const response = await axios.post(
        `/customers/query/`,
        { query_id: queryId, action: 2 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jsonData.access_token}`,
          },
        }
      );
      console.log(response.data);

      setQueries(
        queries.map((query) =>
          query.id === queryId ? { ...query, status: "resolved" } : query
        )
      );
    } catch (error) {
      console.log("Error resolving query", error);
    }
  };

  const HandleNotResolved = () => {
    setLoading(true);
    setResolved(false);
    setNotResolved(true);
    setLoading(false);
  };

  const HandleResolved = () => {
    setLoading(true);
    setResolved(true);
    setNotResolved(false);
    setLoading(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSearchBy("topic");
    setDateFilter("");
  };

  const filteredQueries = queries
    .filter((query) => {
      const searchMatch = (query[searchBy]?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );

      const queryDate = new Date(query.date_created);
      const selectedDate = dateFilter ? new Date(dateFilter) : null;
      const dateMatch = !selectedDate || queryDate >= selectedDate;

      return searchMatch && dateMatch;
    })
    .filter((query) =>
      notResolved ? query.status === "" : query.status === "resolved"
    );

  return (
    <div className="w-full md:w-[68%] ">
      <div className="container mx-auto sm:p-4">
        <div className="flex justify-between mb-2">
          <div className="text-2xl font-bold mb-4">My Queries</div>
          <button
            className="btnBlack text-sm text-white px-4 py-2 rounded"
            onClick={() => setRaiseQuery(true)}
          >
            Raise a Query
          </button>
        </div>
        {raiseQuery ? (
          <div className="w-full h-full mt-8">
            <RaiseQuery
              setRaiseQuery={setRaiseQuery}
              fetchQueries={fetchQueries}
            />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center rounded-md p-4 my-6 shadow-md  border border-solid border-slate-400  bg-[#ececec]">
              <div className="flex items-center  rounded-sm px-4 py-2 w-[38%] border border-solid border-slate-400 bg-white">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder={`Search by ${searchBy}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ml-2 bg-transparent focus:outline-none text-neutral-600 w-full"
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="flex gap-1 items-center px-4 py-2 bg-transparent shrink-0"
                  onClick={() => setIsSearchByModalOpen(true)}
                >
                  <FaFilter className="mr-2" />
                  <span className="font-semibold font-poppins text-desk-b-3 text-black">
                    Search By{" "}
                  </span>
                  <FaCaretDown />
                </button>
                <button
                  className="flex gap-1 items-center px-4 py-2 bg-transparent shrink-0"
                  onClick={() => setIsDateFilterModalOpen(true)}
                >
                  <span className="font-semibold font-poppins text-desk-b-3 text-black">
                    Select Date
                  </span>
                  <FaCaretDown />
                </button>

                <button
                  onClick={clearFilters}
                  className="text-red-700  bg-transparent px-4 py-2 flex gap-1 items-center rounded-sm  font-semibold"
                >
                  <BiReset />
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="flex mb-4 gap-3 border-b border-solid border-[#c7c7c7] pb-3 text-sm md:text-base overflow-x-scroll pr-2">
              <div
                className={`px-3 py-2 cursor-pointer font-semibold shrink-0 ${
                  notResolved && `bg-[#ececec] rounded-md`
                }`}
                onClick={() => HandleNotResolved()}
              >
                Unresolved Queries
              </div>
              <div
                className={`px-3 py-2 cursor-pointer font-semibold shrink-0 ${
                  resolved && `bg-[#ececec] rounded-md`
                }`}
                onClick={() => HandleResolved()}
              >
                Resolved Queries
              </div>
            </div>

            <div>
              {filteredQueries.length === 0 ? (
                <p>No queries found</p>
              ) : (
                <div className="flex gap-4 flex-col">
                  {filteredQueries.map((query) => (
                    <div
                      key={query.id}
                      className="border border-slate-300 border-solid px-2 py-4 xs:p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4"
                    >
                      {/* Image */}
                      <img
                        src="https://ultraxpert.s3.ap-south-1.amazonaws.com/Screenshot+2024-09-10+115557.png"
                        alt="Query"
                        className="w-full md:w-1/4 rounded-lg object-cover"
                      />

                      {/* Query Info */}
                      <div className="w-full md:w-3/4">
                        <div className="w-full flex justify-end text-slate-600 text-xs">
                          {new Date(query.date_created).toLocaleDateString()}
                        </div>
                        <div className="font-semibold text-lg mb-2">
                          {query.topic}
                        </div>
                        <div className="text-gray-600 mb-2">
                          {query.description}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Technology: {query.technology_name}
                        </div>
                        <div className="flex gap-2 justify-start mt-2">
                          <button
                            onClick={() => setSelectedQueryId(query.id)}
                            className="bg-[#2A2A2A] text-white px-4 py-2 rounded"
                          >
                            View Replies
                          </button>
                          {query.status === "" && (
                            <button
                              onClick={() => handleResolve(query.id)}
                              className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {selectedQueryId && (
        <QueryDetailsModal
          queryId={selectedQueryId}
          isOpen={selectedQueryId !== null}
          onClose={() => setSelectedQueryId(null)}
        />
      )}

      {/* Modal for Search By */}
      <ReactModal
        isOpen={isSearchByModalOpen}
        onRequestClose={() => setIsSearchByModalOpen(false)}
        className="bg-white rounded-lg shadow-lg p-6 z-[999999]"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-60 flex justify-center items-center z-[999999]"
      >
        <h3 className="text-lg font-bold mb-4">Select Search By Field</h3>
        <div className="flex flex-wrap flex-row gap-3 items-center justify-start w-full ">
          <div>
            <button
              className={`px-4 py-2 rounded-full ${
                searchBy === "topic"
                  ? "btnBlack text-white"
                  : " border border-solid border-[#c7c7c7]"
              }`}
              onClick={() => setSearchBy("topic")}
            >
              Topic
            </button>
          </div>
          <div>
            <button
              className={`px-4 py-2 rounded-full ${
                searchBy === "description"
                  ? "btnBlack text-white"
                  : " border border-solid border-[#c7c7c7]"
              }`}
              onClick={() => setSearchBy("description")}
            >
              Description
            </button>
          </div>
          <div>
            <button
              className={`px-4 py-2 rounded-full ${
                searchBy === "technology_name"
                  ? "btnBlack text-white"
                  : " border border-solid border-[#c7c7c7]"
              }`}
              onClick={() => setSearchBy("technology_name")}
            >
              Technology Name
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-4">
          <button
            onClick={() => setIsSearchByModalOpen(false)}
            className="text-gray-700 px-4 py-2 mr-2 rounded-md border border-solid border-[#c7c7c7] bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsSearchByModalOpen(false)}
            className="btnBlack text-white px-4 py-2 rounded-md"
          >
            Apply Search Filter
          </button>
        </div>
      </ReactModal>

      {/* Modal for Date Filter */}
      <ReactModal
        isOpen={isDateFilterModalOpen}
        onRequestClose={() => setIsDateFilterModalOpen(false)}
        className="bg-white rounded-lg shadow-lg p-6 z-[999999]"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[999999]"
      >
        <h3 className="text-lg font-bold mb-4">Select Date</h3>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsDateFilterModalOpen(false)}
            className="text-gray-700 px-4 py-2 mr-2 rounded-md border border-solid border-[#c7c7c7] bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsDateFilterModalOpen(false)}
            className="btnBlack text-white px-4 py-2 rounded-md"
          >
            Apply Date Filter
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default MyQueries;
