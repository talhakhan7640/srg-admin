import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";

// Firebase imports
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebaseConfig";
import { useState, useEffect } from "react";



const FullFeaturedCrud = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  // ********Column********
  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    { field: "First_Name", headerName: "First name", width: 130, editable:true },
    { field: "Last_Name", headerName: "Last name", width: 130, editable:true },
    {
      field: "Mobile_Number",
      headerName: "Mobile Number",
      width: 150,
      type: "number",
        editable:true
    },
    {
      field: "Alternate_Mobile_Number",
      headerName: "Alternate Mobile Number",
      width: 190,
      type: "number",
      editable: true
    },

    { field: "Address", headerName: "Address", width: 450, editable:true },

    {
      field: "Username",
      headerName: "Username",
      width: 150,
      editable:true
    },
    
    {
      field: "Password",
      headerName: "Password",
      width: 150,
      editable:true
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
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
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
            onClick={handleEditClick(id)}
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

  useEffect(() => {
    fetchEmployees(db);
  }, []);

  async function fetchEmployees(db) {
    const usersCol = collection(db, "Users");
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    setRows(userList);
  }

  console.log(rows)

  var data = []

  rows.forEach((item) => {
    item.data['id'] = rows.indexOf(item);
      data.push(item.data)
})

  return (
    <Box
    sx={{
      height: 500,
      width: '100%',
      '& .actions': {
        color: 'text.secondary',
      },
      '& .textPrimary': {
        color: 'text.primary',
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
  >
    <DataGridPro
      rows={data}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowEditStart={handleRowEditStart}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      experimentalFeatures={{ newEditingApi: true }}
    />
  </Box>
  );
};

export default FullFeaturedCrud;
