import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    profilePic: "",
  });

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setRegistrationData((formData) => ({
      ...formData,
      profilePic: e.target.files[0],
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in registrationData) {
        data.append(key, registrationData[key]);
      }

      const response = await axios.post("http://localhost:8000/signup", data);

      if (response.data.success) {
        alert("Registered Successfully!");
        navigate("/login");
      } else {
        console.log("User Already Exists!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Bad request: Missing or invalid fields");
      } else if (error.response && error.response.status === 409) {
        alert("User with this email already exists!");
      } else {
        alert("Error: Failed to connect to server");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Registration
        </h2>
        <form
          encType="multipart/form-data"
          onSubmit={handleRegistrationSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleRegistrationChange}
              value={registrationData.username}
              placeholder="Enter your username..."
              required
            />
          </div>
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
              onChange={handleRegistrationChange}
              value={registrationData.email}
              placeholder="Enter your email..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleRegistrationChange}
              value={registrationData.phone}
              placeholder="Enter your phone number..."
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
              onChange={handleRegistrationChange}
              value={registrationData.password}
              placeholder="Enter your password..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role:
            </label>
            <select
              name="role"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleRegistrationChange}
              required
            >
              <option value="">Select Role</option>
              <option value="0">User</option>
              <option value="1">Admin</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="profilePic"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture (DP):
            </label>
            <input
              type="file"
              name="profilePic"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Click here to login!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
