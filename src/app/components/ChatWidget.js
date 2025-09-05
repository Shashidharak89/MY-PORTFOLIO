"use client";

import React, { useState, useRef, useEffect } from "react";
import { HiChatBubbleLeftRight, HiXMark } from "react-icons/hi2";
import ChatBox from "./ChatBox";
import "./styles/ChatWidget.css";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chatWidgetRef = useRef(null);

  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWidgetRef.current && !chatWidgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="portfolio-chat-widget" ref={chatWidgetRef}>
      {/* Chat popup container */}
      <div className={`portfolio-chat-popup-container ${isOpen ? 'portfolio-chat-active' : ''}`}>
        {isOpen && (
          <div className="portfolio-chat-popup">
            <div className="portfolio-chat-header">
              <div className="portfolio-chat-header-info">
                <div className="portfolio-chat-status-indicator"></div>
                <span className="portfolio-chat-header-title">Chat Support</span>
              </div>
              <button
                className="portfolio-chat-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <HiXMark />
              </button>
            </div>
            <ChatBox />
          </div>
        )}
      </div>

      {/* Floating toggle button */}
      <button
        className={`portfolio-chat-toggle-btn ${isOpen ? 'portfolio-chat-btn-active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
      >
        <div className="portfolio-chat-btn-icon">
          {isOpen ? <HiXMark /> : <HiChatBubbleLeftRight />}
        </div>
        {!isOpen && (
          <div className="portfolio-chat-notification-badge">
            <span className="portfolio-chat-badge-pulse"></span>
          </div>
        )}
      </button>
    </div>
  );
}