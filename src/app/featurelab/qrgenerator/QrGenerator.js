"use client";

import React, { useState } from "react";

export default function QrGenerator() {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generateQr = () => {
    if (!url) return;
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      url
    )}`;
    setQrUrl(apiUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 rounded-md text-black w-72 mb-4"
      />

      <button
        onClick={generateQr}
        className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
      >
        Generate QR
      </button>

      {qrUrl && (
        <div className="mt-6 flex flex-col items-center">
          <img src={qrUrl} alt="Generated QR Code" className="border p-2 bg-white rounded-md" />
          <a
            href={qrUrl}
            download="qrcode.png"
            className="mt-4 text-yellow-400 underline"
          >
            Download QR
          </a>
        </div>
      )}
    </div>
  );
}
