import { colors } from "@mui/material";
import { english3GramModel } from "data/english-3-gram-model";
import { greek3GramModel } from "data/greek-3-gram-model";
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

const calculateNGramScore = (word: string, N: number, language: string): number => {
  let score = 1;

  const nGramModel = language === "en" ? english3GramModel : greek3GramModel;

  for (let i = 0; i < word.length - N + 1; i++) {
    const nGram = word.slice(i, i + N);

    if (nGramModel[nGram]) {
      score *= nGramModel[nGram];
    } else {
      score *= 5;
    }
  }

  return score;
};

export const compareLikelihood = (a: string, b: string, language: string): number => {
  const aWord = a.toUpperCase();
  const bWord = b.toUpperCase();

  const aScore = calculateNGramScore(aWord, 3, language);
  const bScore = calculateNGramScore(bWord, 3, language);

  const result = bScore - aScore >= 0 ? 1 : -1;

  return result;
};
