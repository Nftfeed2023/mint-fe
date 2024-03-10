import { VStack, HStack, Text, Image, Box } from "@chakra-ui/react"
import { TextHorizon } from "~/@ui/TextHorizon"
import PrimaryButton from "~/components/PrimaryButton"
import ImgLogo from "~/assets/images/logo.png"
import { useCallback } from "react"

interface IProps {

}

export const ItemStakeToken = (props: IProps) => {

  const renderButton = useCallback(() => {
    return (
      <VStack
        w="full"
      >

        <PrimaryButton>
          Stake
        </PrimaryButton>

        <PrimaryButton>
          Claim
        </PrimaryButton>

      </VStack>
    )
  }, [])

  return (
    <Box
      p={{ base: '10px', lg: '15px 20px', }}
      bg="white"
      borderRadius="8px"
      border="1px solid #ffd3cb"
      boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
    >

      <VStack
        w="full"
        spacing={4}
      >

        <HStack
          w="full"
          justifyContent={"space-between"}
        >

          <Box
            bg="#FFF1E4"
            borderRadius="10px"
            display="flex"
            justifyContent="center"
            p={{ base: "4px 8px", '2xl': "10px 14px" }}
            alignSelf={"start"}
          >
            <Text
              fontWeight="700"
              fontSize={{ base: "18px", md: "20px" }}
              lineHeight="21px"
              color="black.light"
              letterSpacing="-1px"
            >
              USDT/WSHAKRE
            </Text>
          </Box>

          <HStack spacing={0}>
            <Image
              src={ImgLogo}
              h={{ base: "24px", md: "32px" }}
              w={{ base: "24px", md: "32px" }}
              borderRadius="24px"
            />
            <Image
              h={{ base: "24px", md: "32px" }}
              w={{ base: "24px", md: "32px" }}
              border="1px solid #E0E0E0"
              borderRadius="24px"
              style={{ marginLeft: '-5px' }}
              src={ImgLogo}
              bg="#ccc"
              boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
            />
          </HStack>
        </HStack>

        <TextHorizon
          title='Start Date'
          value='09091100'
        />

        <TextHorizon
          title='Address'
          value='09091100'
          isCopy={true}
        />

        <TextHorizon
          title='Swap rate'
          value='1=1'
        />

        <TextHorizon
          title='Deposited'
          value='1'
          icon={ImgLogo}
        />

        {renderButton()}

      </VStack>

    </Box>
  )
}
