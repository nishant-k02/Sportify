import React from "react";
import Navbar from "../components/Navbar";
import Analytics from "../components/Analytics";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <Cards />
      <Analytics />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
