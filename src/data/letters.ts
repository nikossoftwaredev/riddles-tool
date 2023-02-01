export const greekLetters = [
  'α',
  'β',
  'γ',
  'δ',
  'ε',
  'ζ',
  'η',
  'θ',
  'ι',
  'κ',
  'λ',
  'μ',
  'ν',
  'ξ',
  'ο',
  'π',
  'ρ',
  'σ',
  'τ',
  'υ',
  'φ',
  'χ',
  'ψ',
  'ω'
];
export const englishLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

const center = 'calc(50% - 6px)';

export const pigPenInfo = [
  { letter: 'a', sides: ['Right', 'Bottom'] },
  { letter: 'b', sides: ['Right', 'Left', 'Bottom'] },
  { letter: 'c', sides: ['Left', 'Bottom'] },
  { letter: 'd', sides: ['Top', 'Right', 'Bottom'] },
  { letter: 'e', sides: ['Top', 'Right', 'Left', 'Bottom'] },
  { letter: 'f', sides: ['Top', 'Left', 'Bottom'] },
  { letter: 'g', sides: ['Top', 'Right'] },
  { letter: 'h', sides: ['Top', 'Left', 'Right'] },
  { letter: 'i', sides: ['Top', 'Left'] },

  {
    letter: 'j',
    sides: ['Right', 'Bottom'],
    dotStyle: { bottom: '4px', right: '4px' }
  },
  {
    letter: 'k',
    sides: ['Right', 'Left', 'Bottom'],
    dotStyle: { bottom: '4px', left: center }
  },
  {
    letter: 'l',
    sides: ['Left', 'Bottom'],
    dotStyle: { bottom: '4px', left: '4px' }
  },
  {
    letter: 'm',
    sides: ['Top', 'Right', 'Bottom'],
    dotStyle: { top: center, right: '4px' }
  },
  {
    letter: 'n',
    sides: ['Top', 'Right', 'Left', 'Bottom'],
    dotStyle: { bottom: '4px', left: center }
  },
  {
    letter: 'o',
    sides: ['Top', 'Left', 'Bottom'],
    dotStyle: { top: center, left: '4px' }
  },
  {
    letter: 'p',
    sides: ['Top', 'Right'],
    dotStyle: { top: '4px', right: '4px' }
  },
  {
    letter: 'q',
    sides: ['Top', 'Left', 'Right'],
    dotStyle: { top: '4px', left: center }
  },
  {
    letter: 'r',
    sides: ['Top', 'Left'],
    dotStyle: { top: '4px', left: '4px' }
  },

  { letter: 's', sides: ['Left', 'Bottom'], transform: 'rotate(-45deg)' },
  { letter: 't', sides: ['Left', 'Bottom'], transform: 'rotate(-135deg)' },
  { letter: 'u', sides: ['Left', 'Bottom'], transform: 'rotate(45deg)' },
  { letter: 'v', sides: ['Left', 'Bottom'], transform: 'rotate(135deg)' },
  {
    letter: 'w',
    sides: ['Left', 'Bottom'],
    dotStyle: { left: '4px', bottom: '4px' },
    transform: 'rotate(-45deg)'
  },
  {
    letter: 'x',
    sides: ['Left', 'Bottom'],
    dotStyle: { left: '4px', bottom: '4px' },
    transform: 'rotate(135deg)'
  },
  {
    letter: 'y',
    sides: ['Left', 'Bottom'],
    dotStyle: { left: '4px', bottom: '4px' },
    transform: 'rotate(45deg)'
  },
  {
    letter: 'z',
    sides: ['Left', 'Bottom'],
    dotStyle: { left: '4px', bottom: '4px' },
    transform: 'rotate(135deg)'
  }
];
