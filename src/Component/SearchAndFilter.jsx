import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Search icon

const SearchAndFilter = ({ searchQuery, setSearchQuery }) => {
  const [showSearch, setShowSearch] = useState(false); // Default search bar to be hidden

  const toggleSearch = () => {
    setShowSearch((prev) => !prev); // Toggle search bar visibility
    if (!showSearch) {
      setSearchQuery(""); // Clear search query when opening the search bar
    }
  };

  return (
    <>
      {/* Search Bar */}
      {showSearch && ( // Render search bar only if showSearch is true
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
      {!showSearch && ( // Only show the search icon when the search bar is hidden
        <Tooltip title="Search by name">
          <IconButton onClick={toggleSearch} size="small">
            <SearchIcon sx={{ fontSize: "2rem", color: "blueviolet" }} />
            {/* Increased icon size */}
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default SearchAndFilter;
