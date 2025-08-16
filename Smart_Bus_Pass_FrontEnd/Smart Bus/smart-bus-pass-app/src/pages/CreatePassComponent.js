import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePassComponent = () => {
  const [passType, setPassType] = useState("DAILY PASS");
  const [source, setSource] = useState("Swargate");
  const [destination, setDestination] = useState("Deccan Gymkhana");
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const sourceOptions = [
    "Swargate",
    "Shivaji Nagar",
    "Katraj",
    "Deccan Gymkhana",
  ];
  const destinationOptions = [
    "Swargate",
    "Shivaji Nagar",
    "Katraj",
    "Deccan Gymkhana",
  ];

  const handleCreatePass = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("User not logged in.");
      return;
    }

    if (passType === "STUDENT PASS" && studentId.trim() === "") {
      setError("Student ID is required for Student Pass.");
      return;
    }

    if (source === destination && passType !== "DAILY PASS") {
      setError("Source and destination cannot be the same.");
      return;
    }

    try {
     
      const orderRes = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        {
          amount: 50000, 
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderData = orderRes.data;
      if (!orderData?.id) throw new Error("Failed to create Razorpay order");

      const options = {
        key: "rzp_test_L7HYnrirPPoHUJ",
        amount: orderData.amount,
        currency: "INR",
        name: "Bus Pass App",
        description: "Pass Payment",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const passPayload = {
              passType,
              ...(passType === "STUDENT PASS" && { studentId }),
            };

            const src =
              passType === "DAILY PASS" ? "NA" : encodeURIComponent(source);
            const dst =
              passType === "DAILY PASS"
                ? "NA"
                : encodeURIComponent(destination);

            const passRes = await axios.post(
              `http://localhost:8080/api/passes/user/${userId}/route/${src}/${dst}`,
              passPayload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const passId = passRes.data.passId;

            const paymentData = {
              user: { user_id: userId },
              pass: { passId: passId },
              amount: 5000,
              payment_method: "RAZORPAY",
              transaction_id: response.razorpay_payment_id,
              payment_status: "SUCCESS",
            };

            await axios.post(
              "http://localhost:8080/api/payment/createPayment",
              paymentData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setMessage("Pass created and payment successful!");
            setError("");

            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } catch (err) {
            console.error("Pass/payment error", err);
            setError("Failed after payment: " + err.message);
            setMessage("");
          }
        },
        prefill: {
          name: user?.name || "Smart Bus Pass User",
          email: user?.email || "user@example.com",
          contact: user?.phone || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed", err);
      setError("Payment or pass creation failed: " + err.message);
      setMessage("");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
      <div className='bg-gray-800 p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Create Pass</h2>

        {message && (
          <p className='text-green-500 text-center mb-2'>{message}</p>
        )}
        {error && <p className='text-red-500 text-center mb-2'>{error}</p>}

        <div className='mb-4'>
          <label className='block mb-1'>Select Pass Type</label>
          <select
            value={passType}
            onChange={(e) => setPassType(e.target.value)}
            className='w-full px-3 py-2 bg-gray-700 rounded'
          >
            <option value='DAILY PASS'>Daily Pass</option>
            <option value='MONTHLY PASS'>Monthly Pass</option>
            <option value='STUDENT PASS'>Student Pass</option>
            <option value='SENIOR CITIZEN PASS'>Senior Citizen Pass</option>
          </select>
        </div>

        {passType === "STUDENT PASS" && (
          <div className='mb-4'>
            <label className='block mb-1'>Student ID</label>
            <input
              type='text'
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className='w-full px-3 py-2 bg-gray-700 rounded'
              placeholder='Enter your student ID'
              required
            />
          </div>
        )}

        {passType !== "DAILY PASS" && (
          <>
            <div className='mb-4'>
              <label className='block mb-1'>Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 rounded'
              >
                {sourceOptions.map((src, idx) => (
                  <option key={idx} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-6'>
              <label className='block mb-1'>Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 rounded'
              >
                {destinationOptions.map((dst, idx) => (
                  <option key={idx} value={dst}>
                    {dst}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <button
          onClick={handleCreatePass}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded'
        >
          Pay & Create Pass
        </button>
      </div>
    </div>
  );
};

export default CreatePassComponent;
