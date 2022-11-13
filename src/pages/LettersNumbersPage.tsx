import {
  Stack,
  IconButton,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useMemo, useState } from "react";
import { englishLetters, greekLetters } from "../data/letters";
import ClearIcon from "@mui/icons-material/Clear";
import CopyText from "../components/CopyText";

interface Mode {
  from: "Numbers" | "Letters";
  to: "Numbers" | "Letters";
}
const LettersNumbersPage = () => {
  const [mode, setMode] = useState<Mode>({
    from: "Numbers",
    to: "Letters",
  });

  const [text, setText] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const onToggleMode = () => {
    if (mode.from === "Numbers") {
      setMode({ from: "Letters", to: "Numbers" });
    } else {
      setMode({ from: "Numbers", to: "Letters" });
    }
  };

  const { greek, english } = useMemo(() => {
    let greek: number[] | string[] = [];
    let english: number[] | string[] = [];

    if (mode.from === "Letters") {
      const textArray = text.split("");
      greek = textArray
        .map((letter: string) => greekLetters.indexOf(letter) + 1)
        .filter((letter: number) => letter > 0);

      english = textArray
        .map((letter: string) => englishLetters.indexOf(letter) + 1)
        .filter((letter: number) => letter > 0);
    } else if (mode.from === "Numbers") {
      const textArray = text.split(/ /);

      greek = textArray.map(
        (number: string) => greekLetters[parseInt(number) - 1]
      );

      english = textArray.map(
        (number: string) => englishLetters[parseInt(number) - 1]
      );
    }

    return {
      greek: greek.join(" ").toUpperCase(),
      english: english.join(" ").toUpperCase(),
    };
  }, [text, mode.from]);

  return (
    <Stack gap={2} sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box sx={{ flex: 0.3 }}>{mode.from}</Box>
        <IconButton sx={{ flex: 0.3 }} onClick={onToggleMode}>
          <CompareArrowsIcon />
        </IconButton>
        <Box sx={{ flex: 0.3 }}> {mode.to}</Box>
      </Stack>
      <TextField
        fullWidth
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="outlined-basic"
        label={`${mode.from}...`}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon onClick={() => setText("")} />
            </InputAdornment>
          ),
        }}
      />

      {["gr", "en"].map((language) => (
        <CopyText
          key={language}
          text={language === "gr" ? greek : english}
          icon={`assets/${language}.svg`}
        />
      ))}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => setShowSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setShowSnackbar(false)}
          severity="success"
        >
          Copied successfully
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
};

export default LettersNumbersPage;
