import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

interface SearchFiltersProps {
  searchFilters: {
    searchTerm: string;
    characters: number;
    searchMode: string;
  };
  handleChange: (
    value: any,
    dataField: keyof SearchFiltersProps["searchFilters"]
  ) => void;
}
const SearchFilters = ({ searchFilters, handleChange }: SearchFiltersProps) => {
  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="search"
          name="radio-buttons-group"
          onChange={(e) => handleChange(e.target.value, "searchMode")}
        >
          <FormControlLabel value="search" control={<Radio />} label="Search" />
          <FormControlLabel
            value="anagram"
            control={<Radio />}
            label="Anagram"
          />
          <FormControlLabel
            value="contains"
            control={<Radio />}
            label="Contains"
          />
        </RadioGroup>
      </FormControl>
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
