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


const Links = ["Dashboard", "Projects", "Team"];

export const GlobalMenu = () => {
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
    </>
  );
};
