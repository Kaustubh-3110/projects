import { FaSearch, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbarcomponents({ searchtext, setSearchText, Searchhandlar }) {
    const navigate = useNavigate();
    const { access, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#1f1f1f]">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LEFT - BRAND */}
                <h1
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold tracking-wide text-[#00f5ff] cursor-pointer drop-shadow-[0_0_6px_#00f5ff]"
                >
                    VOLTIX
                </h1>
                {/* DESKTOP SEARCH */}
                <div className="hidden lg:flex items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 w-[280px]">
                    <input
                        value={searchtext}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search gear..."
                        className="bg-transparent outline-none text-white flex-1 text-sm"
                    />
                    <FaSearch
                        onClick={Searchhandlar}
                        className="text-gray-400 hover:text-[#00f5ff] cursor-pointer transition"
                    />
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">

                    <p onClick={() => navigate("/")} className="hover:text-[#00f5ff] cursor-pointer transition">Home</p>
                    <p onClick={() => navigate("/shoppage")} className="hover:text-[#00f5ff] cursor-pointer transition">Shop</p>
                    <p onClick={() => navigate("/product")} className="hover:text-[#00f5ff] cursor-pointer transition">Products</p>
                    <p onClick={() => navigate("/orders")} className="hover:text-[#00f5ff] cursor-pointer transition">Orders</p>
                    <p onClick={() => navigate("/about")} className="hover:text-[#00f5ff] cursor-pointer transition">About</p>
                    <p onClick={() => navigate("/contact")} className="hover:text-[#00f5ff] cursor-pointer transition">Contact</p>

                    <IoMdCart onClick={() => navigate("/cart")} className="text-xl cursor-pointer hover:text-[#00f5ff] transition" />
                    <FaHeart onClick={() => navigate("/wishlist")} className="text-xl cursor-pointer hover:text-[#ff007a] transition" />

                    {!access ? (
                        <>
                            <p onClick={() => navigate("/login")} className="hover:text-[#00f5ff] cursor-pointer transition">Login</p>
                            <p onClick={() => navigate("/signup")} className="hover:text-[#00f5ff] cursor-pointer transition">Sign Up</p>
                        </>
                    ) : (
                        <p onClick={() => { logout(); navigate("/login"); }} className="hover:text-red-500 cursor-pointer transition">Logout</p>
                    )}
                </div>

                {/* MOBILE ICONS */}
                <div className="flex md:hidden items-center gap-4">

                    <IoMdCart onClick={() => navigate("/cart")} className="text-xl text-white cursor-pointer" />
                    <FaHeart onClick={() => navigate("/wishlist")} className="text-xl text-white cursor-pointer" />

                    {menuOpen ? (
                        <FaTimes
                            className="text-xl text-white cursor-pointer"
                            onClick={() => setMenuOpen(false)}
                        />
                    ) : (
                        <FaBars
                            className="text-xl text-white cursor-pointer"
                            onClick={() => setMenuOpen(true)}
                        />
                    )}
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            {menuOpen && (
                <div className="md:hidden bg-[#0f0f0f] border-t border-[#1f1f1f] px-6 py-6 space-y-4 text-gray-300 text-sm">

                    <p onClick={() => handleNavigate("/")} className="hover:text-[#00f5ff] cursor-pointer">Home</p>
                    <p onClick={() => handleNavigate("/shoppage")} className="hover:text-[#00f5ff] cursor-pointer">Shop</p>
                    <p onClick={() => handleNavigate("/product")} className="hover:text-[#00f5ff] cursor-pointer">Products</p>
                    <p onClick={() => handleNavigate("/orders")} className="hover:text-[#00f5ff] cursor-pointer">Orders</p>
                    <p onClick={() => handleNavigate("/about")} className="hover:text-[#00f5ff] cursor-pointer">About</p>
                    <p onClick={() => handleNavigate("/contact")} className="hover:text-[#00f5ff] cursor-pointer">Contact</p>

                    {!access ? (
                        <>
                            <p onClick={() => handleNavigate("/login")} className="hover:text-[#00f5ff] cursor-pointer">Login</p>
                            <p onClick={() => handleNavigate("/signup")} className="hover:text-[#00f5ff] cursor-pointer">Sign Up</p>
                        </>
                    ) : (
                        <p onClick={() => { logout(); handleNavigate("/login"); }} className="hover:text-red-500 cursor-pointer">Logout</p>
                    )}
                </div>
            )}
        </nav>
    );
}