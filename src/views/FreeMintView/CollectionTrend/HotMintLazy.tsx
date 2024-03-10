import { VStack, HStack, Text, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTERS } from "~/routes/routes";
import { CardItemPrimary } from "~/components/CardItemPrimary";
import { EHomeListTag } from "~/dto/nft-collection.dto";
import { useListCollection } from "../hooks/useListCollection";
import { TitleHeader, TitleViewAll } from "~/@ui/common";

export const HotMintLazy = (props: {
  chooseLayout: "table" | "grid"
  chainId: number
  evn: number
}) => {
  const navigate = useNavigate();

  const { data: listOnSale, isLoading } = useListCollection({
    pageSize: 48,
    listTag: EHomeListTag.OnSale,
    chainId: props.chainId,
    environment: props.evn,
  });

  const filterHotMint = listOnSale
    .filter(item =>
      new Date(item.endTime).getTime() > new Date().getTime()
      && item.address !== "0x4349d640c8284c83790ee9a0460b77c560e343b8"
    );

  return (
    <VStack
      w="full"
    >
      <HStack
        w="full"
        justifyContent={"space-between"}
      >
        <HStack>
          <Text fontSize={{ base: "20px", md: "32px" }}>🔥</Text>
          <TitleHeader
          >
            On Sale
          </TitleHeader>
        </HStack>
        <TitleViewAll
          title=" View All"
          openLink={() => {
            navigate(MAIN_ROUTERS.NFT_COLLECTION_DETAIL + "/on-sale")
          }}
        />
      </HStack>

      <CardItemPrimary
        chooseLayout={props.chooseLayout}
        dataCollections={filterHotMint}
        isPopolar={false}
        isLoading={isLoading}
      />

    </VStack>
  )
}
