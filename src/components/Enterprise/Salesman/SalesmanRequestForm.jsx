import React, { useState } from "react";
import axios from "../../../axios";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEdit2,
  FiUploadCloud,
} from "react-icons/fi";
import { toast } from "react-toastify";

const SalesmanFormPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    dob: "",
    reason: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const cookies = document.cookie.split("; ");
  const jsonData = {};

  cookies.forEach((item) => {
    const [key, value] = item.split("=");
    jsonData[key] = value;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure no fields are empty
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.mobile ||
      !formData.dob ||
      !formData.reason
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "/enterprises/salesman/",
        {
          action: 1,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          mobile: formData.mobile,
          dob: formData.dob,
          reason: formData.reason,
          profile_img: "",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jsonData.access_token}`,
          },
        }
      );

      console.log("Form submitted successfully", response.data);
      if (response.data.msg === "Salesman request already exists") {
        toast.warn("Salesman request already exists");
        return;
      }
      // Reset form and image preview
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        dob: "",
        reason: "",
      });
      setProfileImage(null);
      setProfilePreview(null);

      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting the form", error);

      toast.error(
        "Failed to submit the form. Please try again. " +
          error?.response?.data?.msg
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white px-6 md:px-20">
        {/* Landing Section */}
        <div className="w-full h-auto">
          <div className="max-w-5xl mx-auto py-16 px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold text-teal-700">
              Innovate Yourself as a Salesman
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Join us and take the next step in your sales career! Help us
              expand the market and reach new clients with your skills and
              passion.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex flex-col xs:flex-row flex-wrap md:flex-nowrap justify-center items-center mt-8 gap-6 xs:gap-4 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Teamwork"
              className="w-2/3 xs:w-1/3 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1664201890468-74a27ce2ce31?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Sales"
              className="w-2/3 xs:w-1/3 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://plus.unsplash.com/premium_photo-1682310103070-d22ac81df717?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Growth"
              className="w-2/3 xs:w-1/3 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-7xl border border-solid border-slate-300 mx-auto my-12 p-8 bg-white shadow-lg rounded-lg transition-all duration-500 ease-in-out hover:shadow-xl">
          <h2 className="text-4xl font-bold text-center text-teal-600 mb-8">
            Become a Salesman Today!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Upload */}
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-lg">
                    <FiUser size={50} />
                  </div>
                )}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600 transition duration-300"
                >
                  <FiUploadCloud size={20} />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  className="hidden"
                  onChange={handleProfileUpload}
                  accept="image/*"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm ">
                  <FiUser className="ml-2 text-gray-400" />
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    placeholder="Enter your first name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
                  <FiUser className="ml-2 text-gray-400" />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    placeholder="Enter your last name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
                  <FiMail className="ml-2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mobile</label>
                <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
                  <FiPhone className="ml-2 text-gray-400" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    placeholder="Enter your mobile number"
                    onChange={handleChange}
                    className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
                <FiCalendar className="ml-2 text-gray-400" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Reason for Joining
              </label>
              <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
                <FiEdit2 className="ml-2 text-gray-400" />
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
                  placeholder="Tell us why you'd like to join"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-600 text-white px-8 py-3 rounded-md shadow-lg hover:bg-teal-700 transition duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SalesmanFormPage;
