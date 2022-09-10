import React, {useState, useEffect} from "react";
import "./ExpenseTable.css";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebaseConfig";


const UsersTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees(db);
  }, []);

  async function fetchEmployees(db) {
    const usersCol = collection(db, "Users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    setEmployees(userList);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "First_Name", headerName: "First name", width: 130 },
    { field: "Last_Name", headerName: "Last name", width: 130 },
    {
      field: "Mobile_Number",
      headerName: "Mobile Number",
      width: 130,
      type: "number",
    },
    {
      field: "Alternate_Mobile_Number",
      headerName: "Alternate Mobile Number",
      width: 190,
      type: "number",
    },

    { field: "Address", headerName: "Address", width: 380, },

    {
      field: "Username",
      headerName: "Username",
      width: 100,
    },
    
    {
      field: "Password",
      headerName: "Password",
      width: 150
    }
  ];

  var data = []

  employees.forEach((item) => {
    item.data['id'] = employees.indexOf(item);
      data.push(item.data)
})

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }} className="expense-table py-2 px-2 lg:py-8 lg:px-8">
      <div className="component-name text-white">
        <h1 className=" text-2xl font-medium">
          <span className="component-number  mr-6 p-1 bg">3</span>
          Quick Employee Column
          </h1>
      </div>
      <DataGrid
        sx={{
          
          "& .MuiDataGrid-main": {
            color: "#ffffff",
            backgroundColor: "#262B34",
            outline: "none"
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
          "& .MuiDataGrid-footerContainer" : {
            backgroundColor: "#262B34",
            border: "none"
          },
          "& .MuiTablePagination-root" : {
            color: "white"
          },
        }}
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        className="expense-data-grid py-4 mt-4"
      />
    </div>
  );
};

export default UsersTable;
