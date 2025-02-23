import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      sx={{
        "& .MuiInputBase-input": {
          color: "white", // Set font color to white
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // Optional: Set border color to white
          },
          "&:hover fieldset": {
            borderColor: "white", // Optional: Set hover border color to white
          },
        },
        "& .MuiInputLabel-root": {
          color: "white", // Optional: Set label color to white
        },
        width: "45rem",
      }}
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon sx={{ color: "#fff" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
