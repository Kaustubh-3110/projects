import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get("orders/")
      .then(res => {
        const found = res.data.find(o => o.id === parseInt(id));
        setOrder(found);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
        Loading order...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-12">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Order <span className="text-[#00f5ff]">#{order.id}</span>
          </h1>

          <p className="text-gray-400 mt-2">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>
            <p className="text-gray-400 mb-2">Total Amount</p>
            <p className="text-2xl font-bold text-[#00f5ff]">
              ₹{order.total_price}
            </p>
          </div>

          <div>
            <p className="text-gray-400 mb-2">Payment Status</p>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
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

        {/* Items */}
        <h2 className="text-xl font-bold text-white mb-6">
          Order Items
        </h2>

        {order.items && order.items.length > 0 ? (
          <div className="space-y-6">
            {order.items.map(item => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="h-24 w-24 object-cover rounded-lg border border-[#2a2a2a]"
                />

                <div className="flex-1 text-center md:text-left">
                  <p className="text-white font-semibold text-lg">
                    {item.product.title}
                  </p>

                  <p className="text-gray-400 mt-1">
                    Price: ₹{item.price_at_time}
                  </p>

                  <p className="text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-[#00f5ff] font-bold text-lg">
                  ₹{Number(item.price_at_time) * item.quantity}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No items found.</p>
        )}

      </div>
    </div>
  );
}