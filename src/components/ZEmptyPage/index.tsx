import { memo, FC, ReactNode, CSSProperties } from "react";
import { Empty, Button } from "@taroify/core";

interface IProps {
  emptyScrStyles: CSSProperties;
  emptySrc: "error" | "network" | "search" | string;
  emptyText: string | ReactNode;
  emptyBtnText: string;
  onReload?: () => void;
  retry: boolean;
}

const ZEmptyPage: FC<IProps> = props => {
  const {
    emptySrc,
    emptyText,
    emptyBtnText,
    onReload,
    retry,
    emptyScrStyles = {}
  } = props;

  const onClick = () => {
    onReload?.();
  };

  return (
    <Empty>
      <Empty.Image src={emptySrc} style={emptyScrStyles} />
      <Empty.Description>{emptyText}</Empty.Description>
      {retry && (
        <Button shape="round" color="danger" onClick={onClick}>
          {emptyBtnText}
        </Button>
      )}
    </Empty>
  );
};
export default memo(ZEmptyPage);
