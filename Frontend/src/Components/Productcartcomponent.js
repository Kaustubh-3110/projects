import { FaHeart } from "react-icons/fa";

export default function Productcartcomponent({
  img,
  id,
  alreadyliked,
  cartproducts,
  setCartproducts,
  handlelike,
  title,
  price,
  category
}) {

  const cartItem = cartproducts?.find(item => item.id === id);

  const addToCart = () => {
    if (cartItem) {
      const updated = cartproducts.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartproducts(updated);
    } else {
      setCartproducts([
        ...cartproducts,
        { id: id, quantity: 1 }
      ]);
    }
  };

  const increaseQuantity = () => {
    const updated = cartproducts.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartproducts(updated);
  };

  const decreaseQuantity = () => {
    const updated = cartproducts
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);

    setCartproducts(updated);
  };

  return (
    <div className="group relative bg-[#141a22] border border-[#1f2a35] 
                    rounded-2xl overflow-hidden 
                    hover:border-[#00f5ff] 
                    hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]
                    transition duration-300 flex flex-col min-h-[420px]">

      {/* IMAGE CONTAINER (Uniform Size) */}
      <div className="relative aspect-square bg-[#0f141a] flex items-center justify-center overflow-hidden">

        <img
          src={img}
          alt={title}
          className="w-full h-full object-contain p-6 
                     group-hover:scale-110 transition duration-500"
        />

        {/* Heart */}
        <FaHeart
          size={18}
          className={`absolute top-4 right-4 cursor-pointer transition 
            ${alreadyliked 
              ? "text-red-500" 
              : "text-gray-500 hover:text-red-500"}`}
          onClick={() => handlelike(id)}
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">

        <p className="text-xs text-gray-400 uppercase tracking-widest">
          {category}
        </p>

        <h3 className="text-white font-semibold mt-2 line-clamp-2 min-h-[48px]">
          {title}
        </h3>

        <p className="text-[#00f5ff] font-bold mt-3 text-lg">
          ₹{price}
        </p>

        {/* BUTTON SECTION */}
        <div className="mt-auto pt-5">
          {cartproducts && !cartItem ? (
            <button
              onClick={addToCart}
              className="w-full bg-[#00f5ff] text-black font-semibold py-2.5 rounded-xl
                         hover:shadow-[0_0_20px_#00f5ff]
                         transition"
            >
              Add to Cart
            </button>
          ) : cartproducts ? (
            <div className="flex items-center justify-between bg-[#0f141a] 
                            rounded-xl p-2 border border-[#1f2a35]">

              <button
                onClick={decreaseQuantity}
                className="px-4 py-1 bg-[#141a22] text-white rounded-lg 
                           hover:bg-[#00f5ff] hover:text-black transition"
              >
                -
              </button>

              <span className="text-white font-semibold">
                {cartItem.quantity}
              </span>

              <button
                onClick={increaseQuantity}
                className="px-4 py-1 bg-[#141a22] text-white rounded-lg 
                           hover:bg-[#00f5ff] hover:text-black transition"
              >
                +
              </button>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}