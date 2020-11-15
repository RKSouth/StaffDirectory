import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";

 function autoSort(){
const defaultColumnProperties = {
  sortable: true,
  width: 120
};

const columns = [
  {
    key: "id",
    name: "ID",
    sortDescendingFirst: true
  },
  {
    key: "firstName",
    name: "First Name"
  },
  {
    key: "lastName",
    name: "Last Name"
  },
  {
    key: "email",
    name: "Email"
  }
  ,
  {
    key: "age",
    name: "age"
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

const ROW_COUNT = 50;

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

function Example({ initialRows }) {
  const [rows, setRows] = useState(initialRows);
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={ROW_COUNT}
      minHeight={500}
      onGridSort={(sortColumn, sortDirection) =>
        setRows(sortRows(initialRows, sortColumn, sortDirection))
      }
    />
  );
}
 }

 export default autoSort