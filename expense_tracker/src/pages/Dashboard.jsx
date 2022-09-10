import React from "react";
import AddUserForm from "../components/AddUserForm";
import AddVehicleForm from "../components/AddVehicleForm";
import UsersTable from "../components/UserTable";

function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-7 xl:grid-flow-row">
      <div className="col-span-2 xl:col-span-1 xl:row-span-2">
          <div>
          <AddUserForm />
          </div>

          <div className="expense-grid">
          <UsersTable  />
          </div>
      </div>
      <div className="col-span-2 xl:col-span-1 xl:row-span-1">
        <div>
        <AddVehicleForm />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
