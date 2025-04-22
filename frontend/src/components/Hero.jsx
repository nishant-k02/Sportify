import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="text-black bg-gradient-to-br from-blue-50 to-green-100 min-h-screen flex items-center">
      <div className="max-w-[800px] mx-auto text-center flex flex-col justify-center w-full">
        <p className="text-[#1e90ff] font-bold p-2 text-lg tracking-wide uppercase">
          Your Personalized Sports Event Guide
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-extrabold md:py-6 text-gray-900">
          Discover Sports Events You'll Love
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-3xl sm:text-2xl text-lg font-semibold py-4 text-gray-700">
            Get recommendations for matches, tournaments, and activities near
            you—tailored to your interests and location.
          </p>
        </div>
        <p className="md:text-2xl text-xl font-medium text-gray-600">
          From football and cricket to marathons and e-sports, never miss an
          event again. Start exploring and book your next experience!
        </p>
        <button className="bg-[#1e90ff] hover:bg-[#155fa0] transition w-[220px] rounded-md font-medium my-8 mx-auto py-3 text-white text-lg shadow-lg">
          <Link to="/events">Find My Events</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
