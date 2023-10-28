import { SideMenu } from "@app/_side-menu/side-menu";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { FC } from "react";
import { EditContents } from "../_edit-contents/edit-contents";
import { WEEK } from "@editContents/week-time-edit/types/week-time-edit";

export const MainContents: FC = () => {
  return (
    <Grid templateColumns="1fr 4fr" gap={6}>
      <GridItem colSpan={1}>
        <EditContents week={WEEK} currentDate={new Date()} weekStartDay="Sun" />
      </GridItem>
    </Grid>
  );
};
