import React from "react";
import { Stack } from "@mui/material";

import Num2LettersPage from "./Num2LettersPage";
import LettersToNum from "./LettersToNum";

const LettersNumbers = () => {
  return (
    <Stack gap={2}>
      <Num2LettersPage />
      <LettersToNum />
    </Stack>
  );
};

export default LettersNumbers;
