// src/components/UI/TypeWriter.jsx
import { useState, useEffect } from "react";
import useDarkMode from "@/hooks/useDarkMode";

export default function TypeWriter({ text = "", speed = 120 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!text || typeof text !== "string") return; // aman dari undefined
    setDisplayedText(""); // reset setiap kali text berubah
    setIsComplete(false);

    let index = 0;
    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
        return;
      }
      const char = text[index];
      if (char !== undefined) {
        setDisplayedText((prev) => prev + char);
      }
      index++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const cursorColor = theme === "dark" ? "text-pink-400" : "text-purple-600";

  return (
    <span className="relative">
      <span
        className={`transition-all duration-500 ease-in-out ${
          isComplete
            ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-400"
            : ""
        }`}
        style={{
          backgroundImage: isComplete
            ? theme === "dark"
              ? "linear-gradient(to right, #ec4899, #06b6d4)"
              : "linear-gradient(to right, #7c3aed, #06b6d4)"
            : "none",
          color: isComplete
            ? undefined
            : theme === "dark"
            ? "#e0e7ff"
            : "#1f2937",
        }}
      >
        {displayedText}
      </span>
      {!isComplete && (
        <span className={`absolute animate-blink ${cursorColor} ml-1`}>|</span>
      )}
    </span>
  );
}
