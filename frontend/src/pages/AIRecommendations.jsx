import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const AIRecommendations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "👋 Hello! I'm CineX AI.\nAsk me anything about movies.",
    },
  ]);

  const suggestions = [
    "🔥 Movies like John Wick",
    "😂 Best Comedy Movies",
    "🚀 Sci-Fi Movies",
    "❤️ Romantic Movies",
    "😱 Horror Movies",
    "🎭 Telugu Movies",
    "🧠 Mind Bending Movies",
    "👨‍👩‍👧 Family Movies",
  ];
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userPrompt = prompt;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userPrompt,
      },
      {
        type: "loading",
      },
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/ai/recommend",
        {
          prompt: userPrompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessages((prev) => [
        ...prev.filter((msg) => msg.type !== "loading"),
        {
          type: "ai",
          text: `I found ${res.data.count} movies for you 🎬`,
          movies: res.data.recommendations,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((msg) => msg.type !== "loading"),
        {
          type: "ai",
          text: "❌ Unable to get recommendations.",
        },
      ]);
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar user={user} />

      <div className="max-w-6xl mx-auto pt-28 pb-10 px-6">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3">
            <FaRobot className="text-5xl text-red-600" />

            <h1 className="text-5xl font-extrabold">CineX AI Assistant</h1>
          </div>

          <p className="mt-4 text-gray-400 text-lg">
            Ask anything and get AI powered movie recommendations.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => setPrompt(item)}
              className="
bg-[#252525]
hover:bg-red-600
transition
px-5
py-3
rounded-full
"
            >
              {item}
            </button>
          ))}
        </div>
        <div
          className="
bg-[#1c1c1c]
rounded-3xl
p-6
h-[500px]
overflow-y-auto
"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-6 flex items-end gap-3 ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.type !== "user" && (
                <div
                  className="
w-11
h-11
rounded-full
bg-red-600
flex
items-center
justify-center
text-white
flex-shrink-0
"
                >
                  <FaRobot />
                </div>
              )}

              <div
                className={`

max-w-xl
px-5
py-4
rounded-2xl

${msg.type === "user" ? "bg-red-600" : "bg-[#2b2b2b]"}

`}
              >
                {msg.type === "loading" ? (
                  <div className="flex items-center gap-4">
                    <div
                      className="
w-12
h-12
rounded-full
bg-red-600
flex
items-center
justify-center
text-white
text-xl
"
                    >
                      <FaRobot />
                    </div>

                    <div
                      className="
bg-[#2b2b2b]
px-5
py-4
rounded-2xl
"
                    >
                      <p className="text-gray-300 mb-3">
                        CineX AI is thinking...
                      </p>

                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce"></div>

                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce [animation-delay:0.2s]"></div>

                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p>{msg.text}</p>

                    {msg.movies && (
                      <div className="grid md:grid-cols-2 gap-4 mt-5">
                        {msg.movies.map((movie) => (
                          <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="
bg-[#252525]
rounded-xl
overflow-hidden
cursor-pointer
transition-all
duration-300
hover:scale-105
hover:shadow-2xl
hover:shadow-red-600/20
"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                              alt={movie.title}
                              className="w-full h-72 object-cover"
                            />

                            <div className="p-4">
                              <h3 className="font-bold text-lg">
                                {movie.title}
                              </h3>

                              <p className="text-sm text-yellow-400 mt-1">
                                ⭐ {movie.rating}
                              </p>

                              <p className="text-sm text-gray-400 mt-3">
                                {movie.reason}
                              </p>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/movie/${movie.id}`);
                                }}
                                className="
mt-5
w-full
bg-red-600
hover:bg-red-700
py-2
rounded-lg
font-semibold
transition
"
                              >
                                🎬 View Details
                              </button>
                            </div>
                          </div>
                        ))}
                        
                      </div>
                    )}
                  </>
                )}
              </div>
              {msg.type === "user" && (
                <div
                  className="
w-11
h-11
rounded-full
bg-zinc-700
flex
items-center
justify-center
font-bold
flex-shrink-0
"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="mt-6 flex gap-4">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                sendMessage();
              }
            }}
            placeholder="Ask CineX AI..."
            className="
flex-1
bg-[#252525]
rounded-xl
px-5
py-4
outline-none
"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="
bg-red-600
px-6
rounded-xl
hover:bg-red-700
transition
disabled:opacity-50
disabled:cursor-not-allowed
"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
