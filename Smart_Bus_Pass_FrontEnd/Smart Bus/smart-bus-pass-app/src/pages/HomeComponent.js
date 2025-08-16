import React from "react";
import { useNavigate } from "react-router-dom";
import { FaIdBadge, FaShieldAlt, FaCity, FaBusAlt } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center min-h-screen bg-[#fdf4e3] dark:bg-[#121212] text-[#1b2a41] dark:text-white font-inter transition-colors duration-300">

      <section className="w-full flex flex-col items-center justify-center pt-32 px-4 text-center">
        <img
          src="/images/logo.png"
          alt="SmartBusPass Logo"
          className="w-28 h-28 mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/100x100/E0E0E0/A0A0A0?text=LOGO";
          }}
        />

        <h1 className="text-5xl md:text-6xl font-extrabold text-[#b02e2e] dark:text-[#ff6b6b] mb-3">
          SmartBusPass
        </h1>

        <p className="max-w-2xl text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
          Effortless travel with digital passes. Secure. Seamless. Smart.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-[#1b2a41] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-[#2e3e5e] transition duration-300 dark:bg-[#fa5541] dark:hover:bg-[#ff7667]"
          >
            Get Your Pass
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-white border-2 border-[#1b2a41] text-[#1b2a41] px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-[#1b2a41] hover:text-white transition duration-300 dark:border-[#fa5541] dark:text-[#fa5541] dark:hover:bg-[#fa5541] dark:hover:text-white"
          >
            Login
          </button>
        </div>
      </section>

      <section className="w-full mt-28 px-6 max-w-6xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1b2a41] dark:text-white">
          Why Choose SmartBusPass?
        </h2>
        <p className="text-lg opacity-80 mb-12 max-w-2xl mx-auto">
          We combine modern convenience with robust technology to revolutionize your daily commute.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaIdBadge className="text-5xl text-[#1b2a41] dark:text-[#ff6b6b] mb-3" />
            <h3 className="text-xl font-semibold mb-2">Digital Pass</h3>
            <p className="text-sm opacity-80">
              Generate contactless QR-based passes in seconds — no more paperwork.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-5xl text-[#1b2a41] dark:text-[#ff6b6b] mb-3" />
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-sm opacity-80">
              We use encrypted technology to keep your personal data safe.
            </p>
          </div>

          <div className="flex flex-col items-center bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow hover:shadow-lg transition">
            <MdOutlineSupportAgent className="text-5xl text-[#1b2a41] dark:text-[#ff6b6b] mb-3" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm opacity-80">
              Have a question? Our support team is always ready to assist you.
            </p>
          </div>
        </div>
      </section>

    
      <section className="w-full mt-28 px-4 max-w-6xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1b2a41] dark:text-white">
          Available in Your City
        </h2>
        <p className="text-lg opacity-80 mb-10">
          Expanding across India — now operational in:
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-5">
          {[
            "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Ahmedabad"
          ].map((city) => (
            <div
              key={city}
              className="flex flex-col items-center bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 w-36 hover:scale-105 transition"
            >
              <FaCity className="text-3xl text-[#1b2a41] dark:text-[#ff6b6b] mb-2" />
              <span className="font-medium">{city}</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default HomePage;
