import { colors } from "@mui/material";
import { toGreek } from "greek-utils";

export const highlightStringMatch = (text: string, term: string) => {
  term = toGreek(term);
  const rgx = new RegExp(term, "ig");

  return text.replace(
    rgx,
    (match) => `<span style="color:${colors.green[600]}">${match}</span>`
  );
};
