import { useState } from "react";
import { Stack, Grid, Button } from "@mui/material";
import CopyText from "../components/CopyText";
import { pigPenInfo } from "../data/letters";
import ClearIcon from "@mui/icons-material/Clear";

const PigPenPage = () => {
  const [text, setText] = useState("");

  const onClick = (letter: string) => () => {
    setText((prev) => `${prev}${letter}`);
  };

  return (
    <Stack
      gap={2}
      sx={{ height: "100%", width: "100%" }}
      direction="column"
      alignItems="center"
    >
      <Button
        variant="contained"
        color="error"
        sx={{ width: "100%", justifyContent: "center" }}
        disabled={text.length === 0}
        onClick={() => {
          setText("");
        }}
        aria-label="delete"
      >
        Clear
        <ClearIcon fontSize="small" />
      </Button>
      <CopyText text={text || "Type pigpen"} />
      <Grid container spacing={5} justifyItems="stretch">
        {pigPenInfo.map((info) => {
          const { letter, sides, dotStyle, transform } = info;
          const buttonStyle = sides.reduce((acc, side) => {
            return { ...acc, [`border${side}`]: "5px solid black", transform };
          }, {});

          return (
            <Grid key={letter} item xs={4}>
              <button
                className="pig-pen"
                style={buttonStyle}
                onClick={onClick(letter)}
              >
                {dotStyle && (
                  <span className={`${letter} dot`} style={dotStyle}></span>
                )}
              </button>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default PigPenPage;
