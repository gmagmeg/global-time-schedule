import { FC } from "react";
import NextLink from "next/link";
import {
  VStack,
  Heading,
  Icon,
  GridItem,
  Grid,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { SlCalender } from "react-icons/sl";
import { Tb12Hours } from "react-icons/tb";
import { ImEarth } from "react-icons/im";
import { MdStart } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { BsClockHistory } from "react-icons/bs";

export const SideMenu: FC<{}> = ({}) => {
  return (
    <VStack
      w="30%"
      minH="100vh"
      spacing={3}
      alignItems="flex-start"
      bg="purple.300"
      color="white"
    >
      <Heading size="lg" p={3}>
        Logo
      </Heading>
      <VStack spacing={1} alignItems="flex-start" w="100%">
        <Link display={"grid"} color="purple.300" bg="white" w="100%" p={2}>
          <Flex align="center">
            <Icon as={MdStart} boxSize="2em" mr={2} />
            <VStack alignItems="start" spacing={0}>
              <Text>STEP1</Text>
              <Text>開始日選択</Text>
            </VStack>
          </Flex>
        </Link>
        <Link
          w="100%"
          p={2}
          pb={4}
          borderBottom="1px solid"
          borderColor={"purple.200"}
        >
          <Flex align="center">
            <Icon as={BsClockHistory} boxSize="2em" mr={2} />
            <VStack alignItems="start" spacing={0}>
              <Text>STEP2</Text>
              <Text>時間設定</Text>
            </VStack>
          </Flex>
        </Link>
        <Link
          w="100%"
          p={2}
          pb={4}
          borderBottom="1px solid"
          borderColor={"purple.200"}
        >
          <Flex align="center">
            <Icon as={ImEarth} boxSize="2em" mr={2} />
            <VStack alignItems="start" spacing={0}>
              <Text>STEP3</Text>
              <Text>タイムゾーン設定</Text>
            </VStack>
          </Flex>
        </Link>
        <Link
          w="100%"
          p={2}
          pb={4}
          borderBottom="1px solid"
          borderColor={"purple.200"}
        >
          <Flex align="center">
            <Icon as={SlCalender} boxSize="2em" mr={2} />
            <VStack alignItems="start" spacing={0}>
              <Text>STEP4</Text>
              <Text>スケジュール確認</Text>
            </VStack>
          </Flex>
        </Link>
      </VStack>
    </VStack>
  );
};
