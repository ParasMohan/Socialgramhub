import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserFeed from "./pages/UserFeed";

function App() {
  return (
    <div className="App">
      <h1>Social Media User Feed</h1>
      <Routes>
        <Route path="/" element={<UserFeed />} />
        {/* Add more routes here if needed */}
      </Routes>
    </div>
  );
}

export default App;
