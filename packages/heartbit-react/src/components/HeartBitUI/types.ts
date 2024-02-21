export type TotalFillRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type DefaultFillRange = 1 | 2 | 3 | 4 | 5;
export interface HeartBitUIProps {
  onMouseUp?: (
    event?:
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
      | React.TouchEvent<HTMLCanvasElement>
  ) => void;
  onMouseDown?: (
    event?:
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
      | React.TouchEvent<HTMLCanvasElement>
  ) => void;
  scale?: number;
  defaultFillPos?: DefaultFillRange;
  startFillPos?: TotalFillRange;
  isDisabled?: boolean;
  disableBeatingAnimation?: boolean;
  fillInterval?: number;
  startFilling?: boolean;
}

export interface InternalHandlerRef {
  onReset: () => void;
}
