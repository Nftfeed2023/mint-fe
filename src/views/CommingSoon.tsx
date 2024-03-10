import { Flex, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '~/layouts/MainLayout'
import PrimaryButton from '~/components/PrimaryButton'

const CommingSoon = () => {
  const navigate = useNavigate()
  return (
    <MainLayout>
      <Flex justifyContent="center" alignItems="center" flex={1} h="100%">
        <VStack spacing="40px">
          <Text
            color="grey.66"
            textAlign="center"
            fontSize="36px"
            lineHeight="48px"
          >
            Coming Soon
          </Text>
          <div>
            <PrimaryButton
              fontSize="20px"
              lineHeight="23px"
              fontWeight="500"
              letterSpacing="-0.5px"
              paddingRight="33px"
              paddingLeft="33px"
              onClick={() => navigate('/')}
            >
              Go to Home Page
            </PrimaryButton>
          </div>
        </VStack>
      </Flex>
    </MainLayout>
  )
}

export default CommingSoon
