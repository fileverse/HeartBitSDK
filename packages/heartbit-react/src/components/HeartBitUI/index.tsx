import React from "react";
import { useCallback, useRef, useState, memo } from "react";
import styles from "./index.module.scss";
import { HeartBitUIProps } from "./types";
import { HEART_CV_HEIGHT, HEART_CV_WIDTH, makeHeartCanvas } from "../../utils";

export const HeartBitUI = memo(function HeartBitUI(props: HeartBitUIProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [currentFillIdx, setCurrentFillIdx] = useState(0);

  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const {
    scale = 3,
    showFillPercentage = false,
    onMouseDown,
    onMouseUp,
  } = props;

  const canvasCallbackRef = useCallback(
    async (node: HTMLCanvasElement | null) => {
      if (!node) return;

      const context = node.getContext("2d") as CanvasRenderingContext2D;

      node.width = scale * HEART_CV_WIDTH;
      node.height = scale * HEART_CV_HEIGHT;

      makeHeartCanvas({
        canvasContext: context,
        fillPosition: 1,
        scale,
      });

      setCanvasContext(context);
    },
    [scale]
  );

  const onMousedown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasContext || currentFillIdx >= 10) return;

    if (onMouseDown && typeof onMouseDown === "function") onMouseDown(e);

    let idx = currentFillIdx;
    intervalRef.current = setInterval(() => {
      canvasContext.reset();
      if (idx >= 10) {
        clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
        return;
      }

      makeHeartCanvas({
        canvasContext,
        fillPosition: idx + 1,
        scale,
      });

      if (idx < 10) idx += 1;

      setCurrentFillIdx(idx);
    }, 750);
  };

  // const onReset = () => {
  //   if (!canvasContext) return;

  //   canvasContext.reset();
  //   makeHeartCanvas({
  //     canvasContext,
  //     fillPosition: 1,
  //     scale,
  //   });
  //   setCanvasContext(canvasContext);
  // };

  const onMouseup = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (onMouseUp && typeof onMouseUp === "function") onMouseUp(e);
  };
  const fillText = currentFillIdx ? `${currentFillIdx * 10} %` : "0 %";
  return (
    <div className={styles.heart_container}>
      <canvas
        onMouseDown={onMousedown}
        onMouseUp={onMouseup}
        className={styles.heart}
        ref={canvasCallbackRef}
      />
      {showFillPercentage && <div className={styles.tooltip}>{fillText}</div>}
    </div>
  );
});

// const CoreSDK = useMemo(() => {
//   return new HeartbitCore(coreOptions)
// }, [coreOptions])

// const fetchUserBalance = useCallback(async () => {
//   if (!CoreSDK || !address) return

//   const url = getHashedString(window.location.href)
//   const balance = await CoreSDK.getUserBalance({ address, url })

//   setUserBalance(balance)

//   // if (balance > 10)
//   //   setMintedPercentage(() => {
//   //     if (balance >= 100) return NumberMap[100]
//   //     const res = Math.round(balance / 10) * 10
//   //     return NumberMap[res]
//   //   })
// }, [CoreSDK, address])

// useEffect(() => {
//   fetchUserBalance()
// }, [fetchUserBalance])

// const callMint = async () => {
//   try {
//     if (!CoreSDK || !address) return
//     const { message, signature, url, onMintCallback } =
//       await getSignatureArgsHook()

//     const response = await CoreSDK.mintHeartbit({
//       address,
//       message,
//       signature,
//       startBlock: await CoreSDK.getStartBlock(),
//       url,
//     })

//     await fetchUserBalance()
//     if (onMintCallback && typeof onMintCallback === 'function')
//       onMintCallback()
//     else return response
//   } catch (err) {
//     onReset()
//   } finally {
//     setSigning(false)
//   }
// }
