import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { ISearchFilters } from 'types/search';
import { areaDataSets } from 'data/general';
import HintPopover from './HintPopover';

interface SearchFiltersProps {
  searchFilters: ISearchFilters;
  handleChange: (
    value: ISearchFilters[typeof dataField],
    dataField: keyof SearchFiltersProps['searchFilters']
  ) => void;
}
const SearchFilters = ({ searchFilters, handleChange }: SearchFiltersProps) => {
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='search'
          name='radio-buttons-group'
          onChange={e => handleChange(e.target.value, 'searchMode')}
        >
          <FormControlLabel value='search' control={<Radio />} label='Search' />
          <FormControlLabel value='anagram' control={<Radio />} label='Anagram' />
        </RadioGroup>
      </FormControl>
      <TextField
        style={{ width: '350px' }}
        fullWidth
        size='small'
        value={searchFilters.searchTerm}
        onChange={e => handleChange(e.target.value, 'searchTerm')}
        id='outlined-basic'
        label='Search...'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <HintPopover />
            </InputAdornment>
          )
        }}
      />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Characters</InputLabel>
        <Select
          size='small'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={searchFilters.characters}
          label='Characters'
          onChange={e => {
            handleChange(e.target.value, 'characters');
          }}
        >
          {Array.from(Array(25).keys()).map(number => (
            <MenuItem key={number} value={number}>
              {number || 'Unset'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Data Set</InputLabel>
        <Select
          size='small'
          value={searchFilters.dataset}
          label='Data-set'
          onChange={e => {
            handleChange(e.target.value, 'dataset');
          }}
        >
          {Object.keys(areaDataSets).map(area => (
            <MenuItem key={area} value={area}>
              {area}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SearchFilters;
