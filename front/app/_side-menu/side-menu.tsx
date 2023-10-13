import { FC } from "react";
import { VStack, Heading } from "@chakra-ui/react";
import { useSelectSideMenu } from "@sideMenu/hooks/use-select-side-menu";
import { SideMenuItem } from "@sideMenu/side-menu-item";

export const SideMenu: FC<{
  clickedMenu: string;
}> = ({ clickedMenu }) => {
  const { selectedMenuItems, handleClickSideMenu } = useSelectSideMenu();

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
        <SideMenuItem menuName="startDate" selected={true} />
        <SideMenuItem menuName="hour" selected={false} />
        <SideMenuItem menuName="timezone" selected={false} />
        <SideMenuItem menuName="schedule" selected={false} />
      </VStack>
    </VStack>
  );
};
