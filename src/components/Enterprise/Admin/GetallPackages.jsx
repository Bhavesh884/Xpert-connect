import React, { useState, useEffect } from "react";
import axios from "../../../axios";

// get tokens from cookies
const cookies = document.cookie.split("; ");
const jsonData = {};

cookies.forEach((item) => {
  const [key, value] = item.split("=");
  jsonData[key] = value;
});
const PackagesList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/enterprises/packages/?action=1", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jsonData.access_token}`,
            // Replace with your actual API endpoint
          },
        }); // Replace with your actual API endpoint
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">
        Available Packages
      </h1>
      <div className="w-full max-w-4xl">
        {packages.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">
            Loading packages...
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white p-6 rounded-lg shadow-lg border-2 border-teal-400 hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-teal-500 mb-4">
                  {pkg.name}
                </h2>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Discount Percentage:</span>{" "}
                  {pkg.discount_percentage}%
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Number of Users:</span>{" "}
                  {pkg.number_of_users}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold">Discounted Price:</span> $
                  {pkg.discounted_price}
                </div>
                <div className="text-gray-500 text-sm">
                  <span className="font-semibold">Date Created:</span>{" "}
                  {new Date(pkg.date_created).toLocaleDateString()}
                </div>
                <div className="text-gray-500 text-sm">
                  <span className="font-semibold">Last Updated:</span>{" "}
                  {new Date(pkg.date_updated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesList;
