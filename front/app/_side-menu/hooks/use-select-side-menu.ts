import { useState } from "react";
import { SideMenuProps } from "@sideMenu/types/side-menu";
import type { SideMenuName } from "@sideMenu/types/side-menu";

export const useSelectSideMenu = () => {
  const [selectedMenuItems, setSelectedMenuItems] = useState<SideMenuProps[]>([
    {
      menuName: "startDate",
      selected: true,
    },
    {
      menuName: "hour",
      selected: false,
    },
    {
      menuName: "timezone",
      selected: false,
    },
    {
      menuName: "schedule",
      selected: false,
    },
  ]);

  const handleClickSideMenu = (selectedMenu: SideMenuName) => {
    const result = selectedMenuItems.map((item) => {
      const selected = item.menuName === selectedMenu;

      return {
        menuName: item.menuName,
        selected,
      };
    });

    setSelectedMenuItems(result);
  };

  return {
    selectedMenuItems,
    handleClickSideMenu,
  };
};
