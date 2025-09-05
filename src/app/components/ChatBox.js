"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { HiPaperAirplane } from "react-icons/hi2";
import "./styles/ChatBox.css";

export default function ChatBox() {
  const [name, setName] = useState("");
  const [storedName, setStoredName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const listEndRef = useRef(null);
  const socketRef = useRef(null);

  // helpers
  const scrollToBottom = () => listEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const upsertById = (arr, msg) => {
    const i = msg._id ? arr.findIndex(m => m._id === msg._id) : -1;
    if (i >= 0) {
      const copy = [...arr];
      copy[i] = { ...copy[i], ...msg };
      return copy;
    }
    // prevent dupes when socket echoes our own message
    if (msg._id && arr.some(m => m._id === msg._id)) return arr;
    return [...arr, msg];
  };

  // Format relative time
  const getRelativeTime = (timestamp) => {
    try {
      const now = new Date();
      const messageTime = new Date(timestamp);
      const diffInSeconds = Math.floor((now - messageTime) / 1000);

      if (diffInSeconds < 30) return "Just now";
      if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
      
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;
      
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}d ago`;
      
      return messageTime.toLocaleDateString();
    } catch {
      return "";
    }
  };

  // Load stored name
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("chatName") : "";
    if (saved) setStoredName(saved);
  }, []);

  // Fetch existing messages
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/support");
        const initial = Array.isArray(res.data) ? res.data : [];
        // mark as sent for UI
        setMessages(initial.map(m => ({ ...m, status: "sent" })));
        setTimeout(scrollToBottom, 0);
      } catch (e) {
        console.error("Fetch messages failed", e);
      }
    })();
  }, []);

  // Socket setup (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    socketRef.current = io(); // same-origin by default
    socketRef.current.on("newMessage", (msg) => {
      setMessages(prev => {
        const next = upsertById(prev, { ...msg, status: "sent" });
        return next;
      });
      setTimeout(scrollToBottom, 0);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Save name
  const handleSaveName = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("chatName", trimmed);
    setStoredName(trimmed);
  };

  // Send message (optimistic)
  const handleSend = async () => {
    const text = message.trim();
    if (!text || !storedName) return;

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const optimistic = {
      tempId,
      name: storedName,
      message: text,
      userid: "SH10001", // right-side alignment
      timestamp: new Date().toISOString(),
      status: "sending",
    };

    setMessages(prev => [...prev, optimistic]);
    setMessage("");
    setTimeout(scrollToBottom, 0);

    try {
      // send to API
      const res = await axios.post("/api/support", { name: storedName, message: text });
      const saved = res?.data?.newMessage || null;

      // mark as sent + attach _id so socket echo won't duplicate
      setMessages(prev =>
        prev.map(m => (m.tempId === tempId ? { ...m, ...saved, status: "sent" } : m))
      );

      // also emit for other clients (server also broadcasts, but this helps if your socket path differs)
      socketRef.current?.emit("sendMessage", { name: storedName, message: text });

    } catch (e) {
      console.error("Send failed", e);
      setMessages(prev =>
        prev.map(m => (m.tempId === tempId ? { ...m, status: "failed" } : m))
      );
    }
  };

  const handleRetry = async (tempId) => {
    const item = messages.find(m => m.tempId === tempId);
    if (!item) return;
    // set to sending again
    setMessages(prev => prev.map(m => (m.tempId === tempId ? { ...m, status: "sending" } : m)));
    try {
      const res = await axios.post("/api/support", { name: item.name, message: item.message });
      const saved = res?.data?.newMessage || null;
      setMessages(prev =>
        prev.map(m => (m.tempId === tempId ? { ...m, ...saved, status: "sent" } : m))
      );
      socketRef.current?.emit("sendMessage", { name: item.name, message: item.message });
    } catch (e) {
      setMessages(prev =>
        prev.map(m => (m.tempId === tempId ? { ...m, status: "failed" } : m))
      );
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!storedName) {
    // ask for name first
    return (
      <div className="portfolio-chatbox-name-container">
        <div className="portfolio-chatbox-name-box">
          <h3 className="portfolio-chatbox-name-title">Welcome! What is your name?</h3>
          <p className="portfolio-chatbox-name-subtitle">Enter your name to start chatting with our support team</p>
          <input
            type="text"
            className="portfolio-chatbox-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSaveName();
              }
            }}
          />
          <button 
            className="portfolio-chatbox-name-button"
            onClick={handleSaveName}
            disabled={!name.trim()}
          >
            Start Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-chatbox-container">
      <div className="portfolio-chatbox-messages">
        {messages.length === 0 ? (
          <div className="portfolio-chatbox-welcome">
            <p>👋 Hi {storedName}! How can we help you today?</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isAdmin = msg.userid === "ADMINSHASHI";
            const side = isAdmin ? "left" : "right";
            const showStatus = !isAdmin; // status/ticks only on user (right side)
            return (
              <div key={msg._id || msg.tempId || idx} className={`portfolio-chatbox-message ${side}`}>
                <div className="portfolio-chatbox-bubble">
                  <p className="portfolio-chatbox-msg-name">{msg.name}</p>
                  <p className="portfolio-chatbox-msg-text">{msg.message}</p>
                  <div className="portfolio-chatbox-meta-row">
                    <span className="portfolio-chatbox-time">{getRelativeTime(msg.timestamp)}</span>
                    {showStatus && (
                      <span className="portfolio-chatbox-status">
                        {msg.status === "sending" && <span className="portfolio-chatbox-spinner" aria-label="sending" />}
                        {msg.status === "sent" && <span className="portfolio-chatbox-tick" aria-label="sent">✓</span>}
                        {msg.status === "failed" && (
                          <button 
                            className="portfolio-chatbox-retry" 
                            onClick={() => handleRetry(msg.tempId)} 
                            title="Retry"
                          >
                            !
                          </button>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={listEndRef} />
      </div>

      <div className="portfolio-chatbox-input-container">
        <div className="portfolio-chatbox-input-wrapper">
          <textarea
            className="portfolio-chatbox-textarea"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
          />
          <button 
            className="portfolio-chatbox-send-button"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <HiPaperAirplane />
          </button>
        </div>
      </div>
    </div>
  );
}