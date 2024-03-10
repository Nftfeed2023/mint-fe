import { VStack, SimpleGrid, Box, Text, Flex, Spinner } from "@chakra-ui/react"
import { NftCollection } from "~/dto/nft-project.dto"
import CollectionTrendCard from "~/views/FreeMintView/CollectionTrend/CollectionTrendCard"

export const CardItemPrimary = (props: {
  dataCollections: NftCollection[],
  chooseLayout: string
  isPopolar?: boolean,
  isLoading: boolean
}) => {
  const { dataCollections, chooseLayout, isPopolar = false, isLoading } = props;

  if (isLoading) {
    return (
      <VStack
        pt={{ base: "5%", }}
      >
        <Flex flex={1} justifyContent="center" alignItems="center">
          <Spinner color="#ee3824" size="lg" />
        </Flex>
      </VStack>
    )
  }
  if (chooseLayout === "grid") {
    return (
      <SimpleGrid
        pt={{ base: "30px", md: "15px" }}
        w={"full"}
        spacing={{ base: 6, md: 2 }}
        columns={{ base: 1, '3lg': 2, '2xl': 3 }}
      >
        {dataCollections.map((item) => {
          return (
            <Box w="full" key={item.id}>
              <CollectionTrendCard {...item} layout="grid" isPopolar={isPopolar} />
            </Box>
          )
        })}
      </SimpleGrid>
    )
  }
  return (
    <SimpleGrid
      pt={{ base: "30px", md: "15px" }}
      w={"full"}
      spacing={{ base: 1, md: 2 }}
      columns={{ base: 2, md: 2, lg: 3, xl: 4, '3xl': 6 }}
    >
      {dataCollections.map((item) => {
        return (
          <Box w="full" key={item.id}>
            <CollectionTrendCard {...item} layout="table" isPopolar={isPopolar} />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}
