import { useState } from "react";
import { SideMenuProps } from "@sideMenu/types/side-menu";
import type { SideMenuName } from "@sideMenu/types/side-menu";

export const useSelectSideMenu = () => {
  const [selectedMenuItems, setSelectedMenuItems] = useState<SideMenuProps>({
    startDate: true,
    hour: false,
    timezone: false,
    schedule: false,
  });

  const handleSelectedSideMenu = (selectedMenu: SideMenuName) => {
    setSelectedMenuItems({
      startDate: false,
      hour: false,
      timezone: false,
      schedule: false,
      [selectedMenu]: true,
    });
  };

  return {
    selectedMenuItems,
    handleSelectedSideMenu,
  };
};
