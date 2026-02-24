import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Toast from "../Components/Toast";

export default function Signuppage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async () => {

    if (password !== confirmPassword) {
      setToast({ message: "Passwords do not match", type: "warning" });
      return;
    }

    try {
      await axios.post("register/", {
        username,
        password
      });

      setToast({ message: "Account created successfully!", type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setToast({ message: "Signup failed", type: "error" });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-6">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-10 w-full max-w-md text-center shadow-xl">

          <h1 className="text-3xl font-bold text-white mb-6">
            Join <span className="text-[#00f5ff]">Voltix</span>
          </h1>

          <input
            className="w-full mb-4 px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a]
                       rounded-lg text-white focus:outline-none
                       focus:border-[#00f5ff] transition"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full mb-4 px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a]
                       rounded-lg text-white focus:outline-none
                       focus:border-[#00f5ff] transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="w-full mb-6 px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a]
                       rounded-lg text-white focus:outline-none
                       focus:border-[#00f5ff] transition"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full py-3 bg-[#00f5ff] text-black font-semibold rounded-lg
                       hover:shadow-[0_0_20px_#00f5ff] transition"
          >
            Sign Up
          </button>

        </div>
      </div>
    </>
  );
}