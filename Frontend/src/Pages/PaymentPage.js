import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { useState } from "react";
import Toast from "../Components/Toast";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // ✅ MUST be inside component

  const handlePayment = async (status) => {
    try {
      setLoading(true);

      await axios.post(`orders/${id}/payment/`, {
        payment_status: status
      });

      if (status === "PAID") {
        setToast({ message: "Payment Successful!", type: "success" });
      } else {
        setToast({ message: "Payment Failed!", type: "error" });
      }

      setTimeout(() => {
        navigate("/orders");
      }, 1200); // small delay so user sees toast

    } catch (error) {
      console.error(error);
      setToast({ message: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔔 Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-6">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-10 w-full max-w-md text-center shadow-xl">

          <h1 className="text-3xl font-bold text-white mb-4">
            Secure <span className="text-[#00f5ff]">Payment</span>
          </h1>

          <p className="text-gray-400 mb-8">
            Order ID: <span className="text-white font-semibold">#{id}</span>
          </p>

          <div className="space-y-4">

            <button
              disabled={loading}
              onClick={() => handlePayment("PAID")}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg
                         hover:bg-green-500 hover:shadow-[0_0_20px_#22c55e]
                         transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Simulate Success"}
            </button>

            <button
              disabled={loading}
              onClick={() => handlePayment("FAILED")}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg
                         hover:bg-red-500 hover:shadow-[0_0_20px_#ef4444]
                         transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Simulate Failure"}
            </button>

          </div>

          <p className="text-gray-500 text-sm mt-6">
            This is a payment simulation for academic demonstration.
          </p>

        </div>
      </div>
    </>
  );
}