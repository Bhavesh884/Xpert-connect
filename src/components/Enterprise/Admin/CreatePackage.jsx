import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../axios";

// get tokens from cookies
const cookies = document.cookie.split("; ");
const jsonData = {};

cookies.forEach((item) => {
  const [key, value] = item.split("=");
  jsonData[key] = value;
});
const CreatePackageForm = () => {
  const [formData, setFormData] = useState({
    action: 1,
    name: "",
    discount_percentage: "",
    number_of_users: "",
    discounted_price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/enterprises/packages/",
        {
          action: 1,
          name: formData.name,
          discount_percentage: formData.discount_percentage,
          number_of_users: formData.number_of_users,
          discounted_price: formData.discounted_price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jsonData.access_token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Package created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error while creating package");
    }
    // Handle API submission here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 border border-solid border-slate-200 rounded-lg m-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border-2 border-teal-500">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Create Package
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Package Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-teal-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter package name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="discount_percentage"
              className="block text-gray-700 font-semibold mb-2"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              name="discount_percentage"
              id="discount_percentage"
              value={formData.discount_percentage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-teal-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter discount percentage"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="number_of_users"
              className="block text-gray-700 font-semibold mb-2"
            >
              Number of Users
            </label>
            <input
              type="number"
              name="number_of_users"
              id="number_of_users"
              value={formData.number_of_users}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-teal-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter number of users"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="discounted_price"
              className="block text-gray-700 font-semibold mb-2"
            >
              Discounted Price ($)
            </label>
            <input
              type="number"
              name="discounted_price"
              id="discounted_price"
              value={formData.discounted_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-teal-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter discounted price"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePackageForm;
