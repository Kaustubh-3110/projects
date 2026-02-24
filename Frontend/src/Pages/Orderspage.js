import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Orderspage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("orders/")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            No <span className="text-[#00f5ff]">Orders</span> Yet
          </h2>
          <p className="text-gray-400">
            Your future gear purchases will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-12">

      <h1 className="text-3xl font-bold text-white mb-10 text-center">
        My <span className="text-[#00f5ff]">Orders</span>
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">

        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 cursor-pointer
                       hover:border-[#00f5ff] hover:shadow-[0_0_20px_#00f5ff20]
                       transition duration-300"
          >
            <div className="flex justify-between items-start flex-col md:flex-row gap-6">

              <div>
                <h2 className="font-bold text-xl text-white mb-3">
                  Order #{order.id}
                </h2>

                <div className="flex gap-3 mb-4 flex-wrap">
                  {order.items?.slice(0, 3).map(item => (
                    <img
                      key={item.id}
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-16 w-16 object-cover rounded-lg border border-[#2a2a2a]"
                    />
                  ))}
                </div>

                <p className="text-gray-400 text-sm">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-[#00f5ff]">
                  ₹{order.total_price}
                </p>

                <span
                  className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                    order.payment_status === "PAID"
                      ? "bg-green-600/20 text-green-400"
                      : order.payment_status === "FAILED"
                      ? "bg-red-600/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}