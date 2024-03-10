import { VStack, SimpleGrid, Divider, Text, HStack, Image } from "@chakra-ui/react"
import ImgUSDT from "~/assets/images/usdt.png"
import { ClaimButton } from "./ClaimButton";
import { TextHorizon } from "~/@ui/TextHorizon";

const Timeline = `Phase 1: 40% - 11/06/2022 14:30:00 UTC
Phase 2: 12% - 11/06/2022 14:30:00 UTC
Phase 3: 12% - 11/06/2022 14:30:00 UTC
Phase 4: 09% - 11/06/2022 14:30:00 UTC
Phase 5: 09% - 11/06/2022 14:30:00 UTC
Phase 6: 09% - 11/06/2022 14:30:00 UTC
Phase 7: 09% - 11/06/2022 14:30:00 UTC`;

export const VestingView = () => {
  return (

    <VStack
      w="full"
      bg="#FFFFFF"
      borderRadius="24px"
      boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
      p={{
        base: '20px 10px',
        lg: '12px 32px',
      }}
    >

      <SimpleGrid
        w="full"
        columns={{ base: 1, md: 2 }}
        alignItems={"center"}
      >

        <VStack>
          <Text
            pt="20px"
            fontWeight="700"
            fontSize={{ base: "24px", md: "32px", }}
            lineHeight="21px"
            letterSpacing="-0.5px"
            alignSelf={"start"}
          >
            Vesting IDO
          </Text>

          <Text
            py="10px"
            fontWeight="600"
            lineHeight="19px"
            letterSpacing="-0.5px"
            fontSize="16px"
            alignSelf={"start"}
          >
            (40% on TGE, Cliff 1 month, Vesting for 6 months.)
          </Text>
        </VStack>

        <ClaimButton />

      </SimpleGrid>

      <Divider borderBottomColor={"#ccc"} borderBottomStyle={"dashed"} />

      <SimpleGrid
        pt="10px"
        w='full'
        spacing={4}
        columns={{ base: 1, md: 2 }}
      >

        <VStack
          w="full"
          alignItems={"start"}
        >

          <Text
            fontWeight="700"
            lineHeight="19px"
            letterSpacing="-0.5px"
            fontSize="16px"
            alignSelf={"start"}
            pb={{ base: "0px", lg: "15px" }}
          >
            Time Line
          </Text>

          <Text
            fontWeight={"500"}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="21px"
            color="black.light"
            letterSpacing="-0.5px"
            alignSelf={"start"}
          >
            <span
              style={{ whiteSpace: "pre-line", lineHeight: "38px" }}
              dangerouslySetInnerHTML={{
                __html: Timeline
              }}
            />
          </Text>

        </VStack>

        <VStack
          w="full"
          alignItems={"start"}
          spacing={4}
        >

          <Text
            fontWeight="700"
            lineHeight="19px"
            letterSpacing="-0.5px"
            fontSize="16px"
            alignSelf={"start"}
            pb="15px"
          >
            Infomation Vesting
          </Text>

          <TextHorizon
            title='TGE Date (UTC)'
            value={'09/09/2024 14:30:00'}
          />

          <TextHorizon
            title='Deposited'
            value={'100'}
            icon={ImgUSDT}
          />

          <TextHorizon
            title='Total Amount'
            value={'100'}
            icon={ImgUSDT}
          />

          <TextHorizon
            title='Claimed'
            value={'100'}
            icon={ImgUSDT}
          />

          <TextHorizon
            title='Claimale'
            value={'100'}
            icon={ImgUSDT}
          />


        </VStack>

      </SimpleGrid>


    </VStack>
  )
}
