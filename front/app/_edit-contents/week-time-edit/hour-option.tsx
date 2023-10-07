import { FC } from "react";
import { CustomRadioButton } from "@app/util-parts/custom-radio-button";
import { HOUR_OPTION } from "@editContents/week-time-edit/types/hour-option";
import { HourOptionProps } from "@editContents/week-time-edit/types/hour-option";
import { Flex, Icon, Radio, RadioGroup, flexbox } from "@chakra-ui/react";
import { Tb12Hours, Tb24Hours } from "react-icons/tb";

/**
 * @todo
 * 12時間と24時間のアイコンを追加する
 */
export const HourOption: FC<HourOptionProps> = ({ checked, onChange }) => {
  return (
    <RadioGroup display={"flex"} flexDirection={"column"} onChange={onChange} value={checked}>
      <Radio value={HOUR_OPTION.half}>
        <Flex direction={"row"} alignItems={"center"}>
          <Icon boxSize={6} as={Tb12Hours} mr={0.5} />
          12時間表記
        </Flex>
      </Radio>

      <Radio mt={2} value={HOUR_OPTION.full}>
        <Flex direction={"row"} alignItems={"center"}>
          <Icon boxSize={6} as={Tb24Hours} mr={0.5} />
          24時間表記
        </Flex>
      </Radio>
    </RadioGroup>
  );
};
