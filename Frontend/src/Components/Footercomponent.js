export default function Footercomponent() {
    return (
        <footer className="bg-[#0f0f0f] border-t border-[#1f1f1f] mt-20">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid md:grid-cols-3 gap-10 text-gray-400 text-sm">

                    {/* BRAND */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#00f5ff] mb-4">
                            VOLTIX
                        </h2>
                        <p>
                            Premium gaming gear for players who demand performance.
                            Built for speed. Designed for dominance.
                        </p>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Quick Links
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="hover:text-[#00f5ff] cursor-pointer transition">
                                Home
                            </p>
                            <p className="hover:text-[#00f5ff] cursor-pointer transition">
                                Shop
                            </p>
                            <p className="hover:text-[#00f5ff] cursor-pointer transition">
                                About
                            </p>
                            <p className="hover:text-[#00f5ff] cursor-pointer transition">
                                Contact
                            </p>
                        </div>
                    </div>

                    {/* SOCIAL */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Connect
                        </h3>
                        <div className="flex flex-col gap-2">
                            <a
                                href="#"
                                className="hover:text-[#00f5ff] transition"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                className="hover:text-[#00f5ff] transition"
                            >
                                Twitter
                            </a>
                            <a
                                href="#"
                                className="hover:text-[#00f5ff] transition"
                            >
                                Discord
                            </a>
                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="border-t border-[#1f1f1f] mt-10 pt-6 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Voltix. All rights reserved.
                </div>

            </div>

        </footer>
    );
}