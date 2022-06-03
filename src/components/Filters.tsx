import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Paper, Stack, TextField, Typography } from "@mui/material";

interface SearchFiltersProps {
  searchFilters: { searchTerm: string; characters: number };
  handleChange: (
    value: any,
    dataField: keyof SearchFiltersProps["searchFilters"]
  ) => void;
}
const SearchFilters = ({ searchFilters, handleChange }: SearchFiltersProps) => {
  return (
    <>
      <Paper
        elevation={5}
        style={{ backgroundColor: "#fdf8d6", color: "purple", width: "70%" }}
      >
        <Stack gap={1} p={3} alignContent="center" justifyContent="center">
          <Typography textAlign="center">E?ΡΟ? ➡ ΕΒΡΟΥ</Typography>
          <Typography textAlign="center">*ΡΟΥ ➡ ΕΒΡΟΥ</Typography>
          <Typography textAlign="center">evRou ➡ ΕΒΡΟΥ</Typography>
        </Stack>
      </Paper>
      <TextField
        style={{ width: "350px" }}
        fullWidth
        size="small"
        value={searchFilters.searchTerm}
        onChange={(e) => handleChange(e.target.value, "searchTerm")}
        id="outlined-basic"
        label="Search..."
        variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Characters</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchFilters.characters}
          label="Characters"
          onChange={(e) => {
            handleChange(e.target.value, "characters");
          }}
        >
          {Array.from(Array(25).keys()).map((number) => (
            <MenuItem key={number} value={number}>
              {number ? number : "Unset"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SearchFilters;
