import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTERS } from "~/routes/routes"
import { useMemo, useRef } from "react"
import { EVM_CHAIN_LIST } from "~/@config/chain-list"
import IconETH from "~/assets/images/eth.png"
import useWindowSize from '~/hooks/useWindowSize'
import { NftCollection } from "~/dto/nft-project.dto"
import { CardItemTable } from '~/components/CardItemTable'
import { CardItemGrid } from '~/components/CardItemGrid'


export interface ICollectionTrendCardProps extends NftCollection {
  layout?: 'grid' | 'table'
  isPopolar?: boolean
}

const CollectionTrendCard = (props: ICollectionTrendCardProps) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const { width } = useWindowSize();
  const { address, image, chainId, qtyMinted,
    endTime,
    twitter = "", website = "", discord = "", price,
    layout, isPopolar = false
  } = props;
  const { logo } = EVM_CHAIN_LIST[chainId] || { chainName: "", logo: "", dislayName: "", nativeCurrency: { symbol: "" } }

  const isHardCode = false;
  //  address === "0xd70d47bd3ef09543c0490c7f09b980a11930ad19";

  const isEnded = new Date(endTime).getTime() < new Date().getTime();

  const handleClick = () => {
    if (isHardCode) {
      navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${42161}/${address}`)
    } else {
      navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${chainId}/${address}`)
    }
  }

  if (layout === "grid") {
    return (
      <CardItemGrid
        {...props}
        isPopolar={isPopolar}
        handleClick={handleClick}
        isHardCode={isHardCode}
        isEnded={isEnded}
        logo={logo}
      />
    )
  }

  return (
    <CardItemTable
      {...props}
      isPopolar={isPopolar}
      handleClick={handleClick}
      isHardCode={isHardCode}
      isEnded={isEnded}
      logo={logo}
    />
  )

}

export default CollectionTrendCard
