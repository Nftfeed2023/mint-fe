import { VStack, HStack, Image } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { EHomeListTag } from "~/dto/nft-collection.dto";
import { MAIN_ROUTERS } from "~/routes/routes";
import { useListCollection } from "../FreeMintView/hooks/useListCollection";
import useWindowSize from "~/hooks/useWindowSize";

import PopularImg from '~/assets/popular.svg'
import { useNavigate, useParams } from "react-router-dom";
import { CardItemPrimary } from "~/components/CardItemPrimary";
import { NftCollection } from "~/dto/nft-project.dto";
import { TitleHeader, TitleViewAll } from "~/@ui/common";

export const PopularView = () => {

  const [chooseLayout, setChooseLayout] = useState<"table" | "grid">("table");
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const { address } = useParams();

  const { data: listPopular, isLoading: isLoadingPop } = useListCollection({
    pageSize: 24,
    listTag: EHomeListTag.Popular,
    chainId: 0,
    environment: 1,
  });

  useEffect(() => {
    if (width > 500) {
      setChooseLayout("grid")
    } else {
      setChooseLayout("table")
    }
  }, [width])

  const filterPopular = listPopular
    .filter(item => new Date(item.endTime).getTime() > new Date().getTime())
    .filter(i =>
      i.id !== "7282da60-c541-4091-a9f2-3d2bd067bc6f"
      && i.id !== "0x4397dfdd7d211982efffc572701c2af21e9c35f4"
      && (address ? i.address !== address : true)
    );

  const renderCardItem = useCallback((dataItems: NftCollection[], isPopolar?: boolean, isLoading?: boolean) => {
    return (
      <CardItemPrimary
        chooseLayout={chooseLayout}
        dataCollections={dataItems}
        isPopolar={isPopolar}
        isLoading={isLoading}
      />
    )
  }, [chooseLayout])

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

      {renderCardItem(filterPopular, true, isLoadingPop)}

    </VStack>
  )
}
