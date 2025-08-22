import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import FootballClinic from "./pages/FootballTrial.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <FootballClinic />
            </Layout>
          }
        />
        <Route
          path="/football-clinic"
          element={
            <Layout>
              <FootballClinic />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <FootballClinic />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
