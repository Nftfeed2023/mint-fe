import { CardItemPrimary } from "~/components/CardItemPrimary";
import { EHomeListTag } from "~/dto/nft-collection.dto";
import { NftCollection } from "~/dto/nft-project.dto";

export const CollectionDetailLazy = (props: {
  chooseLayout: "table" | "grid"
  listData: NftCollection[]
  isLoading: boolean
  listTag: EHomeListTag
}) => {
  const { chooseLayout, listData, isLoading, listTag } = props;

  const filterData = listData
    .filter(item =>
      item.id !== "7282da60-c541-4091-a9f2-3d2bd067bc6f"
      && item.id !== "0x4397dfdd7d211982efffc572701c2af21e9c35f4"
      && item.address !== "0x4349d640c8284c83790ee9a0460b77c560e343b8"
    );

  return (
    <CardItemPrimary
      isLoading={isLoading}
      chooseLayout={chooseLayout}
      dataCollections={filterData}
      isPopolar={listTag === EHomeListTag.Popular}
    />
  )
}
