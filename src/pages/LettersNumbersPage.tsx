import { Stack, IconButton, Box, TextField, InputAdornment, colors } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useMemo, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CopyText from "components/CopyText";
import { englishLetters, greekLetters } from "data/letters";

interface Mode {
  from: "Numbers" | "Letters";
  to: "Numbers" | "Letters";
}
const LettersNumbersPage = () => {
  const [mode, setMode] = useState<Mode>({
    from: "Numbers",
    to: "Letters"
  });

  const [text, setText] = useState("");

  const onToggleMode = () => {
    if (mode.from === "Numbers") {
      setMode({ from: "Letters", to: "Numbers" });
    } else {
      setMode({ from: "Numbers", to: "Letters" });
    }
  };

  const { gr, en } = useMemo(() => {
    if (text === "") return { gr: "", en: "" };
    let greek: number[] | string[] = [];
    let english: number[] | string[] = [];

    if (mode.from === "Letters") {
      const textArray = text.toLowerCase().split("");
      greek = textArray
        .map((letter: string) => greekLetters.indexOf(letter) + 1)
        .filter((letter: number) => letter > 0);

      english = textArray
        .map((letter: string) => englishLetters.indexOf(letter) + 1)
        .filter((letter: number) => letter > 0);
    } else if (mode.from === "Numbers") {
      const textArray = text.split(/ /);

      greek = textArray.map((number: string) => greekLetters[parseInt(number, 10) - 1] || "-");

      english = textArray.map((number: string) => englishLetters[parseInt(number, 10) - 1] || "-");
    }

    return {
      gr: greek.join(" ").toUpperCase(),
      en: english.join(" ").toUpperCase()
    };
  }, [text, mode.from]);

  return (
    <Stack gap={2} sx={{ width: "100%" }}>
      <Stack direction='row' justifyContent='center' alignItems='center' gap={2}>
        <Box sx={{ flex: 0.3, color: colors.green[500] }}>{mode.from}</Box>
        <IconButton sx={{ flex: 0.3 }} onClick={onToggleMode}>
          <CompareArrowsIcon />
        </IconButton>
        <Box sx={{ flex: 0.3 }}> {mode.to}</Box>
      </Stack>
      <TextField
        fullWidth
        size='small'
        value={text}
        onChange={e => setText(e.target.value)}
        id='outlined-basic'
        label={`${mode.from}...`}
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <ClearIcon onClick={() => setText("")} />
            </InputAdornment>
          )
        }}
      />
      {["gr", "en"].map(language => (
        <CopyText
          key={language}
          text={language === "gr" ? gr : en}
          icon={`assets/${language}.svg`}
        />
      ))}
    </Stack>
  );
};

export default LettersNumbersPage;
