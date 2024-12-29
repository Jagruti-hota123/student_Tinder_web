/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
// import Cookies from "js-cookie";

const Login = ({ setHasRefreshToken, hasRefreshToken }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (hasRefreshToken) navigate("/feed");
  });

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      });
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setHasRefreshToken(true);
      }
      if (response.status === 200) {
        console.log("response", response);

        dispatch(addUser(response.data.data));
        navigate("/feed");
      }
      console.log(token);
    } catch (error) {
      setError(error?.response?.data?.msg || "An error occurred.");
    }
  }

  async function handleSignup(event) {
    try {
      event.preventDefault();
      const response = await axios.post(BASE_URL + "/signup", {
        emailId,
        password,
        firstName,
        lastName,
      });

      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        setHasRefreshToken(true);
      }

      if (response.status === 200) {
        dispatch(addUser(response.data.data));
        navigate("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.msg || "An error occurred.");
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        <form
          className="space-y-4"
          onSubmit={isLoginForm ? handleSubmit : handleSignup}
        >
          {!isLoginForm && (
            <>
              {" "}
              <div>
                <label
                  className="block text-gray-600 mb-1 font-medium"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  aria-label="First Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              {/* Last Name Input */}
              <div>
                <label
                  className="block text-gray-600 mb-1 font-medium"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="lastName"
                  aria-label="lastName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
          {/* First Name Input */}

          {/* Email Input */}
          <div>
            <label
              className="block text-gray-600 mb-1 font-medium"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              aria-label="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-gray-600 mb-1 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              aria-label="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={isLoginForm ? handleSubmit : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <div>
            {!isLoginForm
              ? "Already have an account? "
              : "Don't have an account? "}

            <button
              onClick={() => setIsLoginForm(!isLoginForm)}
              className="text-blue-500 hover:underline"
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
