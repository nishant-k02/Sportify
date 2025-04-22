import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  // axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.token);
      const { success, message, role } = response.data;

      // const { success, message, role } = response.data;
      console.log("Login Role:", role);
      if (success) {
        if (role === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password");
      } else {
        alert("Error: Failed to connect to server");
      }
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleLoginChange}
              value={loginData.email}
              placeholder="Enter your email..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleLoginChange}
              value={loginData.password}
              placeholder="Enter your password..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
