import { colors } from "@mui/material";
import { toGreek } from "greek-utils";
import wildcardMatch from "wildcard-match";

export const getHighlightedText = (text: string, term: string): string => {
  // eslint-disable-next-line no-param-reassign
  term = toGreek(term, "?");

  let rgx: RegExp;
  if (term.match(/\?|\*/g)) {
    rgx = wildcardMatch(term).regexp;
  } else {
    rgx = new RegExp(term, "ig");
  }

  return text.replace(rgx, match => `<span style="color:${colors.green[600]}">${match}</span>`);
};
