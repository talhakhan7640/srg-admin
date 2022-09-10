import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "./App.css";

function App({ children }) {
  return (
    <div className="App">
      <React.Fragment>
        <div className="grid grid-cols-7 gap-1">
          <div className="hidden md:block md:col-span-2 xl:col-span-1 ">
            <Sidebar />
          </div>

          <div className="hidden md:block md:col-span-5 xl:col-span-6">
            {children}
            <Outlet />
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
