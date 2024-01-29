/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import styles from "./index.module.scss";
import clx from "classnames";
import { HeartbitCore, getHashedString } from "@heartbit/sdk-core";
import { HeartBitProps } from "..";

const NumberMap: { [key: number]: string } = {
  10: "ten",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
  100: "hundred",
};

export const HeartBit = memo(function HeartBit(props: HeartBitProps) {
  const [mintedPercentage, setMintedPercentage] = useState(NumberMap[20]);

  const [isSigning, setSigning] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [userBalance, setUserBalance] = useState<number>(0);

  const { coreOptions, getMinterParams, address } = props;

  const CoreSDK = useMemo(() => {
    return new HeartbitCore(coreOptions);
  }, [coreOptions]);

  const fetchUserBalance = useCallback(async () => {
    if (!CoreSDK || !address) return;

    const url = getHashedString(window.location.href);
    const balance = await CoreSDK.getUserBalance({ address, url });

    setUserBalance(balance);
    if (balance > 10)
      setMintedPercentage(() => {
        if (balance >= 100) return NumberMap[100];
        const res = Math.round(balance / 10) * 10;
        return NumberMap[res];
      });
  }, [CoreSDK, address]);

  useEffect(() => {
    fetchUserBalance();
  }, [fetchUserBalance]);

  const callMint = async () => {
    try {
      if (!CoreSDK || !address) return;
      const { message, signature, url, onMintCallback } =
        await getMinterParams();
      const response = await CoreSDK.mintHeartbit({
        address,
        message,
        signature,
        startBlock: await CoreSDK.getStartBlock(),
        url,
      });

      await fetchUserBalance();
      if (onMintCallback && typeof onMintCallback === "function")
        onMintCallback();
      else return response;
    } catch (err) {
      console.log(err);
    } finally {
      setSigning(false);
    }
  };

  const handleMouseDown = () => {
    if (userBalance > 60 || isSigning) return;
    let internalCount = 0;

    intervalRef.current = setInterval(() => {
      if (internalCount === 100) {
        clearInterval(intervalRef.current!);
        setSigning(true);
        callMint();
        return;
      }
      internalCount += 1;
      if (NumberMap[internalCount])
        setMintedPercentage(NumberMap[internalCount]);
    }, 60);
  };

  const handleMouseLeave = async () => {
    if (isSigning || userBalance > 60) return;
    setSigning(true);

    callMint();
    clearInterval(intervalRef.current!);
  };

  return (
    <div
      onMouseUp={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseLeave}
      className={clx(styles.heart, styles[mintedPercentage], {
        [styles.completed]: mintedPercentage === NumberMap[100],
      })}
    />
  );
});

// Experimental

// const t = "transparent",
//   r = "red",
//   b = "#000";

// const m = [
//   [t, t, t, t, t, t, t, t, t, t, t, t, t],
//   [t, t, b, b, b, t, t, t, b, b, b, t, t],
//   [t, b, t, t, t, b, t, b, t, t, t, b, t],
//   [b, t, t, t, t, t, b, t, t, t, t, t, b],
//   [b, t, t, t, t, t, t, t, t, t, t, t, b],
//   [b, t, t, t, t, t, t, t, t, t, t, t, b],
//   [t, b, t, t, t, t, t, t, t, t, t, b, t],
//   [t, t, b, t, t, t, t, t, t, t, b, t, t],
//   [t, t, t, b, t, t, t, t, t, b, t, t, t],
//   [t, t, t, t, b, r, r, r, b, t, t, t, t],
//   [t, t, t, t, t, b, r, b, t, t, t, t, t],
//   [t, t, t, t, t, t, b, t, t, t, t, t, t],
//   [t, t, t, t, t, t, t, t, t, t, t, t, t],
// ];

// export const HeartBit = (props: HeartBitProps) => {
//   const { scale } = props;
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d") as CanvasRenderingContext2D;
//     let x = 0,
//       y = 0;

//     const w = 13;

//     canvas.width = canvas.height = scale * w;
//     m.forEach((row) => {
//       for (let i = 0; i < row.length; i++) {
//         if (x == w * scale) {
//           x = 0;
//           y += scale;
//         }

//         context.fillStyle = row[i];
//         context.fillRect(x, y, scale, scale);
//         x += scale;
//       }
//     });
//   }, [scale]);

//   // const startAnimation = () => {};

//   const onMouseUp = () => {
//     const interval = intervalRef.current;
//     if (interval) clearInterval(interval);
//     console.log(intervalRef);
//   };

//   const onMouseDown = () => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//     ctx.fillStyle = "red";
//     let idx = 8;
//     intervalRef.current = setInterval(() => {
//       if (idx === 1) clearInterval(intervalRef.current!);
//       else {
//         const startIndex = m[idx].indexOf(b);
//         const endIndex = m[idx].lastIndexOf(b);
//         const toColor = m[idx].slice(startIndex + 1, endIndex);
//         if (idx === 3) {
//           const mid = Math.floor(toColor.length / 2);
//           ctx.fillRect(
//             scale * (startIndex + 1),
//             scale * idx,
//             scale * mid,
//             scale
//           );
//           ctx.fillRect(scale * (mid + 2), scale * idx, scale * mid, scale);
//         } else if (idx === 2) {
//           ctx.fillRect(scale * (startIndex + 1), scale * idx, scale * 3, scale);
//           ctx.fillRect(scale * (endIndex - 3), scale * idx, scale * 3, scale);
//         } else
//           ctx.fillRect(
//             scale * (startIndex + 1),
//             scale * idx,
//             scale * toColor.length,
//             scale
//           );
//         idx--;
//       }
//     }, 750);
//   };

//   return (
//     <div style={{ cursor: "pointer" }}>
//       <canvas onMouseUp={onMouseUp} onMouseDown={onMouseDown} ref={canvasRef} />
//     </div>
//   );
// };
