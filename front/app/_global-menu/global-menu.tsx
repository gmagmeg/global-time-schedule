import { FC, useReducer } from "react";
import {
  Box,
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from "@chakra-ui/react";
import { TbWorldCheck } from "react-icons/tb";

import { GlobalMenuReducer } from "./hooks/global-menu-reducer";
import { GlobalMenuState } from "./hooks/global-menu-state";
import { SelectStartDate } from "./select-start-date";

const Links = ["Dashboard", "Projects", "Team"];

export const GlobalMenu: FC = () => {
  const [globalMenuState, globalMenuDispatch] = useReducer(
    GlobalMenuReducer,
    GlobalMenuState
  );

  return (
    <>
      <Box bgColor={"#B4C6EA"} px={4} roundedTopLeft={12} roundedTopRight={12}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <InputGroup key={link}>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={TbWorldCheck} boxSize={6} />
                  </InputLeftElement>
                  <Input type="tel" placeholder="Phone number" bg="white" />
                </InputGroup>
              ))}
            </HStack>
          </HStack>
        </Flex>
      </Box>
      <Box mt={6}>
        <SelectStartDate
          startDateList={globalMenuState.startDateList}
          selectedStartDate={globalMenuState.selectedStartDate}
          handleStartDate={globalMenuDispatch}
        />
      </Box>
    </>
  );
};
