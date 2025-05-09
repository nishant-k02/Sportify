import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import Event from "./pages/Events";
import SingleEvent from "./pages/SingleEvent";
import AIRecommend from "./pages/AIRecommend";
import AdminDashboard from "./pages/AdminDashboard";
import DeleteComments from "./pages/DeleteComments";
import ManageUsers from "./pages/ManageUsers";

function App() {
  const token = localStorage.getItem("token");
  const [role, setRole] = React.useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);
  console.log("ROLE:", role);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/events" element={<Event />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/events/:id" element={<SingleEvent />} />
          <Route path="/recommend" element={<AIRecommend />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/delete-comments" element={<DeleteComments />} />
          <Route
            path="/admin"
            element={
              role === "1" ? <AdminDashboard /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/signup"
            element={!token ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            index
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
