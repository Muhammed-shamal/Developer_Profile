import React, { useState } from "react";

import { data, RowData } from ".";
import TableUI from "./UI";

function TableFunction() {
  const [rows, setRows] = useState<RowData[]>(data);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof RowData;
    direction: "asc" | "desc";
  }>({ key: "id", direction: "asc" });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  //for make sorting;
  const handleSort = (column: keyof RowData) => {
    let direction: "asc" | "desc" = "asc"; // Use 'asc' or 'desc'
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc"; // Toggle to 'desc' if currently 'asc'
    }
    setSortConfig({ key: column, direction });

    const sortedRows = [...rows].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setRows(sortedRows);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    row: RowData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  //make actions like deletion or edits;
  const handleUpdate = (action: "edit") => {
    if (selectedRow) {
      console.log(
        `action is ${action} and data is this:`,
        JSON.stringify(selectedRow, null, 2)
      );
    }
    setAnchorEl(null);
  };

  const handleDelete = (action: "delete") => {
    if (selectedRow) {
      console.log(
        `action is ${action} and data is this:`,
        JSON.stringify(selectedRow, null, 2)
      );
    }
    setAnchorEl(null);
  };

  //close the modal;
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableUI
      anchorEl={anchorEl}
      rows={rows}
      selectedRow={selectedRow}
      sortConfig={sortConfig}
      
      handleDelete={handleDelete}
      handleMenuClick={handleMenuClick}
      handleMenuClose={handleMenuClose}
      handleSort={handleSort}
      handleUpdate={handleUpdate}
    />
  );
}

export default TableFunction;
