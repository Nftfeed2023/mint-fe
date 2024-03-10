import { VStack, HStack, Image, } from "@chakra-ui/react";
import { MAIN_ROUTERS } from "~/routes/routes";
import PopularImg from '~/assets/popular.svg'
import { CardItemPrimary } from "~/components/CardItemPrimary";
import { useNavigate } from "react-router-dom";
import { EHomeListTag } from "~/dto/nft-collection.dto";
import { useListCollection } from "../hooks/useListCollection";
import { TitleHeader, TitleViewAll } from "~/@ui/common";

export const PopularLazy = (props: {
  chooseLayout: "table" | "grid",
  chainId: number
  evn: number
}) => {

  const navigate = useNavigate();

  const { data: listPopular, isLoading } = useListCollection({
    pageSize: 48,
    listTag: EHomeListTag.Popular,
    chainId: props.chainId,
    environment: props.evn,
  });

  const filterPopular = listPopular
    .filter(item =>
      (false ? true : new Date(item.endTime).getTime() > new Date().getTime())
      && item.id !== "7282da60-c541-4091-a9f2-3d2bd067bc6f"
      && item.id !== "0x4397dfdd7d211982efffc572701c2af21e9c35f4"
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
          <Image
            w={{ base: "20px", md: "32px" }}
            h={{ base: "20px", md: "32px" }}
            src={PopularImg}
          />
          <TitleHeader>
            Popular
          </TitleHeader>
        </HStack>
        <TitleViewAll
          title=" View All"
          openLink={() => {
            navigate(MAIN_ROUTERS.NFT_COLLECTION_DETAIL + "/popular")
          }}
        />
      </HStack>

      <CardItemPrimary
        chooseLayout={props.chooseLayout}
        dataCollections={filterPopular}
        isPopolar={true}
        isLoading={isLoading}
      />

    </VStack>
  )
}
