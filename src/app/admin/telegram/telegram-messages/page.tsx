"use client";
import React, { useState } from "react";
import axios from "axios";
import api from "@/shared/api/instance.api";

const AdminTelegramMessages = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendMessage = async () => {
    try {
      await api.post("/telegram/send-message", {
        message,
        telegramid: 282039969,
      });
      setStatus("✅ Повідомлення відправлено!");
      setTimeout(() => {
        setStatus("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка при відправці!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Відправити повідомлення в Telegram</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введіть повідомлення..."
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={sendMessage}>Відправити</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AdminTelegramMessages;
