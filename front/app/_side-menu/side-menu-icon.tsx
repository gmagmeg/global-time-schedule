import { Icon } from "@chakra-ui/react";
import { ImEarth } from "react-icons/im";
import { MdStart } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { SideMenuName } from "./types/side-menu";

import { FC } from "react";

export const SideMenuIcon: FC<{ menuName: SideMenuName }> = ({ menuName }) => {
  let icon = BsClockHistory;
  if (menuName === "startDate") {
    icon = MdStart;
  } else if (menuName === "hour") {
    icon = BsClockHistory;
  } else if (menuName === "timezone") {
    icon = ImEarth;
  } else if (menuName === "schedule") {
    icon = SlCalender;
  }

  return <Icon as={icon} boxSize="2em" mr={2} />;
};
