import { Text, VStack, Avatar } from '@chakra-ui/react'

const PhaseCard = ({ description = '', title = '' }) => {
  return (
    <VStack
      bg="#F9F9FA"
      border="1px solid #CCCDD5"
      borderRadius="12px"
      p="24px"
    >
      <Text
        textTransform="capitalize"
        fontSize="16px"
        lineHeight="20px"
        color="#E0AD00"
        textAlign="center"
        fontWeight="600"
      >
        {title}
      </Text>

      <Avatar
        ml={{
          base: '10px',
          md: 0,
        }}
        w="62px"
        h="62px"
        src="/assets/images/demo/avatar.png"
      />

      <Text
        textTransform="capitalize"
        fontSize="20px"
        lineHeight="23px"
        color="secondary"
        fontWeight="600"
        textAlign="center"
      >
        {description}
      </Text>
    </VStack>
  )
}

export default PhaseCard
