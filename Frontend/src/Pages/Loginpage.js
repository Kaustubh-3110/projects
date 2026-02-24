import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Toast from "../Components/Toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("token/", {
        username,
        password,
      });

      login(response.data.access, response.data.refresh);

      setToast({ message: "Login successful!", type: "success" });

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setToast({ message: "Invalid username or password", type: "error" });
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

          <h1 className="text-3xl font-bold text-white mb-4">
            Login to <span className="text-[#00f5ff]">Voltix</span>
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
            className="w-full mb-6 px-4 py-3 bg-[#0f0f0f] border border-[#2a2a2a]
                       rounded-lg text-white focus:outline-none
                       focus:border-[#00f5ff] transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-[#00f5ff] text-black font-semibold rounded-lg
                       hover:shadow-[0_0_20px_#00f5ff] transition"
          >
            Login
          </button>

        </div>
      </div>
    </>
  );
}