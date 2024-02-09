import {
  useCallback,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import styles from "./index.module.scss";
import type {
  HeartBitUIProps,
  InternalHandlerRef,
  TotalFillRange,
} from "./types";
import { HEART_CV_HEIGHT, HEART_CV_WIDTH, makeHeartCanvas } from "../../utils";
import clx from "classnames";

const HeartBitUI = forwardRef<InternalHandlerRef, HeartBitUIProps>(
  (props, ref) => {
    const {
      scale = 3,
      onMouseDown,
      onMouseUp,
      defaultFillPos = 2,
      startFillPos = 0,
      isDisabled = false,
      disableBeatingAnimation = false,
    } = props;

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [currentFillIdx, setCurrentFillIdx] = useState<TotalFillRange>(0);

    useEffect(() => {
      if (startFillPos) setCurrentFillIdx(startFillPos);
    }, [startFillPos]);

    const [canvasContext, setCanvasContext] =
      useState<CanvasRenderingContext2D | null>(null);

    const canvasCallbackRef = useCallback(
      async (node: HTMLCanvasElement | null) => {
        if (!node) return;

        const context = node.getContext("2d") as CanvasRenderingContext2D;

        node.width = scale * HEART_CV_WIDTH;
        node.height = scale * HEART_CV_HEIGHT;

        makeHeartCanvas({
          canvasContext: context,
          fillPosition: startFillPos || defaultFillPos,
          scale,
        });

        setCanvasContext(context);
      },
      [defaultFillPos, scale, startFillPos]
    );

    const onMousedown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasContext || currentFillIdx >= 10 || isDisabled) return;

      if (onMouseDown && typeof onMouseDown === "function") onMouseDown(e);

      let idx = currentFillIdx;
      intervalRef.current = setInterval(() => {
        if (idx >= 10) {
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
          return;
        }
        canvasContext.reset();
        makeHeartCanvas({
          canvasContext,
          fillPosition: idx + 1,
          scale,
        });

        if (idx < 10) idx += 1;

        setCurrentFillIdx(idx);
      }, 750);
    };

    const onReset = useCallback(() => {
      if (!canvasContext) return;

      canvasContext.reset();
      makeHeartCanvas({
        canvasContext,
        fillPosition: startFillPos || defaultFillPos,
        scale,
      });

      setCanvasContext(canvasContext);

      setCurrentFillIdx(startFillPos);
    }, [canvasContext, defaultFillPos, scale, startFillPos]);

    useImperativeHandle(
      ref,
      () => {
        return {
          onReset,
        };
      },
      [onReset]
    );

    const onMouseup = async (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDisabled) return;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (onMouseUp && typeof onMouseUp === "function") onMouseUp(e);
    };

    return (
      <canvas
        onMouseDown={onMousedown}
        onMouseUp={onMouseup}
        className={clx(styles.heart, {
          [styles.disabled]: isDisabled || disableBeatingAnimation,
        })}
        ref={canvasCallbackRef}
      />
    );
  }
);

export { HeartBitUI, type HeartBitUIProps, type InternalHandlerRef };
