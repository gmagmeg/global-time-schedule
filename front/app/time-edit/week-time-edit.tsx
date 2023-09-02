import { ChakraProvider, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { TimeEdit } from "./time-edit";
import { Week } from "./types-time-edit";

/**
 * @todo storybook用のWrapperを作成して、chakraProviderを共通化する
 */

export const WeekTimeEdit: FC<{
  week: Week;
}> = ({ week = ["月", "火", "水", "木", "金", "土", "日"] }) => {
  return (
    <ChakraProvider>
      <Flex>
        {week.map((youbi) => (
          <>
            <TimeEdit key={youbi} youbi={youbi} marginRight={1} />
          </>
        ))}
      </Flex>
    </ChakraProvider>
  );
};
