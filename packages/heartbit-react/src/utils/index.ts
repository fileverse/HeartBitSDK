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
