import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

// Example recommended events (replace with dynamic data as needed)
const recommendedEvents = [
  {
    name: "Spring City Marathon",
    date: "April 27, 2025",
    location: "Central Park, NYC",
  },
  {
    name: "Downtown Football Cup",
    date: "May 10, 2025",
    location: "Stadium Arena, Dallas",
  },
  {
    name: "Summer Tennis Open",
    date: "June 15, 2025",
    location: "Riverside Courts, Chicago",
  },
];

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-4 gap-8">
      {/* Branding and Social */}
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">Sportify</h1>
        <p className="py-4">
          Discover, book, and experience the best sports events near you. Join
          our community and never miss a match!
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>

      {/* Event Recommendations */}
      <div>
        <h6 className="font-medium text-[#00df9a]">Recommended Events</h6>
        <ul>
          {recommendedEvents.map((event, idx) => (
            <li key={idx} className="py-2 text-sm">
              <span className="font-semibold">{event.name}</span>
              <br />
              <span className="text-gray-600">
                {event.date} &mdash; {event.location}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Standard Footer Links */}
      <div>
        <h6 className="font-medium">Support</h6>
        <ul>
          <li className="py-2 text-sm">Pricing</li>
          <li className="py-2 text-sm">Documentation</li>
          <li className="py-2 text-sm">Guides</li>
          <li className="py-2 text-sm">API Status</li>
        </ul>
      </div>
      <div>
        <h6 className="font-medium">Company</h6>
        <ul>
          <li className="py-2 text-sm">About</li>
          <li className="py-2 text-sm">Blog</li>
          <li className="py-2 text-sm">Jobs</li>
          <li className="py-2 text-sm">Press</li>
          <li className="py-2 text-sm">Careers</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
