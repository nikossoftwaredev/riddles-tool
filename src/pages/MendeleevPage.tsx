import { useMemo, useState } from "react";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { ChemElements } from "@chemistry/elements";
import ClearIcon from "@mui/icons-material/Clear";
import CopyText from "components/CopyText";

const MendeleevPage = () => {
  const [numbers, setNumbers] = useState("");

  const chemistryText = useMemo(() => {
    const numberArray = numbers
      .split(" ")
      .map((number: string) => (ChemElements.getById(parseInt(number, 10)) || {}).symbol)
      .join(" ")
      .toUpperCase();

    return numberArray;
  }, [numbers]);

  return (
    <Stack gap={2} height='100%'>
      <Stack style={{ height: "50%" }} gap={1}>
        <img alt='mendeleev' src='assets/mendeleev.jpg' style={{ width: "100%" }} />
        <TextField
          fullWidth
          value={numbers}
          onChange={e => setNumbers(e.target.value)}
          id='outlined-basic'
          label='Atomic numbers ...'
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <ClearIcon onClick={() => setNumbers("")} />
              </InputAdornment>
            )
          }}
        />
        <Stack direction='row' alignItems='center' gap={1}>
          <CopyText text={chemistryText} icon='assets/pt.svg' />
        </Stack>
        <img alt='mendeleev' src='assets/periodic-table.png' style={{ width: "100%" }} />
      </Stack>
    </Stack>
  );
};

export default MendeleevPage;
