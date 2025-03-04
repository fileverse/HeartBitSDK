const t = "transparent",
  r = "red",
  b = "#000", w = "#fff";

const HEART_FIRST_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [t, b, w, w, w, w, w, w, w, w, w, b, t],
  [t, t, b, w, w, w, w, w, w, w, b, t, t],
  [t, t, t, b, w, w, w, w, w, b, t, t, t],
  [t, t, t, t, b, w, w, w, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_SECOND_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [t, b, w, w, w, w, w, w, w, w, w, b, t],
  [t, t, b, w, w, w, w, w, w, w, b, t, t],
  [t, t, t, b, w, w, w, w, w, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_THIRD_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [t, b, w, w, w, w, w, w, w, w, w, b, t],
  [t, t, b, w, w, w, w, w, w, w, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_FOURTH_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [t, b, w, w, w, w, w, w, w, w, w, b, t],
  [t, t, b, r, r, r, r, r, r, r, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_FIFTH_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [t, b, r, r, r, r, r, r, r, r, r, b, t],
  [t, t, b, r, r, r, r, r, r, r, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_SIXTH_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [t, b, r, r, r, r, r, r, r, r, r, b, t],
  [t, t, b, r, r, r, r, r, r, r, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_SEVENTH_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, w, w, w, w, w, w, w, w, w, w, w, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [t, b, r, r, r, r, r, r, r, r, r, b, t],
  [t, t, b, r, r, r, r, r, r, r, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_EIGHTH_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, w, w, w, w, w, b, w, w, w, w, w, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [t, b, r, r, r, r, r, r, r, r, r, b, t],
  [t, t, b, r, r, r, r, r, r, r, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_NINETH_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, w, w, w, b, t, b, w, w, w, b, t],
  [b, r, r, r, r, r, b, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [t, b, r, r, r, r, r, r, r, r, r, b, t],
  [t, t, b, r, r, r, r, r, r, r, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

const HEART_TENTH_FILL: string[][] = [
  [t, t, b, b, b, t, t, t, b, b, b, t, t],
  [t, b, r, r, r, b, t, b, r, r, r, b, t],
  [b, r, r, r, r, r, b, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [b, r, r, r, r, r, r, r, r, r, r, r, b],
  [t, b, r, r, r, r, r, r, r, r, r, b, t],
  [t, t, b, r, r, r, r, r, r, r, b, t, t],
  [t, t, t, b, r, r, r, r, r, b, t, t, t],
  [t, t, t, t, b, r, r, r, b, t, t, t, t],
  [t, t, t, t, t, b, r, b, t, t, t, t, t],
  [t, t, t, t, t, t, b, t, t, t, t, t, t],
];

interface HeartFillStates {
  [key: number]: string[][];
}

export const HEART_FILL_STATES: HeartFillStates = {
  1: HEART_FIRST_FILL,
  2: HEART_SECOND_FILL,
  3: HEART_THIRD_FILL,
  4: HEART_FOURTH_FILL,
  5: HEART_FIFTH_FILL,
  6: HEART_SIXTH_FILL,
  7: HEART_SEVENTH_FILL,
  8: HEART_EIGHTH_FILL,
  9: HEART_NINETH_FILL,
  10: HEART_TENTH_FILL,
};
