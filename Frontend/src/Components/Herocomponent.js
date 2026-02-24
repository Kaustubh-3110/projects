import { useNavigate } from "react-router-dom";

export default function Herocomponent() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0f14] via-[#0e141c] to-[#0b0f14]">

      {/* Main ambient glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] 
                      bg-[#00f5ff]/10 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] 
                      bg-purple-600/10 blur-[180px] rounded-full"></div>

      {/* Subtle radial center highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.08),transparent_65%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Dominate Every{" "}
            <span className="text-[#00f5ff] drop-shadow-[0_0_12px_#00f5ff]">
              Game
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Experience next-level precision with high-performance gaming gear 
            engineered for serious players and competitive dominance.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/shoppage")}
              className="px-8 py-3 bg-[#00f5ff] text-black font-semibold rounded-xl
                         hover:shadow-[0_0_25px_#00f5ff]
                         transition duration-300"
            >
              Explore Gear
            </button>

            <button
              onClick={() => navigate("/product")}
              className="px-8 py-3 border border-[#1f2a35] text-white rounded-xl
                         hover:border-[#00f5ff]
                         hover:text-[#00f5ff]
                         transition duration-300"
            >
              View Products
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:justify-end">

          {/* Subtle image glow */}
          <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] 
                          bg-[#00f5ff]/5 blur-[120px] rounded-full"></div>

          <img
            src="https://www.pngmart.com/files/16/Light-Gaming-Keyboard-PNG-File.png"
            alt="Gaming Keyboard"
            className="relative w-[280px] md:w-[450px] 
                       drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]
                       hover:scale-105 transition duration-500"
          />
        </div>

      </div>
    </section>
  );
}