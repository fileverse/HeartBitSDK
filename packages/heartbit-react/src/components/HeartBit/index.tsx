import { memo, useCallback, useEffect, useRef, useState } from "react";
import { HeartBitUI, HeartBitProvider, useHeartBit } from "../";
import type { InternalHandlerRef } from "..";
import {
  formatNumbers,
  getNowTimeInSeconds,
  getStartFillPosition,
} from "../../utils";
import styles from "./index.module.scss";
import type { HeartBitProps } from "./types";

interface TotalMintTooltipsProps {
  totalMintsByUser: number;
  totalMintsByHash: number;
  showTotalMintsByUser: boolean;
  showTotalMintsByHash: boolean;
}

const HeartBit = memo(function HeartBit(props: HeartBitProps) {
  const { coreOptions } = props;
  return (
    <HeartBitProvider coreOptions={coreOptions}>
      <HeartBitWithProvider {...props} />
    </HeartBitProvider>
  );
});

const HeartBitWithProvider = (props: HeartBitProps) => {
  const { mintHeartBit, getTotalHeartMintsByUser, getTotalHeartBitByHash } =
    useHeartBit();

  const [isLoading, setLoading] = useState(false);

  const [heartBitBalance, setHeartBitBalance] = useState({
    totalMintsByUser: 0,
    totalMintsByHash: 0,
  });

  const heartBitUIRef = useRef<InternalHandlerRef | null>(null);

  const {
    getSignatureArgsHook,
    hash,
    account,
    showTotalMintsByHash = false,
    showTotalMintsByUser = false,
  } = props;

  const [startTime, setStartTime] = useState<number | null>(null);

  const { totalMintsByUser } = heartBitBalance;

  const startFillPosition = getStartFillPosition(totalMintsByUser);

  const getHeartBitBalances = useCallback(async () => {
    const balances = {
      totalMintsByUser: 0,
      totalMintsByHash: 0,
    };
    try {
      setLoading(true);
      if (showTotalMintsByHash) {
        const totalMintsByHash = await getTotalHeartBitByHash({ hash });
        balances.totalMintsByHash = totalMintsByHash;
      }
      if (showTotalMintsByUser && account) {
        const totalMintsByUser = await getTotalHeartMintsByUser({
          account,
          hash,
        });
        balances.totalMintsByUser = totalMintsByUser;
      }
      setHeartBitBalance(balances);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    account,
    getTotalHeartBitByHash,
    getTotalHeartMintsByUser,
    hash,
    showTotalMintsByHash,
    showTotalMintsByUser,
  ]);

  useEffect(() => {
    getHeartBitBalances();
  }, [getHeartBitBalances]);

  const callMint = async (startTime: number, endTime: number) => {
    if (!startTime || !endTime || isLoading || startFillPosition >= 10) return;
    try {
      setLoading(true);
      const signatureArgs = await getSignatureArgsHook();
      const { onMintCallback, ...restSignatureArgs } = signatureArgs;

      await mintHeartBit({
        startTime,
        endTime,
        hash,
        ...restSignatureArgs,
      });

      await getHeartBitBalances();
      if (typeof onMintCallback === "function") onMintCallback();
    } catch (err) {
      console.error(err);
      heartBitUIRef.current?.onReset();
    } finally {
      setLoading(false);
      setStartTime(null);
    }
  };

  const onMouseDown = () => {
    setStartTime(getNowTimeInSeconds());
  };

  const onMouseUp = async () => {
    const endTime = getNowTimeInSeconds();
    await callMint(startTime || getNowTimeInSeconds(), endTime);
  };

  return (
    <div className={styles.heart_bit_container}>
      <HeartBitUI
        ref={heartBitUIRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        isDisabled={isLoading}
        startFillPos={startFillPosition}
        {...props}
      />
      <TotalMintTooltips
        {...heartBitBalance}
        showTotalMintsByUser={showTotalMintsByUser}
        showTotalMintsByHash={showTotalMintsByHash}
      />
    </div>
  );
};

const TotalMintTooltips = (props: TotalMintTooltipsProps) => {
  const {
    totalMintsByUser,
    totalMintsByHash,
    showTotalMintsByUser,
    showTotalMintsByHash,
  } = props;

  if (!showTotalMintsByUser && !showTotalMintsByHash) return null;

  return (
    <div className={styles.tooltip}>
      {showTotalMintsByUser && <div>{formatNumbers(totalMintsByUser)}</div>}
      {showTotalMintsByHash && <div>{formatNumbers(totalMintsByHash)}</div>}
    </div>
  );
};

export { HeartBit, type HeartBitProps };
