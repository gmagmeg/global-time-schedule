/**
 * @module _common-button
 */

import { Box, Button } from "@chakra-ui/react";
import { FC } from "react";
import { FiCopy } from "react-icons/fi";

export const CopyButton: FC<{
  enableCopy: boolean;
  content?: string;
}> = ({ enableCopy, content = "コピー" }) => {
  const selectedColorScheme = {
    bgColor: "#4A7AF8",
    color: "White",
  };

  const colorScheme = {
    bgColor: "#B4C6EA",
    color: "White",
  };

  const buttonColorScheme = enableCopy ? selectedColorScheme : colorScheme;

  return (
    <Button
      leftIcon={
        <Box pl={1}>
          <FiCopy />
        </Box>
      }
      w={"100%"}
      h={"2.5rem"}
      bg={buttonColorScheme.bgColor}
      color={buttonColorScheme.color}
    >
      {content}
    </Button>
  );
};
