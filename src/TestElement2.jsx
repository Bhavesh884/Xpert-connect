import React, { useState } from "react";
import { SiClockify } from "react-icons/si";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiListBulletsBold } from "react-icons/pi";
import { FaListCheck } from "react-icons/fa6";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { PiNotebookBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import GetAllEnterprise from "./components/Enterprise/Controler/GetAllEnterprise";

const ControlerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <div className="flex gap-2 w-full">
      <div className="bg-white text-neutral-1000 w-full md:w-[20%] p-4 hidden md:flex md:flex-col justify-between fixed md:relative bottom-0 md:bottom-auto z-10 md:z-auto border-r border-solid border-neutral-100 mt-[60px] overflow-y-scroll">
        <div>
          <h3 className="text-lg text-blue-400 font-bold text-center shrink-0">
            Controler Dashboard
          </h3>
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 w-full justify-around border-b border-solid border-neutral-100 pb-4">
            <button
              onClick={() => setActiveTab("Dashboard")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "Dashboard" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <SiClockify className="w-5 h-5" />
              <span className="hidden md:block">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("EnterpriseList")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "EnterpriseList" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <LuLayoutDashboard className="w-5 h-5" />
              <span className="hidden md:block">Enterprise List</span>
            </button>
            <button
              onClick={() => setActiveTab("AddEnterprise")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "AddEnterprise" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <FaRegHeart className="w-5 h-5" />
              <span className="hidden md:block">Add Enterprise</span>
            </button>
            <button
              onClick={() => setActiveTab("Bookings")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "Bookings" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <PiListBulletsBold className="w-5 h-5" />
              <span className="hidden md:block">Bookings</span>
            </button>
            <button
              onClick={() => setActiveTab("Inbox")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "Inbox" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <HiOutlineChatAlt2 className="w-5 h-5" />
              <span className="hidden md:block">Inbox</span>
            </button>
            <button
              onClick={() => setActiveTab("queries")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "queries" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <PiNotebookBold className="w-5 h-5" />
              <span className="hidden md:block">Queries</span>
            </button>
          </div>
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 w-full justify-around border-b border-solid border-neutral-100 py-6">
            <button
              onClick={() => setActiveTab("Staff")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "Staff" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <FaListCheck className="w-5 h-5" />
              <span className="hidden md:block">Staff & Roles</span>
            </button>
          </div>
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 w-full justify-around py-4">
            <button
              onClick={() => setActiveTab("Settings")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "Settings" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <IoSettingsOutline className="w-5 h-5" />
              <span className="hidden md:block">Settings</span>
            </button>
            <button
              onClick={() => setActiveTab("Logout")}
              className={`flex items-center justify-center md:justify-start space-x-2 md:space-x-4 w-full px-4 py-2 rounded-lg ${
                activeTab === "Logout" ? "bg-blue-400 text-white" : ""
              }`}
            >
              <BiLogOut className="w-5 h-5" />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[80%] mt-20 overflow-y-scroll pl-2 pr-6">
        {activeTab === "EnterpriseList" && <GetAllEnterprise />}
      </div>
    </div>
  );
};

export default ControlerDashboard;
