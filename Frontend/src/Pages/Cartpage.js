import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Cartpage({ cartproducts, setCartproducts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("products/")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const cartItems = cartproducts
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return product
        ? { ...product, quantity: cartItem.quantity }
        : null;
    })
    .filter(Boolean);

  const increaseQuantity = (id) => {
    const updated = cartproducts.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartproducts(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cartproducts
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartproducts(updated);
  };

  const removeItem = (id) => {
    const updated = cartproducts.filter((item) => item.id !== id);
    setCartproducts(updated);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      if (cartproducts.length === 0) {
        alert("Cart is empty");
        return;
      }

      const items = cartproducts.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      const response = await axios.post("orders/", { items });

      setCartproducts([]);

      navigate(`/payment/${response.data.id}`);

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to place order");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
        Loading cart...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-gray-400 text-xl">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-12">

      <h1 className="text-3xl font-bold text-white mb-10 text-center">
        Your <span className="text-[#00f5ff]">Cart</span>
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.image}
                alt={item.title}
                className="h-24 object-contain"
              />

              <div>
                <h3 className="text-white font-semibold text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-400 mt-1">
                  ₹{item.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">

              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-3 py-1 bg-[#2a2a2a] text-white rounded hover:bg-[#00f5ff] hover:text-black transition"
              >
                -
              </button>

              <span className="text-white font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-3 py-1 bg-[#2a2a2a] text-white rounded hover:bg-[#00f5ff] hover:text-black transition"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 text-red-500 hover:text-red-400 transition"
              >
                Remove
              </button>

            </div>
          </div>
        ))}

        <div className="text-right mt-10">
          <h2 className="text-2xl font-bold text-white">
            Total: <span className="text-[#00f5ff]">₹{totalPrice.toFixed(2)}</span>
          </h2>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 px-8 py-3 bg-[#00f5ff] text-black font-semibold rounded-lg hover:shadow-[0_0_20px_#00f5ff] transition"
          >
            Proceed to Payment
          </button>
        </div>

      </div>
    </div>
  );
}