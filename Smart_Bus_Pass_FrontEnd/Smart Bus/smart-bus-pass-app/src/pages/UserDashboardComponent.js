import React, { useEffect, useState } from "react";
import BusPassCard from "../components/BusPassCard";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { farePrice } from "../config/farePrice";
import { formatDate } from "../config/formatDate";
import { capitalizeWords } from "../config/capitalizeWord";
import { generatePassPDF } from "../components/PassPdfGenerator";
import { useNavigate } from "react-router-dom"; 

const UserDashboardComponent = () => {
  const [passes, setPasses] = useState([]);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");
  const [showActivePasses, setShowActivePasses] = useState(true);
  const [selectedPass, setSelectedPass] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  console.log(token)

  const fetchPasses = async () => {
    if (!user?.userId || !token) {
      setError("User not logged in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/passes/user/${user.userId}/passes?isActive=${showActivePasses}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch passes");

      console.log(response.data)

      const data = await response.json();
      setPasses(data);
      setError("");
    } catch (err) {
      console.error("Error fetching passes:", err);
      setError("Failed to load passes");
    }
  };

  const fetchNotifications = async () => {
    if (!user?.userId || !token) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/notifications/user/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch notifications");

      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchPasses();
    fetchNotifications();

    const handleHashChange = () => {
      setCurrentView(
        window.location.hash === "/create-pass" ? "/create" : "/dashboard"
      );
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [showActivePasses]);

  const handleApplyNewPass = () => {
    navigate('/create-pass');
  };

  if (currentView === "create") {
    return (
      <div className="min-h-screen bg-white text-black p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Apply for New Pass</h2>
        <p className="text-gray-600">Redirecting to Create Pass Component...</p>
      </div>
    );
  }

  return (
    <>
  
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center blur-sm brightness-75 -z-10"
        style={{ backgroundImage: "url('/images/bus-image.jpg')" }}
      ></div>

      <div className="min-h-screen  bg-opacity-70 backdrop-blur-sm text-black p-6 relative z-10">
        <h2 className="text-4xl pt-12 font-extrabold mb-10 text-center tracking-wide text-zinc-200">
          Welcome, {capitalizeWords(user.fname)}!
        </h2>

       
        <div className="flex justify-between items-center mb-8 px-6">
          <div
            className={`text-l font-bold px-6 py-3 rounded-md shadow-md border-l-4 ${showActivePasses
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
              }`}
          >
            {showActivePasses ? "🟢 Your, Active Bus Passes!" : "🔴 Your, Inactive Bus Passes!"}
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold text-white">Status:</label>
            <select
              onChange={(e) => setShowActivePasses(e.target.value === "active")}
              value={showActivePasses ? "active" : "inactive"}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-gray-100 hover:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

       
        {notifications.length > 0 && showActivePasses && (
          <div className="bg-yellow-100 text-yellow-900 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 shadow-md">
            <h3 className="font-bold text-lg mb-2">⚠️ Expiry Notifications</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {notifications.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        
        {!error && passes.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No {showActivePasses ? "active" : "inactive"} passes found.
          </p>
        )}

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {passes.map((pass, index) => (
            <div
              key={index}
              onClick={() => setSelectedPass(pass)}
              className="cursor-pointer transform transition-transform hover:scale-105"
            >
              <BusPassCard pass={pass} />
            </div>
          ))}
        </div>

        
        <div className="mt-12 text-center">
          <button
            onClick={handleApplyNewPass}
            className="bg-yellow-500 hover:bg-yellow-600 px-10 py-3 rounded-xl font-semibold text-black shadow-lg transition duration-300"
          >
            ➕ Apply for New Pass
          </button>
        </div>

      
        {selectedPass && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSelectedPass(null)}
            ></div>
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white text-black w-[90%] max-w-4xl rounded-xl shadow-2xl flex flex-col md:flex-row p-6 relative">
                <button
                  className="absolute top-2 right-4 text-2xl font-bold text-gray-700 hover:text-red-600"
                  onClick={() => setSelectedPass(null)}
                >
                  ×
                </button>

               
                <div className="flex-1 pr-6 space-y-2">
                  <h3 className="text-2xl font-bold mb-4">🎫 Pass Details</h3>
                  <p><strong>Pass ID:</strong> {selectedPass.passId}</p>
                  <p><strong>Type:</strong> {selectedPass.passType}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        selectedPass.active
                          ? "text-green-700 font-semibold"
                          : "text-red-700 font-semibold"
                      }
                    >
                      {selectedPass.active ? "Approved ✅" : "Expired ❌"}
                    </span>
                  </p>
                  <p><strong>Valid From:</strong> {formatDate(selectedPass.issueDate)}</p>
                  <p><strong>Valid Until:</strong> {formatDate(selectedPass.expiryDate)}</p>
                  <p><strong>Route:</strong> {selectedPass.routeSource} to {selectedPass.routeDestination}</p>
                  
                  {selectedPass.distanceKm > 0 && (
                    <p><strong>Fare Price:</strong> ₹{selectedPass.distanceKm * farePrice}</p>
                  )}
                </div>

                
                <div className="flex flex-col items-center justify-center mt-6 md:mt-0 md:w-1/3">
                  <QRCodeDisplay data={selectedPass.qrCodeData} />
                  <button
                    onClick={() => generatePassPDF(selectedPass, farePrice)}
                    className="mt-4 px-4 py-2 bg-blue-700 text-white rounded shadow-md hover:bg-blue-800"
                  >
                    📥 Download Pass
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserDashboardComponent;
