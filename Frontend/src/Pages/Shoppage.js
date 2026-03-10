import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Productcartcomponent from "../Components/Productcartcomponent";

export default function Shoppage({
  products,
  likesproducts,
  setLikesproducts,
  cartproducts,
  setCartproducts
}) {

  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("category") || "all";
  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState("");

  // Sync state when URL changes
  useEffect(() => {
    setCategory(urlCategory);
  }, [urlCategory]);

  // Filter products
  let filtered =
    category === "all"
      ? [...products]
      : products.filter(
          item =>
            item.category?.toLowerCase() === category.toLowerCase()
        );

  // Sorting logic
  if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const handlelike = (id) => {
    if (likesproducts.includes(id)) {
      setLikesproducts(likesproducts.filter(num => num !== id));
    } else {
      setLikesproducts([...likesproducts, id]);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSearchParams({ category: value });
  };

  return (
    <section className="py-20 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE TITLE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">

          <h1 className="text-3xl md:text-4xl text-white font-bold">
            Shop <span className="text-[#00f5ff]">Voltix Gear</span>
          </h1>

          {/* FILTER CONTROLS */}
          <div className="flex gap-4">

            {/* CATEGORY FILTER */}
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-[#1a1a1a] text-white border border-[#2a2a2a] 
                         rounded-lg px-4 py-2 focus:outline-none 
                         focus:border-[#00f5ff] transition"
            >
              <option value="all">All Products</option>
              <option value="mouse">MOUSE</option>
              <option value="keyboard">KEYBOARD</option>
              <option value="monitor">MONITOR</option>
              <option value="laptop">LAPTOP</option>
              <option value="headphones">HEADPHONES</option>
              <option value="pc">PC</option>
              <option value="chair">CHAIR</option>
              <option value="controlar">CONTROLLER</option>
            </select>

            {/* SORT BY PRICE */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#1a1a1a] text-white border border-[#2a2a2a] 
                         rounded-lg px-4 py-2 focus:outline-none 
                         focus:border-[#00f5ff] transition"
            >
              <option value="">Sort by Price</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filtered.map((item) => (
            <Productcartcomponent
              key={item.id}
              img={item.image}
              id={item.id}
              alreadyliked={likesproducts.includes(item.id)}
              title={item.title}
              price={item.price}
              category={item.category}
              handlelike={handlelike}
              cartproducts={cartproducts}
              setCartproducts={setCartproducts}
            />
          ))}
        </div>

      </div>
    </section>
  );
}