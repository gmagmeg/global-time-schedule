/**
 * ChakraのRadioボタンのonClickにvalueを渡せるように拡張したコンポーネント
 */
import { Radio as ChakraRadio, RadioProps } from "@chakra-ui/react";

type ExtendedRadioProps<T> = RadioProps & {
  extendedOnClick?: (value: T, event: React.MouseEvent<HTMLDivElement>) => void;
  value?: T;
};

export const CustomRadioButton = <T,>({ extendedOnClick, onClick, value, ...props }: ExtendedRadioProps<T>) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
    if (extendedOnClick && value !== undefined) {
      extendedOnClick(value, event);
    }
  };

  return <ChakraRadio onClick={handleClick} {...props} />;
};
