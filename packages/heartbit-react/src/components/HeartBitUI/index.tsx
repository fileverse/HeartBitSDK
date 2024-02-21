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
import {
  HEART_CV_HEIGHT,
  HEART_CV_WIDTH,
  disableUpEvents,
  makeHeartCanvas,
} from "../../utils";
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
      fillInterval = 750,
      startFilling = false,
    } = props;

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const autFillRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        canvasRef.current = node;
        setCanvasContext(context);
      },
      [defaultFillPos, scale, startFillPos]
    );

    const autoFillHeart = useCallback(() => {
      if (!canvasContext || currentFillIdx >= 10 || !startFilling) return;

      let idx = currentFillIdx;

      autFillRef.current = setInterval(() => {
        if (idx >= 10) {
          if (onMouseUp && typeof onMouseUp === "function") {
            if (canvasRef.current) disableUpEvents(canvasRef.current);
            onMouseUp();
          }
          clearInterval(autFillRef.current as ReturnType<typeof setInterval>);
          return;
        }
        canvasContext.reset();
        makeHeartCanvas({
          canvasContext,
          fillPosition: idx + 1,
          scale,
        });
        if (idx < 11) idx = idx + 1;

        setCurrentFillIdx(idx);
      }, fillInterval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasContext, fillInterval, scale, startFilling]);

    useEffect(() => {
      const cleanup = () => {
        if (autFillRef.current)
          clearInterval(autFillRef.current as ReturnType<typeof setInterval>);
      };

      if (startFilling) autoFillHeart();
      else cleanup();

      return () => {
        cleanup();
      };
    }, [autoFillHeart, startFilling]);

    const onMousedown = (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      if (!canvasContext || currentFillIdx >= 10 || isDisabled) return;

      if (onMouseDown && typeof onMouseDown === "function") onMouseDown(e);

      let idx = currentFillIdx;
      intervalRef.current = setInterval(() => {
        if (idx >= 10) {
          if (onMouseUp && typeof onMouseUp === "function") {
            if (canvasRef.current) disableUpEvents(canvasRef.current);
            onMouseUp();
          }
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
          return;
        }
        canvasContext.reset();
        makeHeartCanvas({
          canvasContext,
          fillPosition: idx + 1,
          scale,
        });

        if (idx < 11) idx += 1;

        setCurrentFillIdx(idx);
      }, fillInterval);
    };

    const onReset = useCallback(() => {
      if (!canvasContext) return;

      canvasContext.reset();
      makeHeartCanvas({
        canvasContext,
        fillPosition: startFillPos || defaultFillPos,
        scale,
      });

      setCurrentFillIdx(startFillPos);
    }, [canvasContext, defaultFillPos, scale, startFillPos]);

    useEffect(() => {
      if (!isDisabled) return;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, [isDisabled]);

    useImperativeHandle(
      ref,
      () => {
        return {
          onReset,
        };
      },
      [onReset]
    );

    const onMouseup = async (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
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
        onTouchStart={onMousedown}
        onTouchEnd={onMouseup}
        onContextMenu={(e) => e.preventDefault()}
        className={clx(styles.heart, {
          [styles.disabled]: isDisabled || disableBeatingAnimation,
        })}
        ref={canvasCallbackRef}
      />
    );
  }
);

export { HeartBitUI, type HeartBitUIProps, type InternalHandlerRef };
