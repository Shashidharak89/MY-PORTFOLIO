"use client";

import React, { useState } from "react";
import ChatBox from "./ChatBox";
import "./styles/ChatWidget.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Chat popup */}
      {isOpen && (
        <div className="chat-popup">
          <ChatBox />
        </div>
      )}

      {/* Floating button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open support chat"
      >
        <span role="img" aria-label="Support Agent">
          👨‍💼
        </span>
      </button>
    </div>
  );
}
