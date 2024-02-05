import { memo } from "react";
import { HeartbitCoreOptions } from "../..";
import { HeartBitUI, HeartBitProvider, useHeartBit } from "../";

interface HeartBitProps {
  coreOptions: HeartbitCoreOptions;
}

export const HeartBit = memo(function HeartBit(props: HeartBitProps) {
  const { coreOptions } = props;
  return (
    <HeartBitProvider coreOptions={coreOptions}>
      <HeartBitWithProvider />
    </HeartBitProvider>
  );
});

const HeartBitWithProvider = () => {
  const { onMouseDown, onMouseUp } = useHeartBit();

  return <HeartBitUI onMouseDown={onMouseDown} onMouseUp={onMouseUp} />;
};
