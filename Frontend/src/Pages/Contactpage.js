import { useState } from "react";
import axios from "../api/axiosConfig";

export default function Contactpage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("contact/", {
        name,
        email,
        message
      });

      alert("Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="h-[80vh] flex justify-center items-center bg-[#0f0f0f]">
      <div className="max-w-md w-full bg-[#1a1a1a] p-8 rounded-xl shadow-xl">

        <h1 className="text-2xl text-white font-bold text-center mb-6">
          Contact Us
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 mb-4 bg-black text-white border border-gray-700 rounded"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full p-2 mb-4 bg-black text-white border border-gray-700 rounded"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="w-full p-2 mb-4 bg-black text-white border border-gray-700 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#00f5ff] text-black font-semibold py-2 rounded"
        >
          Send Message
        </button>

      </div>
    </div>
  );
}