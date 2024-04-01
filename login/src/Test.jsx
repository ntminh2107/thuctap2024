import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  const [serverStatus, setServerStatus] = useState("");

  useEffect(() => {
    // Function to check server status
    const checkServerStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/check");
        setServerStatus(response.data.message);
      } catch (error) {
        setServerStatus("Error: Unable to connect to the server");
      }
    };

    // Call the function to check server status when the component mounts
    checkServerStatus();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <h1>Server Status:</h1>
      <p>{serverStatus}</p>
    </div>
  );
}

export default Test;
