import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Mouse",
      value: "mouse",
      img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Keyboard",
      value: "keyboard",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Controller",
      value: "controlar",
      img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Headset",
      value: "headphones",
      img: "https://images.unsplash.com/photo-1585386959984-a41552262b48?auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Chair",
      value: "chair",
      img: "https://images.unsplash.com/photo-1598300056289-6b17ff4b14e7?auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0b0f14] via-[#0e141c] to-[#0b0f14]">
      <div className="relative max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-16 text-center tracking-wide">
          Shop by{" "}
          <span className="text-[#00f5ff] drop-shadow-[0_0_8px_#00f5ff]">
            Category
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/shoppage?category=${item.value}`)}
              className="group bg-[#141a22] border border-[#1f2a35] 
                         rounded-2xl p-6 flex flex-col items-center 
                         hover:border-[#00f5ff] 
                         hover:shadow-[0_0_25px_rgba(0,245,255,0.15)]
                         transition duration-300 cursor-pointer"
            >
              <div className="w-full h-32 flex items-center justify-center 
                              overflow-hidden rounded-xl bg-[#0f141a]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover 
                             group-hover:scale-110 
                             transition duration-500"
                />
              </div>

              <p className="mt-6 text-gray-300 text-sm tracking-wide 
                            group-hover:text-[#00f5ff] transition">
                {item.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}