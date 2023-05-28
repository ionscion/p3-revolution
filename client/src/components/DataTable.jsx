import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "Id", width: 200 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "user_id", headerName: "Lawyer Id", width: 500 },
];

export default function DataTable({ apiInfo }) {
  let rows = [];
  if (apiInfo) {
    const rowsArray = Array.isArray(apiInfo) ? apiInfo : [apiInfo];
    rows = rowsArray.map((user) => {
      return {
        id: user.id,
        lastName: user.name.split(" ")[1],
        firstName: user.name.split(" ")[0],
        email: user.email,
        user_id: user.user_id,
      };
    });
  }

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Typography variant="h4">Client List</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
