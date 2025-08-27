import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Filter() {
  const [filter, setFilter] = useState("faculty-staff");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="filter-label">Filter</InputLabel>
      <Select
        labelId="filter-label"
        value={filter}
        onChange={handleChange}
        label="Filter"
      >
        <MenuItem value="faculty-staff">Faculty and Staff</MenuItem>
        <MenuItem value="job-order">Job Order</MenuItem>
        <MenuItem value="vl-cos">VL/COS</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Filter;
