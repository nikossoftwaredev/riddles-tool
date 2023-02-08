import { useState, useMemo, useCallback } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  tableCellClasses,
  Button
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { englishLetters, greekLetters } from "data/letters";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconWrapper from "components/IconWrapper";
import { toGreek, toGreeklish } from "greek-utils";
import PerfectScrollbar from "react-perfect-scrollbar";
import { styled } from "@mui/styles";
import { compareLikelihood } from "utils/text";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "whitesmoke"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
  height: 24
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const CaesarsPage = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const [language, setLanguage] = useState("en");

  const letters = useMemo(() => (language === "gr" ? greekLetters : englishLetters), [language]);

  const shiftedTexts = useMemo(() => {
    const allShifts = [];

    for (let i = 0; i < letters.length; i++) {
      const shiftedText = debouncedText
        .toLocaleUpperCase()
        .split("")
        .map(letter => {
          if (letter === " ") return " ";

          const letterIndex = letters.findIndex(l => l === letter);
          const newIndex = (letterIndex + i) % letters.length;

          return letters[newIndex];
        })
        .join("");

      allShifts.push({ shift: i, text: shiftedText });
    }

    return allShifts.sort((a, b) => compareLikelihood(a.text, b.text, language));
  }, [debouncedText, language, letters]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const onlyLettersRegex = /^[a-zA-Zα-ωΑ-Ω ]+$/;
      const isText = onlyLettersRegex.test(value);
      if (!isText && value) return;

      const finalText = language === "en" ? toGreeklish(value) : toGreek(value);
      setText(finalText);
    },
    [language]
  );

  const onLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setLanguage(value);
      const finalText = value === "en" ? toGreeklish(text) : toGreek(text);
      setText(finalText);
      setDebouncedText(finalText);
    },
    [text]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        setDebouncedText(text);
      }
    },
    [text]
  );

  return (
    <Stack alignItems='center' sx={{ height: "100%" }} gap={2}>
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
      <TextField
        fullWidth
        size='small'
        value={text}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        id='outlined-basic'
        label={`Text(${language})`}
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <ClearIcon onClick={() => setText("")} />
            </InputAdornment>
          )
        }}
      />
      <Button fullWidth variant='contained' color='primary' onClick={() => setDebouncedText(text)}>
        APPLY SHIFTS
      </Button>
      <PerfectScrollbar style={{ width: "100%", flex: 1 }}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Shift(n)</StyledTableCell>
                <StyledTableCell sx={{ display: "flex", gap: 1 }}>
                  <IconWrapper src={`assets/${language}.svg`} /> Text
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {shiftedTexts.map(shiftedText => (
                // eslint-disable-next-line react/no-array-index-key
                <StyledTableRow key={shiftedText.shift} sx={{ overflow: "auto" }}>
                  <StyledTableCell>+{shiftedText.shift}</StyledTableCell>
                  <StyledTableCell>
                    <Stack
                      alignItems='center'
                      justifyContent='center'
                      direction='row'
                      sx={{ overflow: "auto", maxWidth: "100vh" }}
                    >
                      {shiftedText.text}
                      <IconButton onClick={() => navigator.clipboard.writeText(shiftedText.text)}>
                        <ContentCopyIcon fontSize='small' sx={{ marginLeft: "auto" }} />
                      </IconButton>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
    </Stack>
  );
};

export default CaesarsPage;
