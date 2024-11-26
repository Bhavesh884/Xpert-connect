import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import axios from "../../../axios";
import { FaSearch } from "react-icons/fa";

Modal.setAppElement("#root"); // Necessary for accessibility

const cookies = document.cookie.split("; ");
const jsonData = {};

cookies.forEach((item) => {
  const [key, value] = item.split("=");
  jsonData[key] = value;
});
const GetAllEnterprise = () => {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Search filter for enterprises
  const filteredData = formData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal
  const openModal = (enterprise) => {
    setSelectedEnterprise(enterprise);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEnterprise(null);
  };

  // Fetch enterprises from API
  const fetchAllEnterprises = async () => {
    try {
      const response = await axios.get("/enterprises/?action=2", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jsonData.access_token}`, // Assuming access_token is stored correctly
        },
      });
      setFormData(response.data.data); // Correct way to set data
      console.log(response.data.data);

      toast.success("Enterprises fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching enterprises");
    }
  };

  useEffect(() => {
    fetchAllEnterprises();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex gap-4 flex-wrap justify-between mb-6">
        <div className="text-3xl font-bold text-teal-600">Enterprise List</div>
        {/* Search Input */}

        <div className="flex items-center  rounded-sm px-4 py-2 w-[38%] border border-solid border-slate-400 bg-white">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 bg-transparent focus:outline-none text-neutral-600 w-full"
          />
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 p-4 py-6 bg-slate-100 rounded-lg border-solid border border-gray-300 ">
        {filteredData.length > 0 ? (
          filteredData.map((enterprise, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-solid border-teal-200 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
              onClick={() => openModal(enterprise)}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1729485793223-f19572c349f0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={enterprise.name}
                className="w-full h-32 object-cover rounded-lg "
              />
              <h3 className="text-xl font-semibold text-teal-600 mt-4">
                {enterprise.name}
              </h3>
              <p className="text-gray-600">{enterprise.description}</p>
              <div className="mt-4">
                <p className="text-gray-500">
                  <strong>Registered by:</strong> {enterprise.registered_by}
                </p>
                <p className="text-gray-500">
                  {" "}
                  <strong>Owner:</strong> {enterprise.owner}
                </p>
                <p className="text-gray-500">
                  <strong> Controller:</strong> {enterprise.controller}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No enterprises found</p>
        )}
      </div>

      {/* Modal */}
      {selectedEnterprise && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="max-w-lg p-6 bg-white border border-teal-500 rounded-lg shadow-lg mx-auto my-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="text-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1729485793223-f19572c349f0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={selectedEnterprise.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-teal-600">
              {selectedEnterprise.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {selectedEnterprise.description}
            </p>
            <div className="text-left">
              <p className="text-gray-500">
                <strong>Registered by:</strong>{" "}
                {selectedEnterprise.registered_by}
              </p>
              <p className="text-gray-500">
                {" "}
                <strong>Owner:</strong> {selectedEnterprise.owner}
              </p>
              <p className="text-gray-500">
                <strong> Controller: </strong>
                {selectedEnterprise.controller}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GetAllEnterprise;
