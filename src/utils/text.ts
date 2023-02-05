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

export const compareVowels = (a: string, b: string): number => {
  const firstString = a.toUpperCase();
  const secondString = b.toUpperCase();
  const vowels = "AEIOYΑΕΗΙΟΥΩ";
  let aVowels = 0;
  let bVowels = 0;

  for (let i = 0; i < firstString.length; i++) {
    if (vowels.indexOf(firstString[i]) !== -1) aVowels++;
  }

  for (let i = 0; i < secondString.length; i++) {
    if (vowels.indexOf(secondString[i]) !== -1) bVowels++;
  }

  return bVowels - aVowels;
};
