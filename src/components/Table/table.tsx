import React, { useState } from "react";

import { data, RowData } from ".";
import TableUI from "./UI";
import EditModal from "./modal";

function TableFunction() {
  const [rows, setRows] = useState<RowData[]>(data);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof RowData;
    direction: "asc" | "desc";
  }>({ key: "id", direction: "asc" });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [editData, setEditData] = useState<RowData | null>(null); //for edited data;

  //make functions;
  const [isConfirmed, setIsConfirmed] = useState(false);

  //open modal for update data;
  const [openModal, setOpenModal] = useState(false);

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

  //open menu for delete / update;
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    row: RowData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  //make actions to update;
  const handleUpdate = () => {
    if (selectedRow) {
      if (isConfirmed) {
        console.log(`Performing Update on row`, selectedRow);
        setEditData(selectedRow);
        setOpenModal(true);
      } else {
        console.log(
          `Action (Delete) on row ${JSON.stringify(selectedRow)} not confirmed.`
        );
      }
    }
    //close menu after makes this functions;
    handleMenuClose();
  };

  //make actions to delete;
  const handleDelete = () => {
    if (selectedRow) {
      if (isConfirmed) {
        console.log(`Performing Delete on row`, selectedRow);
        setRows(rows.filter((row) => row.id !== selectedRow.id));
      } else {
        console.log(
          `Action (Delete) on row ${JSON.stringify(selectedRow)} not confirmed.`
        );
      }
    }
    //close menu after makes this functions;
    handleMenuClose();
  };

  //close the menubar which is open;
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(event.target.checked);
  };

  //update functions
  const handleUpdateSubmit = () => {
    if (editData) {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === editData.id ? editData : row))
      );
    }
    setOpenModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [event.target.name]: event.target.value });
    }
  };

  return (
    <>
      <h3>Data Table with Confirmation</h3>
      <small>
        If you would need to really delete or update data from table, Please
        toggle checkbox.
      </small>

      <div className="check-box">
        <label>
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={toggleConfirmation}
          />
          Confirm actions
        </label>
      </div>

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
      <EditModal
        editData={editData}
        isModalOpen={openModal}
        setOpenModal={setOpenModal}
        handleInputChange={handleInputChange}
        handleUpdateSubmit={handleUpdateSubmit}
      />
    </>
  );
}

export default TableFunction;
