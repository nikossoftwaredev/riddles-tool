/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { english3GramModel } from "data/english-3-gram-model";

/* eslint-disable @typescript-eslint/no-shadow */
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface LetterFrequency {
  [key: string]: number;
}

const letterFrequency: LetterFrequency = {
  A: 8.12,
  B: 1.49,
  C: 2.71,
  D: 4.32,
  E: 12.02,
  F: 2.3,
  G: 2.03,
  H: 5.92,
  I: 7.31,
  J: 0.1,
  K: 0.69,
  L: 3.98,
  M: 2.61,
  N: 6.95,
  O: 7.68,
  P: 1.82,
  Q: 0.11,
  R: 6.02,
  S: 6.28,
  T: 9.1,
  U: 2.88,
  V: 1.11,
  W: 2.09,
  X: 0.17,
  Y: 2.11,
  Z: 0.07
};

const getLetterFrequency = (cryptogram: string): LetterFrequency => {
  const trimmedCryptogram = cryptogram.replace(/\s/g, "");
  const cryptogramLength = trimmedCryptogram.length;

  const cryptogramLetterFrequency = cryptogram
    .replace(/\s/g, "")
    .split("")
    .reduce((acc, letter) => {
      if (acc[letter] != null) return { ...acc, [letter]: acc[letter] + 1 };

      return { ...acc, [letter]: 1 };
    }, {} as LetterFrequency);

  Object.keys(cryptogramLetterFrequency).forEach(key => {
    const occurrences = cryptogramLetterFrequency[key];

    const actualFrequency = occurrences / cryptogramLength;

    cryptogramLetterFrequency[key] = actualFrequency * 100;
  });

  return cryptogramLetterFrequency;
};

const cryptoGramDecryption = (encryptedText: string, key: string): string => {
  const map: any = {};
  alphabet.split("").forEach((letter, idx) => {
    map[key[idx]] = letter;
  });

  const decrypted = encryptedText.split("").map(letter => {
    return map[letter] || " ";
  });

  return decrypted.join("");
};

const N = 3;
const calculateNGramScore = (phrase: string): number => {
  let score = 1;

  for (let i = 0; i < phrase.length - N + 1; i++) {
    const nGram = phrase.slice(i, i + N);

    if (english3GramModel[nGram]) {
      score *= english3GramModel[nGram];
    } else {
      score *= 5;
    }
  }

  return score;
};

const getSwappedKey = (currentKey: string): string => {
  const strArray = currentKey.split("");
  const i = Math.floor(Math.random() * strArray.length);
  const j = Math.floor(Math.random() * strArray.length);
  const temp = strArray[i];
  strArray[i] = strArray[j];
  strArray[j] = temp;
  return strArray.join("");
};

const getKeyFromFrequencies = (cryptogram: string): any => {
  const cryptogramLetterFrequency = getLetterFrequency(cryptogram);

  const map: any = {};

  for (const key1 in letterFrequency) {
    let closest = null;
    let closestValue = Infinity;

    for (const key2 in cryptogramLetterFrequency) {
      const diff = Math.abs(letterFrequency[key1] - cryptogramLetterFrequency[key2]);

      if (diff < closestValue) {
        closestValue = diff;
        closest = key2;
      }
    }

    if (closest) {
      map[key1] = closest;
      delete cryptogramLetterFrequency[closest];
    }
  }

  const newKey = Object.values(map).join("");

  return newKey;
};

export const solveCryptogram = (cryptogram: string): string => {
  let currentKey = getKeyFromFrequencies(cryptogram);

  let currentDecoded = cryptoGramDecryption(cryptogram, currentKey);
  let currentScore = calculateNGramScore(currentDecoded);

  let i = 0;
  while (i < 20000) {
    const newKey = getSwappedKey(currentKey);
    const newtDecoded = cryptoGramDecryption(cryptogram, newKey);
    const newScore = calculateNGramScore(newtDecoded);

    if (newScore > currentScore) {
      currentDecoded = newtDecoded;
      currentScore = newScore;
      currentKey = newKey;
    }

    i++;
  }

  return currentDecoded;
};

let phrase =
  "Aim Quick jumps lead to big thrills as Nathan reached for the vines. Bravely, he dangled high above the river and gazed down at the glittering water below. Carrying an eager spirit, he felt the rush of adrenaline with every swing. Doing what he loved most, Nathan felt free. Grinning from ear to ear, he eventually let go of the vines and plummeted towards the river. In a flash, he plunged into the water, feeling the cool embrace of the current. Joyful and content, he swam to the bank and lay on the grass, staring up at the sky. Xylophones played in the distance as yellow butterflies danced in the breeze. Zen-like, Nathan closed his eyes and felt at peace.";

phrase = phrase.toUpperCase().replace(/[,.-]/g, "");

const getRandomKey = () => {
  const arr = alphabet.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("").toUpperCase();
};

const randomKey = getRandomKey();

export const cryptogramEncryption = () => {
  const map: any = {};

  alphabet.split("").forEach((letter, idx) => {
    map[letter] = randomKey[idx];
  });

  const encrypted = phrase.split("").map(letter => {
    return map[letter] || " ";
  });

  return encrypted.join("");
};
