import { TimeZone } from '@/library/type-date';
import { Button, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { CopyButton } from '../_common-button/copy-button';
import { CiTimer } from 'react-icons/ci';
export const StarDateSetting: FC<{
  timeZones: TimeZone[];
  onModalOpen: (index: number) => void;
}> = ({ timeZones, onModalOpen }) => {
  
  return (
    <Flex
    px={4}
    roundedTopLeft={12}
    roundedTopRight={12}
    alignItems={"baseline"}
  >
    {timeZones.map((timeZone: TimeZone, index: number) => (
      <Flex key={timeZone} w={"30%"} alignItems={"baseline"} mt={6}>
        <Text pr={2}>
          <Icon as={CiTimer}></Icon> {timeZone}
        </Text>
        <Button mb={4} onClick={() => onModalOpen(index)}>
          変更する
        </Button>
      </Flex>
    ))}
    <CopyButton copyText="全件コピー" width="10%" />
    </Flex> 
)
}