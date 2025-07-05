import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from '../config/config';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${config.API_URL}/session`, {
          withCredentials: true,
        });
        if (response.data.sessionData) {
          setUser(response.data.sessionData);
        } else if (token) {
          setUser({ username: "Guest" });
        } else {
          setUser(null);
        }
      } catch (error) {
        if (token) {
          setUser({ username: "Guest" });
        } else {
          setUser(null);
        }
      }
    };
    checkAuth();
  }, [location.pathname]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${config.API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      localStorage.clear();
      setUser(null);
      alert("Logged out successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      localStorage.clear();
      setUser(null);
      navigate("/");
      window.location.reload();
      alert("Logged out successfully");
    }
  };

  const handleNav = () => setNav(!nav);

  // --- SEARCH BAR LOGIC --

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      // 1. Perform the search
      const res = await axios.post(
        `${config.API_URL}/apis/search`,
        { query: search },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 2. Update search results UI
      setSearchResults(res.data.results || []);
      setShowDropdown(true);

      // 3. Save to search history if user is logged in
      if (user?.username) {
        try {
          await axios.post(
            `${config.API_URL}/apis/history`,
            {
              username: user.username,
              query: search,
              results: res.data.results, // include full event details
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } catch (histError) {
          console.error("Failed to save search history:", histError);
        }
      }
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
      setShowDropdown(false);
      alert(err.response?.data?.error || "Search failed. Please try again.");
    }
  };

  const handleSelectResult = (eventId) => {
    setShowDropdown(false);
    setSearch("");
    setSearchResults([]);
    navigate(`/events/${eventId}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-black">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2">
          <FaTrophy className="text-[#00df9a] text-3xl drop-shadow" />
          <span className="text-2xl sm:text-3xl font-extrabold text-[#00df9a] tracking-tight">
            Sportify
          </span>
        </Link>

        {/* --- SEARCH BAR (Desktop only) --- */}
        <form
          className="hidden md:flex items-center relative mx-4"
          onSubmit={handleSearch}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00df9a] w-64"
            onFocus={() => setShowDropdown(!!searchResults.length)}
          />
          <button
            type="submit"
            className="bg-[#00df9a] text-white px-4 py-2 rounded-r font-semibold hover:bg-[#00c27d] transition"
          >
            Search
          </button>
          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 top-12 w-full bg-white border border-gray-200 rounded shadow-lg z-50">
              {searchResults.map((event) => (
                <div
                  key={event.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectResult(event.id)}
                >
                  <div className="font-bold">{event.title}</div>
                  <div className="text-sm text-gray-500">{event.location}</div>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 rounded hover:bg-[#00df9a]/10 transition"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/recommend"
              className="px-4 py-2 rounded hover:bg-[#00df9a]/10 transition"
            >
              Ask Sportify
            </Link>
          )}

          <Link
            to="/events"
            className="px-4 py-2 rounded hover:bg-[#00df9a]/10 transition"
          >
            Events
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 rounded hover:bg-[#00df9a]/10 transition"
          >
            About
          </Link>

          {/* <Link
            to="/contact"
            className="px-4 py-2 rounded hover:bg-[#00df9a]/10 transition"
          >
            Contact
          </Link> */}
          {user ? (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-gray-700">
                Hi, <b>{user.username}</b>
              </span>
              <Link to="/profile">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                  Profile
                </button>
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="ml-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Login
              </button>
            </Link>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[70%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500 z-50"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <div className="flex items-center gap-2 m-4">
          <FaTrophy className="text-[#00df9a] text-2xl" />
          <span className="text-2xl font-bold text-[#00df9a]">Sportify</span>
        </div>
        {/* Mobile Search Bar */}
        <form
          className="flex flex-col px-4 py-2"
          onSubmit={(e) => {
            handleSearch(e);
            setNav(false);
          }}
        >
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#00df9a] text-white px-4 py-2 rounded font-semibold hover:bg-[#00c27d] transition"
          >
            Search
          </button>
        </form>
        <div className="flex flex-col">
          <Link
            to="/"
            className="p-4 hover:bg-[#00df9a]/10"
            onClick={() => setNav(false)}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/recommend"
              className="px-4 py-2 rounded hover:bg-[#00df9a]/10 transition"
            >
              Ask Sportify
            </Link>
          )}
          <Link
            to="/services"
            className="p-4 hover:bg-[#00df9a]/10"
            onClick={() => setNav(false)}
          >
            Services
          </Link>
          <Link
            to="/about"
            className="p-4 hover:bg-[#00df9a]/10"
            onClick={() => setNav(false)}
          >
            About
          </Link>
          {/* <Link
            to="/contact"
            className="p-4 hover:bg-[#00df9a]/10"
            onClick={() => setNav(false)}
          >
            Contact
          </Link> */}
        </div>
        <div className="p-4">
          {user ? (
            <>
              <span className="block mb-2">
                Hi, <b>{user.username}</b>
              </span>
              <Link
                to="/profile"
                className="w-full block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-2 transition"
                onClick={() => setNav(false)}
              >
                Profile
              </Link>
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setNav(false);
                }}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="w-full block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              onClick={() => setNav(false)}
            >
              Login
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
