import { VStack, Divider, Text, Image, } from "@chakra-ui/react"

const Description = `<strong>NFT BENEFITS:</strong>
1/ 1,000,000 $WSHARKIE of Staking Rewards
2/ Presale Whitelist for NFT Holders
3/ NFT Liquidity Boost after Public Sale
4/ Revenue Sharing from NFTFeed platform
5/ DAO voting
<strong>OTHERS:</strong>
1/ Distribution Platform: NFTFeed
2/ NFT Type: ERC-721
3/ Marketplace: Opensea, Mint.Fun`;

export const AboutIdo = () => {
  return (
    <VStack
      id="about-ido"
      w="full"
      bg="#FFFFFF"
      borderRadius="24px"
      boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
      p={{
        base: '20px 10px',
        lg: '12px 32px',
      }}
    >

      <Text
        py="20px"
        fontWeight="700"
        fontSize={{ base: "24px", md: "32px", }}
        lineHeight="21px"
        letterSpacing="-0.5px"
        alignSelf={"start"}
      >
        About IDO
      </Text>

      <Divider borderBottomColor={"#ccc"} borderBottomStyle={"dashed"} />

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
            __html: Description
          }}
        />
      </Text>

    </VStack>
  )
}
