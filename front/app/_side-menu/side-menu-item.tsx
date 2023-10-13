import { Flex, Text, VStack, Link } from "@chakra-ui/react";
import { FC } from "react";
import { SideMenuIcon } from "@sideMenu/side-menu-icon";
import { SideMenuName } from "./types/side-menu";

export const SideMenuItem: FC<{
  menuName: SideMenuName;
  selected: boolean;
}> = ({ menuName, selected }) => {
  const selectedStyle = selected
    ? { bg: "white", color: "purple.300" }
    : { bg: "purple.300", color: "white" };

  let display = {
    menuName: "",
    stepNumber: 0,
  };
  if (menuName === "startDate") {
    display = {
      menuName: "開始日選択",
      stepNumber: 1,
    };
  } else if (menuName === "hour") {
    display = {
      menuName: "時間設定",
      stepNumber: 2,
    };
  } else if (menuName === "timezone") {
    display = {
      menuName: "タイムゾーン設定",
      stepNumber: 3,
    };
  } else if (menuName === "schedule") {
    display = {
      menuName: "スケジュール設定",
      stepNumber: 4,
    };
  }

  return (
    <Link
      display={"grid"}
      {...selectedStyle}
      w="100%"
      p={2}
      borderBottom="1px solid"
      borderColor={"purple.200"}
    >
      <Flex align="center">
        <SideMenuIcon menuName={menuName} />
        <VStack alignItems="start" spacing={0}>
          <Text>STEP{display.stepNumber}</Text>
          <Text>{display.menuName}</Text>
        </VStack>
      </Flex>
    </Link>
  );
};
