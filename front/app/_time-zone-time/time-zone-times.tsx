import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { CopyButton } from '../_common-button/copy-button';
import { ScheduleState } from '../schedule/hooks/schedule-reducer';
export const TimeZoneTimes: FC<{
  timeZones: ScheduleState["timeZones"];
  weekDateTimes: ScheduleState["weekDateTimes"];
}> = ({
  timeZones, weekDateTimes
}) => {
  /**
   * タイムゾーンと時間を受け取れると、計算できる
   */
  return (
  <>
    <Box mr={8}>
      <CopyButton />
    </Box>
    <Box>
      {timeZones.map((timeZone, index) => {
        /**
         * @todo ここでタイムゾーンを計算して、表示するようにする
         */
        return (
          <Text key={index}>

          </Text>
        )
      })};
    </Box>
  </> 
)
}