import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.data?.sessionData) {
          const userData = response.data.sessionData;
          setUser(userData);
          setForm({
            username: userData.username,
            phone: userData.phone,
          });

          // Fetching search history based on user's username
          try {
            const histRes = await axios.get(
              `http://localhost:8000/apis/history/${userData.username}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // Check if the response is an array
            if (Array.isArray(histRes.data)) {
              setSearchHistory(histRes.data);
            } else {
              console.error("Invalid history data received");
              setSearchHistory([]);
            }
          } catch (histError) {
            console.error("Error fetching history:", histError);
            setSearchHistory([]);
          }
        }
      } catch (error) {
        console.error("Session error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchLocation = async () => {
      try {
        const locRes = await axios.get("https://ipapi.co/json/");
        setLocation({
          city: locRes.data.city,
          country: locRes.data.country_name,
          ip: locRes.data.ip,
        });
      } catch (e) {
        console.error("Location error:", e);
        setLocation(null);
      }
    };

    fetchSession();
    fetchLocation();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">
          User not found. Please log in.
        </div>
      </div>
    );
  }

  const profilePicUrl = user.profilePic
    ? `http://localhost:8000/images/profilePic/${user.profilePic}`
    : "https://ui-avatars.com/api/?name=" + user.username;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/updateProfile",
        { username: form.username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setEditMode(false);
        alert("Username updated!");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <img
              src={profilePicUrl}
              alt={user.username}
              className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-400"
            />

            {!editMode ? (
              <>
                <h2 className="text-2xl font-bold mb-2 capitalize">
                  {user.username}
                </h2>
                <p className="text-gray-700 mb-1">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Role:</strong> {user.role === "1" ? "Admin" : "User"}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>User ID:</strong> {user._id}
                </p>
                {location && (
                  <p className="text-gray-700 mb-1">
                    <strong>Location:</strong> {location.city},{" "}
                    {location.country} {/* ({location.ip}) */}
                  </p>
                )}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setEditMode(false)}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <p className="text-gray-400 text-xs mt-4">
              Profile loaded on: {new Date().toLocaleString()}
            </p>

            {/* Search History Section */}
            <div className="mt-6 w-full">
              <h3 className="text-lg font-semibold text-[#00df9a] mb-4">
                Search History
              </h3>
              {Array.isArray(searchHistory) && searchHistory.length === 0 ? (
                <p className="text-gray-500">No search history yet.</p>
              ) : (
                Array.isArray(searchHistory) &&
                searchHistory.map((entry, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 border rounded bg-gray-100"
                  >
                    <div className="mb-2 text-gray-700">
                      🔍 <strong>Search:</strong> {entry.query}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      ⏱️ {new Date(entry.timestamp).toLocaleString()}
                    </div>
                    {entry.results && entry.results.length > 0 ? (
                      <ul className="pl-4 list-disc text-sm text-gray-700">
                        {entry.results.map((event, idx) => (
                          <li key={idx} className="mb-1">
                            <strong>{event.title}</strong> - {event.location} (
                            {event.date} @ {event.time}) – {event.price}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No events found for this search.
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
