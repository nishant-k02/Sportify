import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import config from '../config/config';

const SingleEvent = () => {
  const { id } = useParams();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null); // To store logged-in user info
  const [loading, setLoading] = useState(true);

  // Fetch event details
  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/apis/events/${id}`);
      setEvent(res.data);
      saveEventToHistory(res.data); // Save the event to history when it's loaded
    } catch (err) {
      console.error("Failed to fetch event", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch logged-in user info
  const fetchUser = async () => {
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

  // Save the event to user's history
  const saveEventToHistory = async (eventData) => {
    const token = localStorage.getItem("token");
    if (user && token) {
      try {
        await axios.post(
          `${config.API_URL}/apis/history/${user.username}`,
          { event: eventData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error saving event to history:", error);
      }
    }
  };

  // Submit review using logged-in username
  const submitReview = async () => {
    if (!user || !user.username || !comment.trim()) return;
    try {
      await axios.post(
        `${config.API_URL}/apis/events/${id}/review`,
        {
          reviewer: user.username,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComment("");
      fetchEvent(); // Refresh reviews
    } catch (err) {
      console.error("Review submission failed", err);
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchUser();
    // eslint-disable-next-line
  }, [id]);

  if (loading || !event)
    return <p className="text-center mt-10">Loading event...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#00df9a] mb-4">
          {event.title}
        </h1>
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

        <hr className="my-4" />
        <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
        <div className="space-y-3">
          {event.reviews && event.reviews.length > 0 ? (
            event.reviews.map((rev, idx) => (
              <div key={idx} className="p-3 border rounded bg-gray-100">
                <p>
                  <strong>{rev.reviewer}</strong>{" "}
                  <span className="text-sm text-gray-500">
                    ({new Date(rev.date).toLocaleString()})
                  </span>
                </p>
                <p>{rev.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Only show review form if logged in */}
        {user && user.username && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
            <div className="mb-2 text-gray-700">
              <span>
                Reviewing as <b>{user.username}</b>
              </span>
            </div>
            <textarea
              placeholder="Your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full mb-2"
              rows="4"
              required
            />
            <button
              onClick={submitReview}
              className="bg-[#00df9a] text-white px-4 py-2 rounded"
              disabled={!comment.trim()}
            >
              Submit Review
            </button>
          </div>
        )}
        {!user && (
          <div className="mt-6 text-red-500 font-semibold">
            Please{" "}
            <a href="/login" className="underline text-blue-600">
              log in
            </a>{" "}
            to leave a review.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SingleEvent;
