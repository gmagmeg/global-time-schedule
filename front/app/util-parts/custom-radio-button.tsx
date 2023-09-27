/**
 * ChakraのRadioボタンのonClickにexValueを渡せるように拡張したコンポーネント
 */
import { MouseEvent } from "react";
import { Radio as ChakraRadio, RadioProps } from "@chakra-ui/react";

type ExtendedRadioProps<T> = RadioProps & {
  customOnClick?: (customValue: T, event: MouseEvent<HTMLDivElement>) => void;
  customValue?: T;
};

export const CustomRadioButton = <T,>({
  customOnClick,
  onClick,
  customValue,
  ...props
}: ExtendedRadioProps<T>) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
    if (customOnClick && customValue !== undefined) {
      customOnClick(customValue, event);
    }
  };

  return <ChakraRadio onClick={handleClick} {...props} />;
};
