import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebaseConfig";
import { DataGrid } from "@mui/x-data-grid";

// var serviceAccount = require("/home/txlha/Downloads/expense-tracker01-32dd5-firebase-adminsdk-nmaqo-3e30632411.json")

const Employees = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses(db);
  }, []);

  async function fetchExpenses(db) {
    const expenseCol = collection(db, "expenses");
    const expenseSnapshot = await getDocs(expenseCol);
    const expenseList = expenseSnapshot.docs.map((doc) => doc.data());
    setExpenses(expenseList);
  }

  console.log(expenses)

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Expense", headerName: "Expense", width: 130 },
    { field: "Vehicle Number", headerName: "Vehicle Number", width: 130 },
    { field: "Cost", headerName: "Cost", width: 130 }
  ];

  var data = []

  expenses.forEach((element) => {
    element['id'] = expenses.indexOf(element);
    data.push(element); 
  });

  // console.log(data[0].Cost);

  return (
    <div
      style={{ height: "90%", width: "100%" }}
      className="expense-table py-2 px-2 lg:py-8 lg:px-8"
    >
      <div className="component-name text-white flex justify-between">
        <h1 className=" text-2xl font-medium">
          <span className="component-number  mr-6 p-1 bg">~</span>
           Expense Table
          </h1>

          <div className="text-white">end</div>
      </div>
      <DataGrid
        sx={{
          "& .MuiDataGrid-main": {
            color: "#ffffff",
            backgroundColor: "#262B34",
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .MuiSvgIcon-fontSizeSmall": {
            color: "white"
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#262B34",
            border: "none",
          },
          "& .MuiTablePagination-root": {
            color: "white",
          },
        }}
        rows={data}
        columns={columns}
        pageSize={13}
        rowsPerPageOptions={[13]}
        checkboxSelection
        className="expense-data-grid py-4 mt-4"
      />
    </div>
  );
};

export default Employees;
