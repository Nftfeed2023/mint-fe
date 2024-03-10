import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "~/components/PrimaryButton"
import useWindowSize from "~/hooks/useWindowSize";
import { MAIN_ROUTERS } from "~/routes/routes"
import { formatPrice } from "~/utils";
import CountUp from 'react-countup';

export const ButtonMints = ({ address, qtyMinted, layout, chainId }: {
  chainId: number;
  address: string,
  qtyMinted: number,
  layout?: 'grid' | 'table'
}) => {

  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <PrimaryButton
      w={layout === "grid" ? "120px" : "full"}
      onClick={() => {
        navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${chainId}/${address}`)
      }}

      fontSize={"14px"}
      color={layout === "grid" || width <= 500 ? "#ee3824" : "#fff"}
      bg={layout === "grid" || width <= 500 ? "transparent" : "yellow.primary"}
      borderColor={"transparent"}

      _hover={{
        base: {
          fontSize: "12px",
        },
        lg: {
          color: "#fff",
          bg: "yellow.primary",
          transition: "all 250ms ease-in-out"
        }
      }}

      onMouseOver={() => {
        if (width > 900) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {hover
        ? "Go to mint"
        :
        <>
          <CountUp end={qtyMinted} />
          &nbsp;mints
        </>
      }
      {/* {textMint} */}
    </PrimaryButton>
  )
}
