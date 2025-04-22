import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Mens Basketball",
  "Womens Basketball",
  "Street Race",
  "Wrestling",
  "Football",
];

const Event = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
    };

    checkLoginStatus(); // Check on component mount

    const fetchEvents = async () => {
      try {
        const categoryQuery =
          category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
        const res = await axios.get(
          `http://localhost:8000/apis/events${categoryQuery}`
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, [category]);

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-[#00df9a] mb-6">
        Events
      </h1>

      <div className="flex justify-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`mx-2 px-4 py-2 rounded ${
              category === cat ? "bg-[#00df9a] text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 pb-8">
        {events.map((event, idx) => (
          <div key={idx} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
              <strong>Time:</strong> {event.time}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Price:</strong> {event.price}
            </p>
            {isLoggedIn && (
              <div className="text-center">
                <Link to={`/events/${event.id}`}>
                  <button className="text-[#00df9a] font-bold text-lg mb-2">
                    Show Full Events
                  </button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Event;
