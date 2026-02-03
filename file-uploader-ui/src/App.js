import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage(""); // Clear old messages when picking a new file
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/image/fileSystem", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage(" Success! File uploaded.");
        setUploadedFileName(selectedFile.name);
      } else {
        setMessage(" Upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(" Error connecting to server.");
    }
  };

  // --- STYLES (Simple CSS inside JS) ---
  const containerStyle = {
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)", // This creates the "Box" look
    textAlign: "center",
    width: "400px"
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  };

  const imgStyle = {
    marginTop: "20px",
    maxWidth: "100%",
    maxHeight: "300px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>File Uploader</h2>

        {/* Input Field */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
        <br />

        {/* Upload Button */}
        <button onClick={handleUpload} style={buttonStyle}>
          Upload Image
        </button>

        {/* Success/Error Message */}
        {message && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>}

        {/* Image Preview */}
        {uploadedFileName && (
          <div>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>Preview:</p>
            <img
              src={`http://localhost:8080/image/${uploadedFileName}`}
              alt="Uploaded content"
              style={imgStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
