export type SideMenuName = "startDate" | "hour" | "timezone" | "schedule";

export type SideMenuProps = {
  menuName: SideMenuName;
  selected: boolean;
};
