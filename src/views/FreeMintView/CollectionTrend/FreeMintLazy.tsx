import { VStack, HStack, Image } from "@chakra-ui/react"
import { MAIN_ROUTERS } from "~/routes/routes"
import RocketImg from '~/assets/rocket.svg'
import { useNavigate } from "react-router-dom"
import { CardItemPrimary } from "~/components/CardItemPrimary"
import { EHomeListTag } from "~/dto/nft-collection.dto"
import { useListCollection } from "../hooks/useListCollection"
import { TitleHeader, TitleViewAll } from "~/@ui/common"

export const FreeMintLazy = (props: {
  chooseLayout: "table" | "grid"
  chainId: number
  evn: number
}) => {
  const navigate = useNavigate();

  const { data: listFreeMint, isLoading } = useListCollection({
    pageSize: 48,
    listTag: EHomeListTag.FreeMint,
    chainId: props.chainId,
    environment: props.evn,
  });

  const filterFreeMint = listFreeMint
    .filter(item =>
      new Date(item.endTime).getTime() > new Date().getTime()
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
            src={RocketImg}
          />
          <TitleHeader>
            Free Mint
          </TitleHeader>
        </HStack>
        <TitleViewAll
          title=" View All"
          openLink={() => {
            navigate(MAIN_ROUTERS.NFT_COLLECTION_DETAIL + "/free-mint")
          }}
        />
      </HStack>


      <CardItemPrimary
        chooseLayout={props.chooseLayout}
        dataCollections={filterFreeMint}
        isPopolar={false}
        isLoading={isLoading}
      />

    </VStack>
  )
}
