import React, { useEffect, useState } from "react";

import { data, RowData } from ".";
import TableUI from "./UI";
import EditModal from "./modal";

function TableFunction() {
  //rows declarations
  const [rows, setRows] = useState<RowData[]>(data);

  //for function state (ascending / descending)order
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RowData;
    direction: "asc" | "desc";
  }>({ key: "id", direction: "asc" });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //select row for specific functions
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const [editData, setEditData] = useState<RowData | null>(null); //for edited data to view in modal;

  //make functions;
  const [isConfirmed, setIsConfirmed] = useState(false);

  //open modal for update data;
  const [openModal, setOpenModal] = useState(false);

  //loading for each requests; (when page load, update/delete/ sort time)
  const [loading, setLoading] = useState<boolean>(true);

  //for make loading skeleton when page runs;
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);//loading false after 1500s

    return () => clearTimeout(timer);
  }, []);

  //for make sorting;
  const handleSort = (column: keyof RowData) => {
    let direction: "asc" | "desc" = "asc"; // Use 'asc' or 'desc'
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc"; // Toggle to 'desc' if currently 'asc'
    }
    setSortConfig({ key: column, direction });

    setLoading(true);

    const sortedRows = [...rows].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setRows(sortedRows);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
        setEditData(selectedRow);
        setOpenModal(true);
      } else {
        console.log(
          `Action (Update) on row ${JSON.stringify(selectedRow)} not confirmed.`
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
        setLoading(true);
        setRows(rows.filter((row) => row.id !== selectedRow.id));

        //use to get a feel likes api fetching
        setTimeout(() => {
          setLoading(false);
        }, 1500);
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

  //check true / false (confirmation of actions)
  const toggleConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(event.target.checked);
  };

  //update functions in modal
  const handleUpdateSubmit = () => {
    if (editData) {
      setLoading(true);
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === editData.id ? editData : row))
      );

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    setOpenModal(false);
  };

  //to input values
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
        loading={loading}
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
