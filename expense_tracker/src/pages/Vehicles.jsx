import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebaseConfig";
import { DataGrid } from "@mui/x-data-grid";
import ReactTooltip from "react-tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router-dom";
import AddVehicleForm from "../components/AddVehicleForm";
import UpdateVehicleForm from "../components/UpdateVehicleForm";

const Vehicles = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const [vehicleInformation, setVehicleInformation] = useState({});
  const [rowModesModel, setRowModesModel] = useState({});

  const [open, setOpen] = React.useState(false);
  const [openAddVehicle, setOpenAddVehicle] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddVehicleClose = () => setOpenAddVehicle(false);

  // Fetching data from Users collection and storing it into employees state.
  useEffect(() => {
    fetchVehicles(db);
  }, []);

  async function fetchVehicles(db) {
    const vehicleCol = collection(db, "Vehicles");
    const vehicleSnapshot = await getDocs(vehicleCol);
    const vehicleList = vehicleSnapshot.docs.map((doc) => doc.data());
    setRows(vehicleList);
  }

  const handleAddVehicle = () => {
    setOpenAddVehicle(true);
  };

  const handleOpen = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setOpen(true);
    setVehicleInformation(rows[id].data);
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    setRows(rows.filter((row) => row.id !== id));
    console.log("Del button got pressed");
    var colID = rows[id].data.Vehicle_Number;
    const url = "http://localhost:5000/vehicles//delete-vehicle-information/";
    await fetch(
      url + colID,
      {
        method: "DELETE",
      },
      window.location.reload()
    );
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
      field: "Vehicle_Number",
      headerName: "Vehicle Number",
      width: 150,
      editable: true,
    },
    {
      field: "RC_Registration_Date",
      headerName: "RC Registration Date",
      width: 180,
      editable: true,
    },
    {
      field: "RC_Expiration_Date",
      headerName: "RC Expiration Date",
      width: 180,
      editable: true,
    },
    {
      field: "PUC_Registration_Date",
      headerName: "PUC Registration Date",
      width: 180,
      editable: true,
    },

    { field: "PUC_Expiration_Date", headerName: "PUC Expiration Date", width: 180, editable: true },

    {
      field: "Insurance_Registration_Date",
      headerName: "Insurance Registration Date",
      width: 220,
      editable: true,
    },

    {
      field: "Insurance_Expiration_Date",
      headerName: "Insurance Expiration Date",
      width: 220,
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

  var vehicles = [];

  rows.forEach((item) => {
    item.data["id"] = rows.indexOf(item);
    vehicles.push(item.data);
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
        className=" mx-auto mt-28"
      >
        <Box>
          <UpdateVehicleForm  vehicleData={vehicleInformation}/>
        </Box>
      </Modal>

      {/* Modal for Adding user */}
      <Modal
        open={openAddVehicle}
        onClose={handleAddVehicleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "50%" }}
        className=" mx-auto mt-28"
      >
        <Box>
          <AddVehicleForm />
        </Box>
      </Modal>

      <div className="component-name text-white flex justify-between">
        <h1 className=" text-2xl font-medium my-auto">
          <span className="component-number  mr-6 p-1">~</span>
          Vehicle Table
        </h1>

        <div>
          <button
            data-tip="Add Vehicle"
            className="add-user px-3 "
            onClick={handleAddVehicle}
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
        rows={vehicles}
        columns={columns}
        pageSize={13}
        rowsPerPageOptions={[13]}
        checkboxSelection
        className="expense-data-grid py-4 mt-4"
      />
    </div>
  );
};

export default Vehicles;
