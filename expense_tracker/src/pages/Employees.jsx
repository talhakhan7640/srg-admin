import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebaseConfig";
import { DataGrid } from "@mui/x-data-grid";
import ReactTooltip from "react-tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Modal } from "@mui/material";
import UpdateUserForm from "../components/UpdateUserForm";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router-dom";
import AddUserForm from "../components/AddUserForm";

const Employees = () => {

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const [userData, setUserData] = useState({});
  const [rowModesModel, setRowModesModel] = useState({});

  const [open, setOpen] = React.useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddUserClose = () => setOpenAddUser(false);
  // Fetching data from Users collection and storing it into employees state.
  useEffect(() => {
    fetchEmployees(db);
  }, []);

  async function fetchEmployees(db) {
    const usersCol = collection(db, "Users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    setRows(userList);
  }

  const handleAddUser = () => {
    setOpenAddUser(true);
  };

  const handleOpen = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setOpen(true);
    setUserData(rows[id].data);
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    var colID = rows[id].data.First_Name + "-" + rows[id].data.Last_Name;
    const url = "http://localhost:5000/users/update-user/";
  };

  const handleDeleteClick = (id) => async () => {
    setRows(rows.filter((row) => row.id !== id));
    console.log("Del button got pressed");
    var colID = rows[id].data.First_Name + "-" + rows[id].data.Last_Name;
    const url = "http://localhost:5000/users/delete-user/";
    await fetch(url + colID, {
      method: "DELETE",
    }, window.location.reload());
    
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    {
      field: "First_Name",
      headerName: "First name",
      width: 130,
      editable: true,
    },
    { field: "Last_Name", headerName: "Last name", width: 130, editable: true },
    {
      field: "Mobile_Number",
      headerName: "Mobile Number",
      width: 150,
      editable: true,
    },
    {
      field: "Alternate_Mobile_Number",
      headerName: "Alternate Mobile Number",
      width: 190,
      editable: true,
    },

    { field: "Address", headerName: "Address", width: 420, editable: true },

    {
      field: "Username",
      headerName: "Username",
      width: 150,
      editable: true,
    },

    {
      field: "Password",
      headerName: "Password",
      width: 150,
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            // <GridActionsCellItem
            //   icon={<SaveIcon />}
            //   label="Save"
            //   onClick={handleSaveClick(id)}
            // />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleOpen(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  var employees = [];

  rows.forEach((item) => {
    item.data["id"] = rows.indexOf(item);
    employees.push(item.data);
  });

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      className="user-table py-2 px-2 lg:py-8 lg:px-8"
    >
      {/* Modal for updating user */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "50%" }}
        className=" mx-auto mt-40"
      >
        <Box>
          <UpdateUserForm userData={userData} />
        </Box>
      </Modal>

      {/* Modal for Adding user */}
      <Modal
        open={openAddUser}
        onClose={handleAddUserClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "50%" }}
        className=" mx-auto mt-40"
      >
        <Box>
          <AddUserForm />
        </Box>
      </Modal>

      <div className="component-name text-white flex justify-between">
        <h1 className=" text-2xl font-medium my-auto">
          <span className="component-number  mr-6 p-1">~</span>
          Employee Table
        </h1>

        <div>
          <button
            data-tip="Add User"
            className="add-user px-3 "
            onClick={handleAddUser}
          >
            +
          </button>
          <ReactTooltip />
        </div>
      </div>
      <DataGrid
        style={{ height: "90%" }}
        sx={{
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
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
            color: "white",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#262B34",
            border: "none",
          },
          "& .MuiTablePagination-root": {
            color: "white",
          },
        }}
        rows={employees}
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
