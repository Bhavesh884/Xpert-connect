import React, { useState } from "react";
import userImage from "../../assets/images/image.png";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { auth, provider } from "../Firebase/config";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import Modal from "react-modal"



export function LoginModal({ isOpen, onClose, onGoAhead }) {
  const handleGoAhead = () => {
    onGoAhead();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Device Not Registered"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-lg w-full mx-4 shadow-lg transition-all transform"
    >
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        Confirm Your Device
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
        We’ve sent an email to your registered address. Please confirm your device registration by clicking the link in the email.
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
        After verification, click the button below to proceed with your login.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleGoAhead}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700"
        >
          Email Verified, Go Ahead
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-700"
        >
          Cancel
        </button>
      </div>
      <p className="text-center font-bold text-red-600 mb-4 animate-pulse">
        !!! Verify your email in the new tab, close it, and return to this page to complete your login.
      </p>

    </Modal>
  );
}
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const passwordRegex = /^(?=.[a-z])(?=.[!@#$%^&*]).{8,}$/;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (
      !emailRegex.test(userData.email) ||
      !userData.email.trim() ||
      !userData.email
    ) {
      newErrors.email = "Invalid email";
      isValid = false;
    }
    // if (!userData.password || !passwordRegex.test(userData.password)) {
    //   newErrors.password = "Invalid password";
    //   isValid = false;
    // }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    if (e) e?.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const res = await axios.post("/login/", {
          email: userData.email,
          password: userData.password,
        });
        // const json = await res.json();
        if (res.status === 200) {
          // check if device is registered or not
          if (res.data.msg === "Devices Not Registered") {
            toast.info("Please register your device first");
            setModalOpen(true);
            console.log(res.data.msg);
          }
          else {


            console.log("Login successful");
            console.log(res.data);

            const expirationDateforAccess = new Date();
            const expirationDateforRefresh = new Date();
            expirationDateforAccess.setDate(
              expirationDateforAccess.getDate() + 7
            );
            expirationDateforRefresh.setDate(
              expirationDateforRefresh.getDate() + 8
            );
            document.cookie = `access_token=${res.data.access_token
              };expires=${expirationDateforAccess.toUTCString()};  SameSite=Lax;`;
            document.cookie = `refresh_token=${res.data.refresh_token
              };expires=${expirationDateforRefresh.toUTCString()};  SameSite=Lax;`;
            // localStorage.setItem("userId", `${res.data.id}`);
            localStorage.setItem("username", `${res.data.first_name}`);
            localStorage.setItem("profile", `${res.data.profile_img}`);
            localStorage.setItem("isExpert", `${res.data.is_expert}`);
            localStorage.setItem("isAuthor", `${res.data.is_author}`);
            localStorage.setItem("isCustomer", `${res.data.is_customer}`);
            localStorage.setItem("expert_id", `${res.data.expert_id}`);
            localStorage.setItem("customer_id", `${res.data.customer_id}`);
            if (localStorage.getItem("isExpert") === "true") {
              window.location.href = "/expertdashboard";
            } else {
              window.location.href = "/";
            }
            toast.success("Login successful");
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Invalid email or password");
        setLoading(false);
      }
    }
  };

  const handleOTP = () => {
    navigate("/loginiwthotp");
  };

  const handleGoogleLink = () => {
    console.log("User want to login with google");
  };

  const handleSignUp = () => {
    navigate("/signUp");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  const generatePassword = (firstName, lastName, email) => {
    const firstThreeFirstName = firstName.slice(0, 3).toLowerCase();
    const lastThreeLastName = lastName.slice(-3).toLowerCase();
    const firstThreeEmail = email.slice(0, 3).toLowerCase();

    // Combine the segments into a password (you can add a number or constant suffix for complexity)
    const password = `884${firstThreeFirstName}@${lastThreeLastName}$${firstThreeEmail}#185`; // Example: johnsmithjoh123
    return password;
  };
  const handleLogininWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("signin with google", result);
      const nameParts = result.user.displayName.split(" ");

      const email = result.user.email;

      // Call the function to generate a password based on the user info
      const password = generatePassword(
        nameParts[0],
        nameParts.length > 1 ? nameParts.slice(1).join(" ") : "xyz",
        email
      );
      setUserData({
        ...userData,
        email: email,
        password: password,
      });
      //login call
      handleSubmit();
    });
  };



  return (
    <div className="md:h-screen mt-[100px] bg-white">
      <div className="lg:w-[60%] md:w-[75%] sm:w-[85%] w-[95%] flex md:flex-row flex-col mx-auto bg-white px-8 pb-8 rounded-xl shadow-md border border-solid border-[#a3a3a3]">
        <div className="flex flex-col md:w-[50%] w-full ">
          <h1 className="text-3xl md:text-4xl font-bold mb-5 md:mb-8 text-[#3E5676]">
            Login
          </h1>
          <form className="mb-2" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-base md:text-lg"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border rounded-sm p-2 w-full mb-3"
              value={userData.email}
              onChange={handleChange}
            />
            <div className="text-red-500 text-sm mb-1">{errors.email}</div>

            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-base md:text-lg"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border rounded-sm p-2 w-full mb-3"
              value={userData.password}
              onChange={handleChange}
            />
            <div className="text-red-500 text-sm mb-1">{errors.password}</div>
            <div className="flex justify-between">
              <p
                onClick={handleOTP}
                className="cursor-pointer text-xs text-[#272727] underline hover:text-blue-500 cursor pointer"
              >
                Login with OTP ?
              </p>
              <p
                onClick={handleLogininWithGoogle}
                className="text-xs text-[#272727] hover:text-blue-500 cursor pointer underline"
              >
                Login with Google ?
              </p>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`${loading ? "bg-gray-300" : "bg-[#272727]"
                } text-base md:text-lg text-white cursor-pointer font-semibold py-2 px-4 rounded-md w-full`}
            >
              Login
            </button>
            <p
              onClick={handleForgotPassword}
              className="cursor-pointer text-xs underline"
            >
              Forgot Password?
            </p>
          </form>

          <p className="text-xs underline">Want to create an account?</p>
          <button
            onClick={handleSignUp}
            className="bg-white text-[#272727] w-full text-base md:text-lg font-semibold px-4 py-2 cursor-pointer rounded-md border border-solid border-[#272727]"
          >
            Sign Up
          </button>
        </div>

        <div className="md:w-[50%] w-full flex items-center justify-center">
          <img src={userImage} alt="userImage" />
        </div>
      </div>
      {/* modal for device not registered */}
      <LoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onGoAhead={handleSubmit}
      />
    </div>
  );
};

export default Login;
