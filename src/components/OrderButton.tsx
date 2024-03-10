import { HStack, Icon, Text } from '@chakra-ui/react'
import { FC, useCallback, useMemo } from 'react'

import { ReactComponent as UpdownSort } from '~/assets/svgs/updown-sort.svg'
import { ReactComponent as UpSort } from '~/assets/svgs/up-sort.svg'
import { ReactComponent as DownSort } from '~/assets/svgs/down-sort.svg'

const OrderButton: FC<{
  text: string
  status?: string
  onChangeStatus: (status: string) => void
}> = ({ text, status, onChangeStatus }) => {
  const statusSort = useMemo(() => {
    if (!status) {
      return null
    }

    return status
  }, [status])

  const onChange = useCallback(() => {
    switch (status) {
      case 'up':
        onChangeStatus('down')
        break

      case 'down':
        onChangeStatus(undefined)
        break

      default:
        onChangeStatus('up')
        break
    }
  }, [onChangeStatus, status])

  return (
    <HStack justifyContent="center" onClick={onChange}>
      <Text fontSize="15px" lineHeight="18px" fontWeight="400" color="black">
        {text}
      </Text>

      <Icon
        h="14px"
        w="14px"
        color="#464E5F"
        as={!status ? UpdownSort : status === 'up' ? UpSort : DownSort}
      />
    </HStack>
  )
}

export default OrderButton
