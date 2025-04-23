import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  // eslint-disable-next-line
  const [city, setCity] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityAndEvents = async () => {
      try {
        // const locationRes = await axios.get(
        //   "http://localhost:8000/apis/location"
        // );
        // const userCity = locationRes.data.city;
        // setCity(userCity);

        const eventsRes = await axios.get("http://localhost:8000/apis/events");
        const allEvents = eventsRes.data;

        const cityEvents = allEvents.filter(
          (event) => event.location.toLowerCase() //includes(userCity.toLowerCase())
        );

        setEvents(cityEvents);
      } catch (error) {
        console.error("Error fetching city or events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityAndEvents();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/events/${id}`);
  };

  const displayedEvents = showAll ? events : events.slice(0, 3);

  return (
    <div className="w-full py-[6rem] px-4 bg-white">
      <h1 className="text-5xl font-bold text-center text-[#00df9a] mb-6">
        Sports Events {city && `in ${city}`}
      </h1>
      {events.length > 3 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#00df9a] text-white px-6 py-3 rounded-md font-medium hover:bg-[#00c27d] transition"
          >
            {showAll ? "Show Less Events" : "Show All Events"}
          </button>
        </div>
      )}
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading events...</p>
      ) : events.length > 0 ? (
        <div className="max-w-[1240px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300"
              >
                <h2 className="text-2xl font-bold text-center py-4">
                  {event.title}
                </h2>
                <div className="text-center mt-4">
                  <p className="py-2 text-lg">
                    <span className="font-semibold text-gray-900">Date:</span>{" "}
                    {event.date}
                  </p>
                  <p className="py-2 text-lg">
                    <span className="font-semibold text-gray-900">Time:</span>{" "}
                    {event.time}
                  </p>
                  <p className="py-2 text-lg">
                    <span className="font-semibold text-gray-900">
                      Location:
                    </span>{" "}
                    {event.location}
                  </p>
                </div>
                <button
                  onClick={() => handleViewDetails(event.id)}
                  className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white hover:bg-[#00c27d] transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No events found in your city.
        </p>
      )}
    </div>
  );
};

export default Cards;
