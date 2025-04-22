import React from "react";
import Laptop from "../assets/laptop.jpg"; // You can replace this with a sports-related image if you have one

function Analytics() {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 items-center">
        <img
          className="w-[500px] mx-auto my-4 rounded-lg shadow-lg"
          src={Laptop}
          alt="Sports Analytics Dashboard"
        />
        <div className="flex flex-col justify-center">
          <p className="text-blue-600 font-bold uppercase tracking-wider">
            Event Analytics Dashboard
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Track & Analyze Sports Events Effortlessly
          </h1>
          <p className="text-gray-700">
            Get real-time insights into trending sports events, participant
            engagement, and audience preferences. Our analytics dashboard helps
            you discover the most popular matches, monitor ticket sales, and
            optimize your event experience. Whether you're a fan or an
            organizer, make data-driven decisions and never miss out on the
            action!
          </p>
          <button className="bg-blue-600 text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 hover:bg-blue-700 transition">
            Explore Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
