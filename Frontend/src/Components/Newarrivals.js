export default function Newarrivals({ children }) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0b0f14] via-[#0f1620] to-[#0b0f14]">

      {/* Subtle side glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,245,255,0.05),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-wide">
            New{" "}
            <span className="text-[#00f5ff] drop-shadow-[0_0_8px_#00f5ff]">
              Arrivals
            </span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Fresh gear. Latest releases. Upgrade your setup with cutting-edge performance.
          </p>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {children}
        </div>

      </div>
    </section>
  );
}