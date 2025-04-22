import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Example submit handler (replace with your backend integration)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically POST to your backend API
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full py-16 text-black px-4 bg-gradient-to-br from-blue-50 to-green-100">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Want personalized sports event picks & insider tips?
          </h1>
          <p>
            Sign up for our newsletter and never miss the best matches,
            tournaments, and activities near you.
          </p>
        </div>
        <div className="my-4">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-between w-full"
            >
              <input
                className="p-3 flex w-full rounded-md text-black"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#1e90ff] text-white rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3 hover:bg-[#155fa0] transition"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-green-600 font-semibold text-center py-6">
              Thanks for subscribing! You’ll get the latest sports events and
              recommendations in your inbox.
            </div>
          )}
          <p className="text-sm mt-2">
            We care about the protection of your data. Read our{" "}
            <span className="text-[#1e90ff] underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
