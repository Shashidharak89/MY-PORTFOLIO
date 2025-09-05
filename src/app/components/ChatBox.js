"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
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
      <div className="name-container">
        <div className="name-box">
          <h2>Enter Your Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <button onClick={handleSaveName}>Save</button>
        </div>
      </div>
    );
  }

  const formatTime = (iso) => {
    try {
      const d = new Date(iso);
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      return `${hh}:${mm}`;
    } catch { return ""; }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Live Support Chat</div>

      <div className="chat-messages">
        {messages.map((msg, idx) => {
          const isAdmin = msg.userid === "ADMINSHASHI";
          const side = isAdmin ? "left" : "right";
          const showStatus = !isAdmin; // status/ticks only on user (right side)
          return (
            <div key={msg._id || msg.tempId || idx} className={`chat-message ${side}`}>
              <div className="bubble">
                <p className="msg-name">{msg.name}</p>
                <p className="msg-text">{msg.message}</p>
                <div className="meta-row">
                  <span className="time">{formatTime(msg.timestamp)}</span>
                  {showStatus && (
                    <span className="status">
                      {msg.status === "sending" && <span className="spinner" aria-label="sending" />}
                      {msg.status === "sent" && <span className="tick" aria-label="sent">✓</span>}
                      {msg.status === "failed" && (
                        <button className="retry" onClick={() => handleRetry(msg.tempId)} title="Retry">!</button>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={listEndRef} />
      </div>

      <div className="chat-input">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
