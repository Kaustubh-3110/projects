import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-600/20 text-green-400 border-green-600/30",
    error: "bg-red-600/20 text-red-400 border-red-600/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`px-6 py-4 rounded-lg border backdrop-blur-md
                    shadow-lg animate-fadeIn
                    ${colors[type] || colors.success}`}
      >
        {message}
      </div>
    </div>
  );
}