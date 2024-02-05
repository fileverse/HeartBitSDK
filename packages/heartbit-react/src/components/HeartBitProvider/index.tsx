import { createContext, useState } from "react";
import { getNowTimeInSeconds } from "../../utils";
import {
  IHeartBitContext,
  HeartBitProviderProps,
  TimeStampState,
} from "./types";

export const HeartBitContext = createContext<IHeartBitContext | null>(null);

export const HeartBitProvider = (props: HeartBitProviderProps) => {
  const { children } = props;

  const [timeStamps, setTimeStamps] = useState<TimeStampState>({
    startTime: 0,
    endTime: 0,
  });

  const onMouseDown = () => {
    setTimeStamps((prevState) => ({
      ...prevState,
      startTime: getNowTimeInSeconds(),
    }));
  };

  const onMouseUp = () => {
    setTimeStamps((prevState) => ({
      ...prevState,
      endTime: getNowTimeInSeconds(),
    }));
  };

  const contextValue = {
    onMouseDown,
    onMouseUp,
    ...timeStamps,
  };

  return (
    <HeartBitContext.Provider value={contextValue}>
      {children}
    </HeartBitContext.Provider>
  );
};
