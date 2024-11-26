import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "../../../axios";

// get tokens from cookies
const cookies = document.cookie.split("; ");
const jsonData = {};

cookies.forEach((item) => {
  const [key, value] = item.split("=");
  jsonData[key] = value;
});

// Trainer Card Component
const TrainerCard = ({ trainer, onClick }) => {
  const { user, profession, about_me, created_on } = trainer.trainer || {};
  return (
    <div
      className="w-[46%] bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => onClick(trainer)}
    >
      {user?.banner_img && (
        <img
          src={user.banner_img}
          alt="Trainer Banner"
          className="w-full h-32 object-cover"
        />
      )}
      <div className="flex items-center p-4">
        {user?.profile_img && (
          <img
            src={user.profile_img}
            alt="Trainer Profile"
            className="w-16 h-16 rounded-full border-4 border-teal-500"
          />
        )}
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-teal-700">
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-sm text-gray-600">{profession}</p>
          <p className="text-sm text-gray-500">
            Created on: {created_on || "N/A"}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="text-gray-700">{about_me?.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

// Trainer Modal Component
const TrainerModal = ({ trainer, onClose }) => {
  const { user, profession, about_me, created_on, updated_on } =
    trainer.trainer || {};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/2 relative">
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>
        {user?.banner_img && (
          <img
            src={user.banner_img}
            alt="Trainer Banner"
            className="w-full h-40 object-cover rounded-t-lg"
          />
        )}
        <div className="p-6">
          <div className="flex items-center space-x-4">
            {user?.profile_img && (
              <img
                src={user.profile_img}
                alt="Trainer Profile"
                className="w-16 h-16 rounded-full border-4 border-teal-500"
              />
            )}
            <div>
              <h3 className="text-2xl font-semibold text-teal-700">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-md text-gray-600">{profession}</p>
              <p className="text-md text-gray-500">Gender: {user?.gender}</p>
              <p className="text-sm text-gray-500">
                Created on: {created_on || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {updated_on || "N/A"}
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            <strong>About Me:</strong> {about_me}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main TrainersList Component
const TrainersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainerList, setTrainerList] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredTrainers = trainerList.filter((trainer) =>
    `${trainer.trainer?.user?.first_name} ${trainer.trainer?.user?.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const fetchAllTrainers = async () => {
    try {
      const response = await axios.get("/enterprises/?action=3", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jsonData.access_token}`,
        },
      });
      setTrainerList(response.data.data);
      toast.success("Trainers fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error while fetching trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTrainers();
  }, []);

  return (
    <div className="min-h-screen border border-solid border-slate-300 rounded-lg p-6">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-teal-700 mb-6">
            Trainer Directory
          </div>
          <div className="relative mb-6 w-1/2">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full p-3 pl-10 rounded-lg border border-teal-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch
              className="absolute left-3 top-3 text-teal-500"
              size={20}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6  bg-slate-200 w-full p-4 py-8 rounded-lg">
          {loading ? (
            <p className="text-gray-600">Loading trainers...</p>
          ) : filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                onClick={setSelectedTrainer}
              />
            ))
          ) : (
            <p className="text-gray-600">No trainers found.</p>
          )}
        </div>
      </div>
      {selectedTrainer && (
        <TrainerModal
          trainer={selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
        />
      )}
    </div>
  );
};

export default TrainersList;
