import { useContext } from "react";
import { HeartBitContext } from ".";

export const useHeartBit = () => {
  const context = useContext(HeartBitContext);
  if (!context) {
    throw new Error("useHeartBit must be used within a HeartBitProvider");
  }
  return context;
};
