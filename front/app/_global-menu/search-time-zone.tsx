/**
 * @module _global-menu
 */

import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import { TbWorldCheck } from "react-icons/tb";
import { FC } from "react";

const Links = ["Dashboard", "Projects", "Team"];

export const SearchTimeZone: FC = () => {
  return (
    <SimpleGrid minChildWidth="10rem" spacing="40px" pt={3} pb={3}>
      {Links.map((link) => (
        <InputGroup key={link} w={"full"}>
          <InputLeftElement pointerEvents="none">
            <Icon as={TbWorldCheck} boxSize={6} />
          </InputLeftElement>
          <Input type="tel" placeholder="Phone number" bg="white" />
        </InputGroup>
      ))}
    </SimpleGrid>
  );
};
