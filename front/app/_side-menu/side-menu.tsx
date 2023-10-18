import { FC } from "react";
import { VStack, Heading } from "@chakra-ui/react";
import { useSelectSideMenu } from "@sideMenu/hooks/use-select-side-menu";
import { SideMenuItem } from "@sideMenu/side-menu-item";
import { SideMenuName } from "@sideMenu/types/side-menu";

export const SideMenu: FC<{
  selectedMenu: SideMenuName;
}> = ({ selectedMenu }) => {
  const { selectedMenuItems, handleSelectedSideMenu } = useSelectSideMenu();

  const onClick = (selectedMenu: SideMenuName) => {
    handleSelectedSideMenu(selectedMenu);
  };

  return (
    <VStack
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
        <SideMenuItem
          menuName="startDate"
          selected={selectedMenuItems.startDate}
          onClick={onClick}
        />
        <SideMenuItem
          menuName="hour"
          selected={selectedMenuItems.hour}
          onClick={onClick}
        />
        <SideMenuItem
          menuName="timezone"
          selected={selectedMenuItems.timezone}
          onClick={onClick}
        />
        <SideMenuItem
          menuName="schedule"
          selected={selectedMenuItems.schedule}
          onClick={onClick}
        />
      </VStack>
    </VStack>
  );
};
