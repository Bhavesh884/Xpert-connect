import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("subscribedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setSubscribed(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/subscription/",
        {
          action: 1,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (!data || data.status === 400 || data.status === 401) {
        console.log("Invalid Email");
        return;
      }
      console.log(data);
      alert("Subscription Added!");
      setSubscribed(true);
      localStorage.setItem("subscribedEmail", email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/subscription/",
        {
          action: 2,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      if (!data || data.status === 400 || data.status === 401) {
        console.log("Invalid Email");
        return;
      }
      console.log(data);
      alert("Subscription Removed!");
      setSubscribed(false);
      localStorage.removeItem("subscribedEmail");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-[4vw] pt-[15vw] md:pt-24 pb-6 mt-10 text-[#E4E4E4] bg-[#2A2A2A]">
      <div className="flex-col md:flex md:flex-row md:gap-[5vw] xl:gap-[10vw]">
        <div className="w-full ">
          <div className="text-4xl xs:text-5xl md:text-[5vw] text-[#F0F0F0] font-[900] font-sans overflow-hidden">
            Think Creative
            <br />
            Do Effective.
          </div>
          {subscribed ? (
            <div className="my-4">
              <div>
                You are subscribed with email:{" "}
                <div className="font-bold text-xl mt-2">{email}</div>
              </div>
              <button
                onClick={handleUnsubscribe}
                className="my-2 px-4 py-3 xs:px-4 xs:py-4 text-sm rounded-lg xs:rounded-sm bg-[#F0F0F0]"
              >
                Unsubscribe
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 my-[6vw] md:my-[3vw]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-2 py-3 xs:px-4 xs:py-5 text-md rounded-md w-[80%] bg-[#F0F0F0] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-3 xs:px-4 xs:py-4 text-sm rounded-lg xs:rounded-sm bg-[#F0F0F0]"
              >
                Go
              </button>
            </form>
          )}

          <div className=" text-sm xs:text-base md:text-sm xl:text-base ">
            UltraCreation, setting new standards in the digital landscape. As
            their journey unfolded, challenges were met with expertise, and each
            project became a testament to the relentless pursuit of excellence.
          </div>
        </div>

        <div className="w-full mt-[10vw] md:mt-0 flex justify-between md:justify-between gap-5 ">
          <div className="flex flex-col ml-0 pl-0">
            <div>
              <div className="text-[3.2vw] xs:text-base md:text-sm xl:text-lg text-[#F0F0F0] font-bold">
                NAVIGATE TO THE TOP
              </div>
              <div className="flex flex-col text-[3.2vw] xs:text-sm sm:text-base md:text-sm xl:text-base">
                <Link
                  to={"/"}
                  className="font-medium duration-200 mt-5 relative no-underline text-white"
                >
                  Home
                </Link>
                <Link
                  to={"/experts"}
                  className="font-medium duration-200 mt-2 relative no-underline text-white"
                >
                  Experts
                </Link>
                <Link
                  to={"/services"}
                  className="font-medium duration-200 mt-2 relative no-underline text-white"
                >
                  Services
                </Link>
                <Link
                  to={"/blog"}
                  className="font-medium duration-200 mt-2 relative no-underline text-white"
                >
                  Blogs
                </Link>
                <Link
                  to={"/about"}
                  className="font-medium duration-200 mt-2 relative no-underline text-white"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="mt-10">
              <div className="text-[3.2vw] xs:text-base md:text-sm xl:text-lg text-[#F0F0F0] font-bold">
                YOU CAN FIND US
              </div>
              <div className="text-[3.2vw] xs:text-sm sm:text-base md:text-sm xl:text-base">
                <div className=" mt-5">Instagram</div>
                <div className="mt-2">Linkedin</div>
                <div className="mt-2">Twitter</div>
                <div className="mt-2">Phone</div>
                <div className="mt-2 text-wrap break-words">Email</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="text-[3.2vw] xs:text-base md:text-sm xl:text-lg text-[#F0F0F0] font-bold">
                SERVICES WE PROVIDE
              </div>
              <div className="text-[3.2vw] xs:text-sm sm:text-base md:text-sm xl:text-base">
                <div className="mt-5">UI/UX design</div>
                <div className="mt-2">Web Development</div>
                <div className="mt-2">SEO</div>
                <div className="mt-2">Logo design</div>
                <div className="mt-2">Graphic design</div>
              </div>
            </div>
            <div className="mt-10">
              <div className="text-[3.2vw] xs:text-base md:text-sm xl:text-lg text-[#F0F0F0] font-bold">
                WE WILL ALWAYS HELP
              </div>
              <div className="text-[3.2vw] xs:text-sm sm:text-base md:text-sm xl:text-base ">
                <Link
                  to={"/becomesalesman"}
                  className="mt-5 text-[#F0F0F0] no-underline font-medium duration-200"
                >
                  Become a Salesman
                </Link>
                <div className="mt-5">Terms & Conditions</div>
                <div className="mt-2">Privacy Policies</div>
                <div className="mt-2">Cookies</div>
                <div className="mt-2">Payment and Return</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-solid border-white my-10"></div>
      <div className="lg:flex items-center justify-between shrink-0">
        <div className="pb-3 text-5xl md:text-[8vw] font-[900] font-sans tracking-normal text-[#F0F0F0] overflow-hidden">
          ultraXpert
        </div>
        <div className="my-4 lg:my-0 text-base sm:text-lg">
          © Copyright 2024 ultraXpert Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
