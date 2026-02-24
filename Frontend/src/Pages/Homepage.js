import React from "react";
import Herocomponent from "../Components/Herocomponent";
import Category from "../Components/Category";
import Newarrivals from "../Components/Newarrivals";
import Productcartcomponent from "../Components/Productcartcomponent";

export default function Homepage({
  products,
  likesproducts,
  handlelike,
  cartproducts,
  setCartproducts
}) {
  return (
    <div className="bg-[#0b0f14] text-white min-h-screen">

      {/* HERO */}
      <Herocomponent />

      {/* CATEGORY SECTION */}
      <Category />

      {/* NEW ARRIVALS (you can redesign later) */}
      <Newarrivals />

      {/* FEATURED PRODUCTS SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-[#0b0f14] via-[#0e141c] to-[#0b0f14]">

        {/* Soft radial glow for premium depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.05),transparent_60%)] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-16 text-center tracking-wide">
            Featured{" "}
            <span className="text-[#00f5ff] drop-shadow-[0_0_8px_#00f5ff]">
              Gear
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((item) => (
              <Productcartcomponent
                key={item.id}
                img={item.image}
                id={item.id}
                alreadyliked={likesproducts.includes(item.id)}
                title={item.title}
                price={item.price}
                category={item.category || "General"}
                handlelike={handlelike}
                cartproducts={cartproducts}
                setCartproducts={setCartproducts}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}