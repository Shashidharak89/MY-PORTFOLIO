import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // your backend

export default function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // join support chat room
    socket.emit("join_support", { user_id: "lkkclqe4bd", sender_name: "Alice" });

    // listen for incoming messages
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // cleanup when component unmounts
    return () => {
      socket.off("newMessage");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const msgData = {
      sender_id: "Alice",
      message: newMessage,
    };

    // send to server
    socket.emit("sendMessage", msgData);

    // add immediately to UI
    setMessages((prev) => [...prev, { ...msgData, createdAt: new Date(), status: 1 }]);

    setNewMessage("");
  };

  return (
    <div className="chat-container" style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.sender_id}: </strong> {msg.message}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    background: "#111",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
    maxHeight: "300px",
  },
  message: {
    padding: "5px",
    margin: "5px 0",
    background: "#222",
    borderRadius: "5px",
  },
  inputContainer: {
    display: "flex",
    gap: "5px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #333",
    background: "#222",
    color: "#fff",
  },
  button: {
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};
