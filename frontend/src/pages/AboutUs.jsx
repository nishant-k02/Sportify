import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1240px] mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-4xl font-bold text-center text-[#00df9a] mb-6">
          About Sportify
        </h1>
        <p className="text-lg leading-8 text-center mb-8">
          <span className="font-semibold">Sportify</span> is your go-to platform
          for discovering, booking, and experiencing the best sports events
          around you. Whether you’re a fan eager to catch the next big match or
          an organizer looking to promote your event, we connect the sports
          community like never before.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="shadow-lg p-6 rounded-lg bg-white">
            <h2 className="text-2xl font-bold text-[#00df9a]">Our Mission</h2>
            <p className="mt-4">
              To empower sports enthusiasts by providing personalized event
              recommendations and seamless booking experiences, fostering a
              vibrant and connected sports community.
            </p>
          </div>
          <div className="shadow-lg p-6 rounded-lg bg-white">
            <h2 className="text-2xl font-bold text-[#00df9a]">Our Vision</h2>
            <p className="mt-4">
              To become the leading sports event discovery platform, inspiring
              millions to participate, celebrate, and share their passion for
              sports—anywhere, anytime.
            </p>
          </div>
        </div>
        <div className="mt-12 bg-[#f3fdfb] rounded-lg shadow p-6 text-center">
          <h3 className="text-xl font-semibold text-[#00df9a] mb-2">
            Why Choose Sportify?
          </h3>
          <ul className="list-disc list-inside text-left max-w-xl mx-auto text-base text-gray-700">
            <li>
              Personalized recommendations for matches, tournaments, and
              activities based on your interests and location.
            </li>
            <li>
              Easy event discovery and ticket booking in just a few clicks.
            </li>
            <li>
              Stay updated with the latest sports events, news, and exclusive
              offers.
            </li>
            <li>
              Connect with fellow fans and organizers to share your sporting
              experiences.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
