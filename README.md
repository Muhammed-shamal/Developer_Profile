# React + TypeScript + Vite + Material UI Project: Data Table with Sorting and Action Menu;

## Project Details

A **responsive table** with sorting capabilities and row-specific action menus is implemented in this project. The table enables users to:

**Sort** data in either ascending or descending order by column (ID, Name, Age).
Each row has a **three-dot menu** that can be used to initiate activities such as **Edit** and **Delete**, along with logs for those actions.

- The table adapts to various screen sizes and is **responsive**.

For UI elements used **Material-UI**.

## Contents Table

1. [Requirements]

Used **Vite** for make fast react-app;

# React + TypeScript + Vite + Material UI

2. [Organisation of the Project]

src/
│
├── components/
├ ├── Navbar/navbar.tsx for a small header UI with a title Table Management;
├ ├── Buttons/deleteBtn.tsx and updateBtn.tsx and have an index.ts file for props handling (component props)
│ ├── Table/table.tsx # Main table component with sorting and action menu
│ └── App.tsx # Main App component to display DataTable
│
└── index.ts # Entry point to render the App component

In this file, I created a UI table called UI.tsx, along with an index.ts for constants of data or props interfaces and table.css for some minor styling purposes.

3. [How to Launch the App]

To get this project up and running, follow these steps:

1. Clone the repository.

2. Install the dependencies by:

   npm install

3. Run the application:

npm run dev

4. Visit `http://localhost:5173` in your browser to view the application.

5. [Key Features]

6. **Sorting**: Clicking on any column header (`ID`, `Name`, or `Age`) will toggle sorting between ascending and descending order.
7. **Row Action Menu**: Each row has a 3-dot menu (using Material-UI’s`MoreVertIcon`). Clicking the menu shows options for **Edit** and **Delete**. Actions are logged to the console.

8. **Responsiveness**: The table is responsive, adjusting to different screen sizes. Material-UI components provide built-in responsiveness.

9. [Explanation of Code]

### State Management

- **`useState`** is used to manage the state of:
  - `rows`: The data displayed in the table.
  - `sortConfig`: The current column being sorted and the sorting direction.
  - `anchorEl`: The element for positioning the action menu.
  - `selectedRow`: The currently selected row for action purposes.

### Sorting

- **Sorting Logic**: Clicking a column header invokes the `handleSort` function, which toggles the sorting direction (ascending/descending) based on the current state.
- **`TableSortLabel`** is used for sortable headers. The sorting state is stored in `sortConfig`, which determines the direction and column being sorted.

### Action Menu

- **3-dot Menu**: For each row, an action button opens a `Menu` that contains options to **Edit** or **Delete**.
- **`Buttons`**: Clicking on a menu item triggers an action, and the corresponding details of the row are logged to the console.
- The selected row is tracked in the state `selectedRow` to ensure the correct data is logged for the selected action.

### Responsiveness

- The table layout automatically adjusts to screen sizes, thanks to Material-UI’s built-in grid system and components like `Table`, `TableHead`, `TableCell`, and `TableRow`.

10. [State Administration]

### Adding New Columns

To add more columns, update the following:

1. Add a new column to the `TableHead` (e.g., "Email", "Address").
2. Update the **`RowData`** interface to include the new column's data.
3. Add the column to the `handleSort` function, and adjust the `rows` state to include data for that column.

### Adding More Actions

To extend the action menu with additional actions:

1. Add new `MenuItem` options (e.g., "View Details").
2. Extend the `handleAction` function to handle new actions (e.g., log action data or trigger additional logic).

11. [Sorting]

- [Action Menu](#action-menu)
  A response that is responsive (#responsiveness)

6. [Application Extension](#extending-the-app)
7. [Error Handling & Edge Cases](#error-handling--edge-cases)

## Reliances
