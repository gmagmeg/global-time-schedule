/**
 * ChakraのRadioボタンのonClickにvalueを渡せるように拡張したコンポーネント
 */
import { MouseEvent } from "react";
import { Radio as ChakraRadio, RadioProps } from "@chakra-ui/react";

type ExtendedRadioProps = RadioProps & {
  extendedOnClick?: (value: string, event: MouseEvent<HTMLDivElement>) => void;
  value?: string;
};

export const CustomRadioButton = ({
  extendedOnClick,
  onClick,
  value,
  ...props
}: ExtendedRadioProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
    if (extendedOnClick && value !== undefined) {
      extendedOnClick(value, event);
    }
  };

  return <ChakraRadio onClick={handleClick} {...props} />;
};
