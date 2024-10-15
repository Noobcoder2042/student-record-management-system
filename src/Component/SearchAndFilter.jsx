import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchAndFilter = ({ searchQuery, setSearchQuery }) => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (!showSearch) {
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Search Bar */}
      {showSearch && (
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleSearch} size="small">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* Search Icon Button to toggle search bar */}
      {!showSearch && (
        <Tooltip title="Search by name">
          <IconButton onClick={toggleSearch} size="small">
            <SearchIcon sx={{ fontSize: "2rem", color: "blueviolet" }} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default SearchAndFilter;
