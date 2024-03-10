import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import MainLayout from '~/layouts/MainLayout'
import PrimaryButton from '~/components/PrimaryButton'
import WrapperHeaderMobile from '../layouts/MasterLayout/WrapperHeaderMobile'

const MaintenanceView = () => {
  const navigate = useNavigate()
  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        mr={{
          base: '10px',
        }}
        ml={{
          base: '5px',
        }}
        mt={{
          base: '90px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
        p={{ base: '10px', lg: '15px 20px', }}
        bg="white"
        borderRadius="8px"
        border={{ md: "1px solid #ffd3cb" }}
        boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        h="80vh"
      >
        <Flex justifyContent="center" alignItems="center" flex={1} h="100%">
          <VStack>
            <Text
              color="#ee3824"
              textAlign="center"
              fontSize={{ base: "20px", md: "36px" }}
              lineHeight={"normal"}
              fontWeight={500}
            >
              NFTFeed is under maintenance.
            </Text>
            <Text
              color="#ee3824"
              textAlign="center"
              fontSize={{ base: "20px", md: "36px" }}
              lineHeight={"normal"}
              fontWeight={500}
            >
              We will be back soon.
            </Text>
            <Text
              color="#ee3824"
              textAlign="center"
              fontSize={{ base: "20px", md: "36px" }}
              lineHeight={"normal"}
              fontWeight={500}
            >
              Thank you for your understanding.
            </Text>
          </VStack>
        </Flex>
      </Box>

    </MainLayout>
  )
}

export default MaintenanceView
