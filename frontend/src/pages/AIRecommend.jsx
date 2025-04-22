import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AIRecommend = () => {
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndRecommend = async () => {
      setLoading(true);
      try {
        const locRes = await axios.get("http://localhost:8000/apis/location");
        const userLocation = `${locRes.data.city}, ${locRes.data.region}`;

        const [eventsRes, historyRes] = await Promise.all([
          axios.get("http://localhost:8000/apis/ai/events"),
          axios.get("http://localhost:8000/apis/ai/history"),
        ]);

        const events = eventsRes.data;
        const history = historyRes.data;
        const latestSearch = history[0] || {};
        const searchQuery = latestSearch?.query || "";
        const clickedTitles =
          latestSearch?.results?.map((r) => r.title).join(", ") || "";

        const prompt = `
You are an AI assistant helping users choose local sports events.

User Location: ${userLocation}
Recent Search Query: ${searchQuery}
Events Clicked: ${clickedTitles}
Price Range: ${latestSearch?.priceRange || "any"}
Precise Location: ${latestSearch?.location || "any"}

Event List:
${events.map((e) => `- ${e.title} (${e.location}, ${e.price})`).join("\n")}

Use this info to recommend the 2 or 3 best events for the user with a short explanation.
`;

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: `Bearer your_openai_api_key`,
              "Content-Type": "application/json",
            },
          }
        );

        const aiMessage = response.data.choices[0].message.content;
        setRecommendation(aiMessage.trim());
      } catch (error) {
        console.error("AI recommendation failed:", error);
        setRecommendation("⚠️ Failed to generate recommendations.");
      }

      setLoading(false);
    };

    fetchAndRecommend();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-white via-[#f0fdfa] to-white py-20 px-6 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg p-8">
          <h2 className="text-4xl font-extrabold text-center text-[#00df9a] mb-6">
            🎯 AI Recommended Events
          </h2>

          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-t-[#00df9a] border-gray-300 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">
                Generating recommendations...
              </p>
            </div>
          ) : (
            <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">
              {recommendation}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIRecommend;
