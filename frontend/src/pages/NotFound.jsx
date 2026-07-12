import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white px-6">
      <div className="text-center">

        <div className="w-24 h-24 rounded-full bg-[#E50914]/20 flex items-center justify-center mx-auto mb-6">
          <FaSearch className="text-4xl text-[#E50914]" />
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Movie Not Found
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Sorry! We couldn't find the movie you're looking for.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="bg-[#E50914] px-8 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Back to Home
        </button>

      </div>
    </div>
  );
};

export default NotFound;