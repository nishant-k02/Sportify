import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
     const [formData, setFormData] = useState({
       name: "",
       email: "",
       message: "",
     });

     const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       console.log("Form Data Submitted: ", formData);
       setFormData({ name: "", email: "", message: "" });
       alert("Your message has been sent successfully!");
     };
  return (
    <div>
      <Navbar />
      <div className="max-w-[1240px] mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-4xl font-bold text-center text-[#00df9a] mb-6">
          Contact Us
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-[600px] mx-auto bg-white p-6 shadow-lg rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#00df9a] text-white py-3 rounded-lg font-bold hover:bg-[#00c988]"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
