import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useOutletContext, Link, useNavigate } from "react-router-dom";

const columns = [
  // { field: "id", headerName: "Id", width: 200 },
  { field: "firstName", headerName: "First Name", width: 130, },
  { field: "middleName", headerName: "Middle Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "email", headerName: "E-Mail", width: 150 },
  { field: "phoneNumber", headerName: "Phone #", width: 150 },
  {
    field: "isActive",
    headerName: "Active/Inactive",
    width: 150,
    valueGetter: (params) => (params.row.isActive ? "Active" : "Inactive"),
  },
  // { field: "user_id", headerName: "Lawyer Id", width: 200 },
];

export default function DataTable() {
  const apiInfo = useOutletContext();
  const navigate = useNavigate();
  let rows = [];
  if (apiInfo) {
    const rowsArray = Array.isArray(apiInfo) ? apiInfo : [apiInfo];
    rows = rowsArray.map((user) => {
      //  let formattedPhone = user.phone_number;
      // formattedPhone.toString().replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      return {
        id: user._id,
        lastName: user.last_name,
        middleName: user.middle_name,
        firstName: user.first_name,
        email: user.email,
        phoneNumber: user.phone_number,
        isActive: user.is_active,
        user_id: user.user_id,
      };
    });
  }

  const handleRowClick = (params) => {
    console.log(params.row.id);
    navigate(`/clients/details/${params.row.id}`);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Typography variant="h4" style={{fontFamily:"Tahoma", fontSize: "29px", marginLeft:'10px', marginTop:'20px'}}>Client List</Typography>
      <DataGrid
        onRowClick={handleRowClick}
        onCellClick={handleRowClick}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        style={{margin:'10px'}}
      />
    </div>
  );
}
