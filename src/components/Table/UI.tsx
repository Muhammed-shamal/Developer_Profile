import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Menu,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./table.css";
import UpdateBtn from "../Buttons/updateBtn";
import DeleteBtn from "../Buttons/deleteBtn";
import { TableUIProps } from ".";

function TableUI({
  //data
  anchorEl,
  rows,
  selectedRow,
  sortConfig,

  //functions
  handleDelete,
  handleMenuClick,
  handleMenuClose,
  handleSort,
  handleUpdate,
}: TableUIProps) {
  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "id"}
                    direction={
                      sortConfig.key === "id" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("id")}
                    className="t-head"
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "name"}
                    direction={
                      sortConfig.key === "name" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("name")}
                    className="t-head"
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* this bellow table sort labe is  for column sorting */}
                  <TableSortLabel
                    active={sortConfig.key === "age"}
                    direction={
                      sortConfig.key === "age" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("age")}
                    className="t-head"
                  >
                    Age
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => handleMenuClick(event, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedRow?.id === row.id}
                        onClose={handleMenuClose}
                      >
                        <UpdateBtn handleUpdate={handleUpdate} />
                        <DeleteBtn handleDelete={handleDelete} />
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}

export default TableUI;
