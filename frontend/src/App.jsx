import React from "react";
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

function App() {
  const token = localStorage.getItem("token");

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
