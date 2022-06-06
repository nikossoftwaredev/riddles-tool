import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import SpaceBarIcon from "@mui/icons-material/SpaceBar";
import ClearIcon from "@mui/icons-material/Clear";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MinimizeIcon from "@mui/icons-material/Minimize";
import BackspaceIcon from "@mui/icons-material/Backspace";
import morse from "morse";

const MorsePage = () => {
  const [morseText, setMorseText] = useState("");

  return (
    <Stack gap={2} height="100%" direction="column">
      <Stack gap={2} direction="row">
        <Button
          style={{ backgroundColor: "black" }}
          variant="contained"
          onClick={() => setMorseText((prev) => `${prev}.`)}
          aria-label="delete"
        >
          <FiberManualRecordIcon />
        </Button>
        <Button
          style={{ backgroundColor: "black" }}
          variant="contained"
          onClick={() => setMorseText((prev) => `${prev}-`)}
          aria-label="delete"
        >
          <MinimizeIcon />
        </Button>
      </Stack>
      <Stack gap={2} direction="row">
        <Button
          variant="contained"
          onClick={() => setMorseText((prev) => `${prev} `)}
          aria-label="delete"
        >
          <SpaceBarIcon />
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={morseText.length === 0}
          onClick={() => {
            setMorseText((prev) =>
              prev
                .split("")
                .filter((e, idx) => idx < prev.length - 1)
                .join("")
            );
          }}
          aria-label="delete"
        >
          <BackspaceIcon />
        </Button>
      </Stack>

      <Typography align="center" variant="h5">
        {morseText}
      </Typography>
      <Typography align="center" variant="h5">
        {morse.decode(morseText)}
      </Typography>
    </Stack>
  );
};

export default MorsePage;
