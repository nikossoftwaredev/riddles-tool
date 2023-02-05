/* eslint-disable prefer-destructuring */
import { useState, useCallback, useMemo } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  colors,
  Grid,
  Paper
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { greekLetters, englishLetters } from "data/letters";
import { startCase } from "lodash";

interface CharactersInfo {
  [key: string]: number;
}

const GroupTypes = {
  distinct: 1,
  missing: 0
};

const TextInfo = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <Grid xs={4}>
      <Stack direction='column' alignItems='center'>
        <span>
          <strong>{label}</strong>
        </span>
        <span>{value}</span>
      </Stack>
    </Grid>
  );
};

const LetterInfo = ({
  letters,
  charactersInfo,
  type
}: {
  letters: string[];
  charactersInfo: CharactersInfo;
  type: "distinct" | "missing";
}) => (
  <Paper sx={{ width: "90%", p: 2, m: 1 }}>
    <Stack direction='column' alignItems='center' gap={1}>
      <span>
        <strong>{startCase(type)} Letters</strong>
      </span>
      <span>
        {letters
          .filter(letter => {
            const appearances = charactersInfo[letter] || 0;

            if (appearances === GroupTypes[type]) return true;

            return false;
          })
          .join("")}
      </span>
    </Stack>
  </Paper>
);

const TextAnalyzePage = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");

  const letters = useMemo(() => (language === "gr" ? greekLetters : englishLetters), [language]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  }, []);

  const charactersInfo = useMemo(() => {
    return text
      .toLocaleUpperCase()
      .split("")
      .reduce((acc, letter) => {
        if (acc[letter] != null) return { ...acc, [letter]: acc[letter] + 1 };

        return { ...acc, [letter]: 1 };
      }, {} as CharactersInfo);
  }, [text]);

  const characters = text.replace(/\s/g, "").length;
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  const lines = text.split("\n").length;

  const onLanguageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setLanguage(value);
  }, []);

  return (
    <Stack alignItems='center' sx={{ height: "100%" }}>
      <Stack alignItems='center'>
        <FormControl fullWidth>
          <RadioGroup
            row
            sx={{ alignItems: "center", justifyContent: "center" }}
            aria-labelledby='demo-radio-buttons-group-label'
            value={language}
            name='radio-buttons-group'
            onChange={onLanguageChange}
          >
            <FormControlLabel value='gr' control={<Radio />} label='Greek' />
            <FormControlLabel value='en' control={<Radio />} label='English' />
          </RadioGroup>
        </FormControl>
      </Stack>
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        multiline
        rows={4}
        size='small'
        value={text}
        onChange={handleChange}
        id='outlined-basic'
        label='Text'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <ClearIcon onClick={() => setText("")} />
            </InputAdornment>
          )
        }}
      />
      <Paper sx={{ m: 1, width: "90%", p: 2 }}>
        <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
          <TextInfo label='Characters' value={characters} />
          <TextInfo label='Words' value={words} />
          <TextInfo label='Lines' value={lines} />
        </Grid>
      </Paper>
      <Paper sx={{ width: "90%", p: 2, m: 1 }}>
        <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
          {letters.map(letter => {
            const appearances = charactersInfo[letter] || 0;

            let color = "black";

            if (appearances) color = colors.green[500];
            if (appearances > 1) color = colors.orange[500];

            return (
              <Grid key={letter} item xs={4}>
                <Typography align='center' sx={{ color }}>
                  <strong>{letter.toUpperCase()}:</strong> {appearances}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
      <LetterInfo type='distinct' charactersInfo={charactersInfo} letters={letters} />
      <LetterInfo type='missing' charactersInfo={charactersInfo} letters={letters} />
    </Stack>
  );
};

export default TextAnalyzePage;
