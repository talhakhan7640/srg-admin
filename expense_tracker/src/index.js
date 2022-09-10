import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Employees from "./pages/Employees";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Layout from "./components/Layout";
import Vehicles from "./pages/Vehicles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard/dashboard-home" />} />
        <Route path="/dashboard">
          <Route index path="dashboard-home" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
					<Route path="expenses" element={<Expenses/>} />
          <Route path="vehicles" element={< Vehicles />} />
        </Route>
      </Routes>
    </App>
  </BrowserRouter>
);
