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
  Grid
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { greekLetters, englishLetters } from "data/letters";

interface CharactersInfo {
  [key: string]: number;
}

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
      .toLocaleLowerCase()
      .split("")
      .reduce((acc, letter) => {
        if (acc[letter] != null) return { ...acc, [letter]: acc[letter] + 1 };

        return { ...acc, [letter]: 1 };
      }, {} as CharactersInfo);
  }, [text]);

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
        rows={3}
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
      <Typography>Characters: {text.length}</Typography>
      <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
        {letters.map(letter => {
          const appearances = charactersInfo[letter] || 0;

          let color = "black";

          if (appearances) color = colors.green[500];
          if (appearances > 1) color = colors.orange[500];

          return (
            <Grid key={letter} item xs={4}>
              <Typography sx={{ color }}>
                {letter.toUpperCase()}: {appearances}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default TextAnalyzePage;
