/**
 * @module page
 */
import { Box, Flex, Grid } from "@chakra-ui/react";
import { MainContents } from "../src/main-contents";

export default function Schedule() {
  return (
    <Box
      w={{ md: "60vw", base: "90vw" }}
      ml={"auto"}
      mr={{ md: "", base: "auto" }}
    >
      <MainContents />
    </Box>
  )
}
