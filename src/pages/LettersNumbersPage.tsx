import React from "react";
import { Stack } from "@mui/material";

import Num2LettersPage from "../components/Num2LettersPage";
import LettersToNum from "../components/LettersToNum";

const LettersNumbersPage = () => {
  return (
    <Stack gap={2}>
      <Num2LettersPage />
      <LettersToNum />
    </Stack>
  );
};

export default LettersNumbersPage;
