import React, { useMemo, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";

import { greekLetters, englishLetters } from "../data/letters";

const Num2LettersPage = () => {
  const [numbers, setNumbers] = useState("");

  const greekText = useMemo(() => {
    const numberArray = numbers
      .split(" ")
      .map((number: string) => greekLetters[parseInt(number) - 1]);
    return numberArray;
  }, [numbers]);

  const englishText = useMemo(() => {
    const numberArray = numbers
      .split(" ")
      .map((number: string) => englishLetters[parseInt(number) - 1]);

    return numberArray;
  }, [numbers]);

  return (
    <Stack gap={2} height="100%">
      <Stack style={{ height: "50%" }} gap={1}>
        <TextField
          fullWidth
          size="small"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          id="outlined-basic"
          label="Numbers..."
          variant="outlined"
        />
        <Stack direction="row" alignItems="center" gap={1}>
          <img height="16px" src="assets/gr.svg" />
          <Typography>{greekText}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <img height="16px" width="25px" src="assets/en.svg" />
          <Typography>{englishText}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Num2LettersPage;
