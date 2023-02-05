import { colors } from "@mui/material";
import { toGreek } from "greek-utils";
import wildcardMatch from "wildcard-match";
import { englishDictionary } from "./english-dictionary";
import { greekDictionary } from "./greek-dictionary";

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

export const compareLikelihood = (a: string, b: string): number => {
  const first = a.toLowerCase();
  const second = b.toLowerCase();

  const aExists = englishDictionary.includes(first) || greekDictionary.includes(first);
  const bExists = englishDictionary.includes(second) || greekDictionary.includes(second);

  return Number(bExists) - Number(aExists);
};
