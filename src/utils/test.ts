import { colors } from '@mui/material';
import { toGreek } from 'greek-utils';

export const highlightStringMatch = (text: string, term: string): string => {
  const rgx = new RegExp(toGreek(term), 'ig');

  return text.replace(rgx, match => `<span style="color:${colors.green[600]}">${match}</span>`);
};
