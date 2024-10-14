import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const StudentFilter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel>Filter by Status</InputLabel>
      <Select
        value={filter}
        onChange={handleFilterChange}
        label="Filter by Status"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StudentFilter;
