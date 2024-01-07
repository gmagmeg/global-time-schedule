/**
 * @module _common-button
 */

import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

export const CopyButton = ({
  copyText = "コピーする",
  width = "100%",
  handleClickCopyButton,
}: {
  copyText?: string;
  width?: string;
  handleClickCopyButton: () => string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      Promise.all([
        navigator.clipboard.writeText(handleClickCopyButton()),
        setIsCopied(true),
      ]);
    } catch (err) {
      alert("クリップボードにコピーできませんでした");
      setIsCopied(false);
    }
  };

  return (
    <Button
      onClick={() => copyToClipboard()}
      leftIcon={<Box pl={1}>{isCopied ? <FaCheck /> : <FiCopy />}</Box>}
      w={width}
      h={"2.5rem"}
      bg={"#4A7AF8"}
      color={"White"}
    >
      {isCopied ? "済み" : copyText}
    </Button>
  );
};
