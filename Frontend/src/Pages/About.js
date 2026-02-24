export default function Aboutpage() {
    return (
        <div className="min-h-screen bg-[#0f0f0f] px-6 py-16 flex items-center justify-center">

            <div className="max-w-4xl text-center">

                <h1 className="text-4xl font-bold text-white mb-6">
                    About <span className="text-[#00f5ff]">Voltix</span>
                </h1>

                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                    Voltix is a modern gaming gear marketplace built for performance-driven players.
                    From high-speed mechanical keyboards to immersive headsets and precision gaming mice,
                    we deliver technology that powers your competitive edge.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">

                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                        <h3 className="text-[#00f5ff] font-semibold text-lg mb-2">
                            Performance First
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Every product is selected for speed, durability, and competitive advantage.
                        </p>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                        <h3 className="text-[#00f5ff] font-semibold text-lg mb-2">
                            Gamer Focused
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Designed for real players who demand precision and reliability.
                        </p>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                        <h3 className="text-[#00f5ff] font-semibold text-lg mb-2">
                            Future Ready
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Built with modern web technologies for a seamless shopping experience.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}