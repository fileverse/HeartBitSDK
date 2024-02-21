import { HEART_FILL_STATES } from "../constants";

interface UpdateCanvasFillArgs {
  canvasContext: CanvasRenderingContext2D;
  fillPosition: number;
  scale: number;
}

export const HEART_CV_WIDTH = 13;
export const HEART_CV_HEIGHT = 12;

export const makeHeartCanvas = (opts: UpdateCanvasFillArgs) => {
  const { canvasContext, fillPosition, scale } = opts;
  let x = 0;
  let y = 0;

  const heartToMake = HEART_FILL_STATES[fillPosition];
  if (!heartToMake) {
    console.warn("No heart fill state found for fill position:", fillPosition);
    return;
  }

  heartToMake.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (x == HEART_CV_WIDTH * scale) {
        x = 0;
        y += scale;
      }

      canvasContext.fillStyle = row[i];
      canvasContext.fillRect(x, y, scale, scale);
      x += scale;
    }
  });
};

export const getNowTimeInSeconds = () => Math.floor(Date.now() / 1000);

export const formatNumbers = (num: number) => {
  if (num < 1000) return num.toString();
  if (num < 10000)
    return num.toString().slice(0, 1) + "," + num.toString().slice(1);
  if (num < 1000000) {
    if (num % 1000 === 0) return num / 1000 + "K";
    return (num / 1000).toFixed(1) + "K";
  }
  if (num % 1000000 === 0) return num / 1000000 + "M";
  return (num / 1000000).toFixed(1) + "M";
};

export const getStartFillPosition = (totalMintsByUser: number) => {
  if (totalMintsByUser >= 100) return 10;
  if (totalMintsByUser < 60) return 0;
  return 5;
};

export const addSelfDestructingEventListener = (
  element: HTMLElement,
  event: string,
  callback: (event: Event) => void
) => {
  const handler = (e: Event) => {
    callback(e);
    element.removeEventListener(event, handler, true);
  };
  element.addEventListener(event, handler, true);
};

export const disableUpEvents = (element: HTMLElement) => {
  addSelfDestructingEventListener(element, "mouseup", (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
  addSelfDestructingEventListener(element, "touchend", (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
};
