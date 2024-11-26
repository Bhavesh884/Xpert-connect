import { useState } from "react";
import {
  FiUser,
  FiCheckCircle,
  FiBriefcase,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEdit2,
  FiLink,
  FiHash,
} from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "./axios";

//get cookies
const cookies = document.cookie.split("; ");
const jsonData = {};

cookies.forEach((item) => {
  const [key, value] = item.split("=");
  jsonData[key] = value;
});
// Step Indicator Component
const StepIndicator = ({ step }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {/* Step 1: Owner */}
        <div
          className={`flex items-center ${
            step >= 1 ? "text-teal-600" : "text-gray-400"
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-teal-600">
            {step > 1 ? <FiCheckCircle size={20} /> : <span>1</span>}
          </div>
          <span className="ml-2 font-medium">Add Owner</span>
        </div>

        {/* Separator */}
        <div
          className={`h-1 w-16 ${step >= 2 ? "bg-teal-600" : "bg-gray-300"}`}
        ></div>

        {/* Step 2: Enterprise */}
        <div
          className={`flex items-center ${
            step === 2 ? "text-teal-600" : "text-gray-400"
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-teal-600">
            <span>2</span>
          </div>
          <span className="ml-2 font-medium">Add Enterprise</span>
        </div>
      </div>
    </div>
  );
};

// Add Owner Form
const AddOwnerForm = ({
  formData,
  handleChange,
  handleImageUpload,
  nextStep,
  imagePreview,
}) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-6 border border-solid border-slate-300">
      <h2 className="text-4xl font-bold text-center text-teal-600 mb-8">
        Add Owner Details
      </h2>

      {/* Profile Image Upload */}
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">
          {imagePreview ? (
            <img
              src={imagePreview}
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
            <FiArrowRight size={20} />
          </label>
          <input
            id="profile-upload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>
      </div>
      {/* form details------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">First Name</label>
          <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
            <FiUser className="ml-2 text-gray-400" />
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              placeholder="Enter first name"
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
              placeholder="Enter last name"
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
              placeholder="Enter email"
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
              placeholder="Enter mobile number"
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-300 flex items-center"
        >
          Next Step <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

// Add Enterprise Form
const AddEnterpriseForm = ({
  formData,
  handleChange,
  handleLogoUpload,
  handleSubmit,
  logoPreview,
}) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-6 border border-solid border-slate-300">
      <h2 className="text-4xl font-bold text-center text-teal-600 mb-8">
        Add Enterprise Details
      </h2>

      {/* Enterprise Logo Upload */}
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">
          {logoPreview ? (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-lg">
              <FiBriefcase size={50} />
            </div>
          )}
          <label
            htmlFor="logo-upload"
            className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600 transition duration-300"
          >
            <FiArrowRight size={20} />
          </label>
          <input
            id="logo-upload"
            type="file"
            className="hidden"
            onChange={handleLogoUpload}
            accept="image/*"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Company Name</label>
          <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
            <FiBriefcase className="ml-2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your company name"
              onChange={handleChange}
              className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Company Size</label>
          <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
            <FiHash className="ml-2 text-gray-400" />
            <input
              type="number"
              name="company_size"
              value={formData.company_size}
              placeholder="Enter the company size"
              onChange={handleChange}
              className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Company Description</label>
        <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
          <FiEdit2 className="ml-2 text-gray-400" />
          <textarea
            name="description"
            value={formData.description}
            placeholder="Enter your company description"
            onChange={handleChange}
            className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Registration Number
          </label>
          <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
            <FiHash className="ml-2 text-gray-400" />
            <input
              type="text"
              name="registration_no"
              value={formData.registration_no}
              placeholder="Enter your registration number"
              onChange={handleChange}
              className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Registration Date</label>
          <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
            <input
              type="date"
              name="registered_on"
              value={formData.registered_on} // This will be in YYYY-MM-DD format
              onChange={handleChange}
              className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Website Link</label>
        <div className="flex items-center border border-solid border-gray-300 rounded-md shadow-sm">
          <FiLink className="ml-2 text-gray-400" />
          <input
            type="url"
            name="website_link"
            value={formData.website_link}
            placeholder="Enter your website URL"
            onChange={handleChange}
            className="w-full px-4 py-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-300"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-300 flex items-center"
        >
          Submit <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

// Main Component
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    dob: "",
    name: "",
    description: "",
    company_size: "",
    registered_on: "",
    registration_no: "",
    website_link: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Keep the date in 'YYYY-MM-DD' format in formData
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // To display the date in DD/MM/YYYY format elsewhere, you can use this helper function:
  const convertToBackendDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setLogoPreview(URL.createObjectURL(file));
  };

  const nextStep = async () => {
    try {
      const response = await axios.post(
        "/enterprises/",
        {
          action: 3,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          mobile: formData.mobile,
          dob: formData.dob,
          is_accepted: true,
          profile_img: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jsonData.access_token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.msg === "Owner created successfully") {
        setOwnerId(response.data.data.user_id);
        toast.success("Owner added successfully");
      } else if (response.data.msg === "User already exists and is an owner") {
        setOwnerId(response.data.data.user_id);
        toast.info("Owner already exists, adding enterprise");
      }
      setStep(2);
    } catch (error) {
      console.log(error);
      toast.error("Error while adding owner");
    }
  };

  const handleSubmit = async () => {
    const backendFormattedDate = convertToBackendDateFormat(
      formData.registered_on
    );
    try {
      const response = await axios.post(
        "/enterprises/",
        {
          action: 1,
          name: formData.name,
          description: formData.description,
          company_size: formData.company_size,
          registered_on: backendFormattedDate,
          registration_no: formData.registration_no,
          website_link: formData.website_link,
          owner_id: ownerId,
          logo_img: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jsonData.access_token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Enterprise added successfully");

      setStep(1);
      //clear both forms and everything
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        dob: "",
        is_accepted: false,
        profileImage: null,

        name: "",
        description: "",
        company_size: "",
        registered_on: "",
        registration_no: "",
        website_link: "",
      });
      //clear both images
      setLogoPreview(null);
      setImagePreview(null);
    } catch (error) {
      console.log(error);
      toast.error("Error while adding enterprise");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <StepIndicator step={step} />

      {step === 1 ? (
        <AddOwnerForm
          formData={formData}
          handleChange={handleChange}
          handleImageUpload={handleImageUpload}
          nextStep={nextStep}
          imagePreview={imagePreview}
        />
      ) : (
        <AddEnterpriseForm
          formData={formData}
          handleChange={handleChange}
          handleLogoUpload={handleLogoUpload}
          handleSubmit={handleSubmit}
          logoPreview={logoPreview}
        />
      )}
    </div>
  );
}

export default MultiStepForm;
