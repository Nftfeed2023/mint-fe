import { Box } from '@chakra-ui/react'
import HeaderMobile from '~/components/Header.mobile'

const WrapperHeader = () => {
  return (
    <Box
      position="fixed"
      bg="white"
      top={0}
      left={0}
      right={0}
      pt="10px"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      zIndex={20}
      pb="10px"
      display={{
        base: 'block',
        lg: 'none',
      }}
    >
      <HeaderMobile isHideSearch={false} />
    </Box>
  )
}

export default WrapperHeader
