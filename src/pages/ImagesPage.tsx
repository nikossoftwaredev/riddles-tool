import { useMemo, useState } from "react";
import { InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { ChemElements } from "@chemistry/elements";
import ClearIcon from "@mui/icons-material/Clear";
import CopyText from "components/CopyText";
import PerfectScrollbar from "react-perfect-scrollbar";

const CheatImage = ({ src }: { src: string }) => (
  <Paper style={{ width: "100%", padding: "4px" }}>
    <img alt={src} src={src} style={{ width: "90%" }} />
  </Paper>
);
const ImagesPage = () => {
  return (
    <PerfectScrollbar>
      <Typography variant='h5' align='center' sx={{ mt: 2 }}>
        Riddles Cheat Sheet
      </Typography>
      <Stack height='100%' sx={{ m: 4 }} gap={2}>
        <CheatImage src='assets/notes.png' />
        <CheatImage src='assets/polivios.jpg' />
        <CheatImage src='assets/braille-alphabet-overview.png' />
        <CheatImage src='assets/greek-braille.jpg' />
      </Stack>
    </PerfectScrollbar>
  );
};

export default ImagesPage;
