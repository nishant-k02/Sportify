import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Analytics from "../components/Analytics";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {/* Top Left Delete Comments Card */}
      <div className="max-w-[1240px] mx-auto mt-6 px-4">
        <div className="flex justify-start">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Admin Actions
            </h2>
            <button
              onClick={() => navigate("/admin/delete-comments")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Analytics and Cards below */}
      <div className="mt-10">
        <Cards />
        <Analytics />
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
