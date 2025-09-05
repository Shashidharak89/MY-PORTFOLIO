"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./styles/AdminChatBox.css";

const socket = io("http://localhost:3000"); // adjust if backend hosted

// Helper function for time formatting
const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(timestamp)) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} wk${Math.floor(diff / 604800) > 1 ? "s" : ""} ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} mo ago`;
  return `${Math.floor(diff / 31536000)} yr ago`;
};

export default function AdminChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/support");
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };
    fetchMessages();
  }, []);

  // Live updates from socket
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const tempMsg = {
      _id: Date.now(),
      name: "SHASHIDHARA K [ADMIN]",
      message: input,
      userid: "ADMINSHASHI",
      timestamp: new Date().toISOString(),
      status: "sending",
    };

    setMessages((prev) => [...prev, tempMsg]);
    setInput("");
    setSending(true);

    try {
      await axios.post("/api/support", {
        name: "ADMIN",
        message: tempMsg.message,
        userid: "ADMINSHASHI",
      });

      setMessages((prev) =>
        prev.map((m) =>
          m._id === tempMsg._id ? { ...m, status: "sent" } : m
        )
      );
    } catch (err) {
      console.error("Error sending message", err);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === tempMsg._id ? { ...m, status: "failed" } : m
        )
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="admin-chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${
              msg.userid === "ADMINSHASHI" ? "right" : "left"
            }`}
          >
            <div className="bubble">
              <strong>{msg.name}</strong>
              <p>{msg.message}</p>
              <small>
                {formatTimeAgo(msg.timestamp)}{" "}
                {msg.status === "sending"
                  ? "⏳"
                  : msg.status === "sent"
                  ? "✔✔"
                  : msg.status === "failed"
                  ? "❌"
                  : ""}
              </small>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="input-form">
        <input
          type="text"
          placeholder="Type admin reply..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={sending}>
          Send
        </button>
      </form>
    </div>
  );
}
